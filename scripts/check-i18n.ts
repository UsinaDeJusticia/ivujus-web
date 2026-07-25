// Verificador de las traducciones del contenido.
//
// TypeScript ya garantiza que las tres versiones de idioma de un dataset tengan
// la misma forma (si falta un campo, no compila). Lo que TypeScript NO puede
// ver es lo que en la práctica sale mal al traducir:
//
//   1. Que alguien traduzca un identificador de URL, una imagen o un enlace.
//      Eso rompe rutas y posicionamiento de forma silenciosa: la página
//      compila, pero el enlace lleva a un 404 solo en inglés.
//   2. Que una lista quede con distinta cantidad de elementos entre idiomas
//      (una biografía de menos, una jornada olvidada).
//   3. Que un texto quede sin traducir. Una cadena en español es una cadena
//      válida, así que nada la detecta salvo leerla.
//
// Este script recorre los tres idiomas en paralelo y falla con código 1 si
// encuentra cualquiera de esas tres cosas. Se corre con `bun run check:i18n`.
//
// Para sumar un dataset al control, se agrega una entrada en REGISTRO.

import { LOCALES, type Locale } from '../src/lib/i18n';
import { contactoCopy } from '../src/lib/contacto';
import { institutoByLocale } from '../src/lib/instituto';
import { termsPrivacyByLocale } from '../src/lib/legal';
import { formacionByLocale } from '../src/lib/formacion';
import { novedadesByLocale } from '../src/lib/novedades';
import { publicacionesByLocale } from '../src/lib/publicaciones';
import { simposio2026ByLocale } from '../src/lib/simposio2026';

// Campos que deben ser IDÉNTICOS en los tres idiomas. Traducirlos rompe el
// sitio (rutas, imágenes, descargas) o falsea un dato.
// Solo identificadores técnicos inequívocos. Deliberadamente NO están acá
// `fecha`, `date`, `source` ni `fuente`: son ambiguos. «Fecha» puede ser el dato
// (2026-04-10, invariante) o la etiqueta de interfaz («Fecha» → «Date», que sí
// se traduce), y lo mismo pasa con «Fuente». Distinguirlos por el nombre del
// campo daba falsos positivos, así que las fechas y los enlaces se detectan por
// su VALOR, más abajo.
const CAMPOS_INVARIANTES = new Set([
  'slug',
  'href',
  'url',
  'image',
  'imagen',
  'pdfUrl',
  'pdf_url',
  'videoUrl',
  'video_url',
  'source_url',
  'fetchedAt',
  'coverImage',
  'id',
  'sourcePosts',
]);

/** Una fecha ISO es un dato, no texto: debe ser idéntica en los tres idiomas. */
const FECHA_ISO = /^\d{4}-\d{2}-\d{2}/;

/** Una dirección de correo es un dato; la etiqueta «Correo electrónico» no. */
const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Campos cuyo valor es un NOMBRE PROPIO: se espera que sean iguales en los tres
// idiomas, así que la igualdad no es un olvido. A diferencia de los
// invariantes, acá no se exige la igualdad (una bio puede mencionar el nombre
// dentro de una frase traducida), simplemente no se reporta.
const CAMPOS_NOMBRE_PROPIO = new Set([
  'name',
  'nombre',
  'autor',
  'autores',
  'authors',
  'speakers',
  'oradores',
  'outlet',
  'medio',
  'lugar',
  'sede',
  'venue',
  'organizacion',
]);

// Rutas donde la igualdad entre idiomas es una DECISIÓN EDITORIAL documentada en
// docs/GLOSARIO-TRADUCCION.md, no un descuido. Si alguna de estas decisiones
// cambia, hay que actualizar también esta lista.
const RUTAS_IGUALDAD_ESPERADA: RegExp[] = [
  // Títulos de notas de prensa: son artículos publicados en español y se citan
  // por su título real (glosario §7).
  /\.press\[\d+\]\.title$/,
  // Título del libro: obra publicada en español; la traducción va entre
  // paréntesis en el texto corrido, no reemplaza al título (glosario §5 ter).
  /\.libro\.title$/,
];

// Textos que legítimamente son iguales en los tres idiomas: nombres propios,
// siglas, denominaciones que no se traducen. Se comparan en minúsculas.
const IGUALDAD_PERMITIDA = new Set(
  [
    'IVUJUS',
    'Usina de Justicia',
    'Instituto de Victimología de Usina de Justicia',
    'Publications',
    'Contact',
    'CPACF',
    'UBA',
    'UCALP',
    'DAIN',
    'TECH',
    'INDODPRO',
    'Buenos Aires',
    'Argentina',
    'Simposio',
    'Symposium',
    'Victimología',
    'Victimology',
    // Domicilio legal de la institución: es un dato, no texto traducible.
    'Virrey del Pino 2222, Ciudad Autónoma de Buenos Aires – Argentina.',
  ].map((s) => s.toLowerCase()),
);

type Registro = { nombre: string; porIdioma: Record<Locale, unknown> };

// Se completa a medida que cada dataset pasa a tener sus tres idiomas.
// Mientras un dataset no esté acá, no está verificado.
const REGISTRO: Registro[] = [
  { nombre: 'instituto', porIdioma: institutoByLocale },
  { nombre: 'formacion', porIdioma: formacionByLocale },
  { nombre: 'simposio2026', porIdioma: simposio2026ByLocale },
  { nombre: 'novedades', porIdioma: novedadesByLocale },
  { nombre: 'publicaciones', porIdioma: publicacionesByLocale },
  { nombre: 'legal', porIdioma: termsPrivacyByLocale },
  { nombre: 'contacto', porIdioma: contactoCopy },
];

const problemas: string[] = [];

function registrar(dataset: string, ruta: string, detalle: string) {
  problemas.push(`${dataset} · ${ruta}\n    ${detalle}`);
}

/** ¿Es un nombre propio o una sigla que puede repetirse entre idiomas? */
function igualdadAceptable(texto: string): boolean {
  const t = texto.trim().toLowerCase();
  if (t.length < 3) return true; // siglas cortas, números, guiones
  if (IGUALDAD_PERMITIDA.has(t)) return true;
  // Cadenas sin espacios y sin letras acentuadas: casi siempre identificadores
  if (!t.includes(' ') && !/[áéíóúüñ]/.test(t)) return true;
  // Textos que son (o contienen) un enlace: «Facebook: https://…» es igual en
  // los tres idiomas y está bien que lo sea.
  if (/https?:\/\/|^(\/|#|mailto:)/.test(t)) return true;
  return false;
}

function comparar(
  dataset: string,
  ruta: string,
  es: unknown,
  otros: { locale: Locale; valor: unknown }[],
) {
  // --- listas: misma cantidad de elementos ---
  if (Array.isArray(es)) {
    for (const { locale, valor } of otros) {
      if (!Array.isArray(valor)) {
        registrar(dataset, ruta, `en "${locale}" no es una lista y en "es" sí`);
        return;
      }
      if (valor.length !== es.length) {
        registrar(
          dataset,
          ruta,
          `la lista tiene ${es.length} elementos en "es" y ${valor.length} en "${locale}"`,
        );
        return;
      }
    }
    es.forEach((item, i) => {
      comparar(
        dataset,
        `${ruta}[${i}]`,
        item,
        otros.map(({ locale, valor }) => ({
          locale,
          valor: (valor as unknown[])[i],
        })),
      );
    });
    return;
  }

  // --- objetos: recorrer clave por clave ---
  if (es !== null && typeof es === 'object') {
    for (const clave of Object.keys(es as Record<string, unknown>)) {
      const hijos = otros.map(({ locale, valor }) => ({
        locale,
        valor: (valor as Record<string, unknown> | null)?.[clave],
      }));
      const valorEs = (es as Record<string, unknown>)[clave];
      const invariante =
        CAMPOS_INVARIANTES.has(clave) ||
        (typeof valorEs === 'string' && (FECHA_ISO.test(valorEs) || CORREO.test(valorEs)));
      const nombrePropio = CAMPOS_NOMBRE_PROPIO.has(clave);

      // Nombre propio: no se compara el texto. Vale tanto para un valor suelto
      // («name») como para una lista de nombres («oradores», «speakers»). Si en
      // cambio es una lista de objetos se sigue recorriendo, porque puede
      // contener campos que sí deben traducirse.
      const esListaDeNombres =
        Array.isArray(valorEs) && valorEs.every((v) => typeof v === 'string');
      if (nombrePropio && (typeof valorEs === 'string' || esListaDeNombres)) continue;

      if (invariante) {
        for (const { locale, valor } of hijos) {
          if (JSON.stringify(valor) !== JSON.stringify(valorEs)) {
            registrar(
              dataset,
              `${ruta}.${clave}`,
              `campo invariante distinto en "${locale}".\n    es: ${JSON.stringify(valorEs)}\n    ${locale}: ${JSON.stringify(valor)}`,
            );
          }
        }
        continue;
      }

      comparar(dataset, `${ruta}.${clave}`, valorEs, hijos);
    }
    return;
  }

  // --- textos: no deben quedar idénticos al español ---
  if (RUTAS_IGUALDAD_ESPERADA.some((re) => re.test(ruta))) return;

  if (typeof es === 'string' && es.trim() !== '' && !igualdadAceptable(es)) {
    for (const { locale, valor } of otros) {
      if (typeof valor === 'string' && valor.trim() === es.trim()) {
        const muestra = es.length > 70 ? `${es.slice(0, 70)}…` : es;
        registrar(dataset, ruta, `sin traducir en "${locale}": «${muestra}»`);
      }
    }
  }
}

for (const { nombre, porIdioma } of REGISTRO) {
  const es = porIdioma.es;
  const otros = LOCALES.filter((l) => l !== 'es').map((locale) => ({
    locale,
    valor: porIdioma[locale],
  }));
  comparar(nombre, nombre, es, otros);
}

if (REGISTRO.length === 0) {
  console.log('check-i18n: no hay datasets registrados todavía.');
  process.exit(0);
}

if (problemas.length > 0) {
  console.error(`\ncheck-i18n: ${problemas.length} problema(s)\n`);
  for (const p of problemas) console.error(`  ✗ ${p}\n`);
  process.exit(1);
}

console.log(
  `check-i18n: ${REGISTRO.length} dataset(s) verificados en ${LOCALES.length} idiomas. Sin problemas.`,
);
