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

// Campos que deben ser IDÉNTICOS en los tres idiomas. Traducirlos rompe el
// sitio (rutas, imágenes, descargas) o falsea un dato.
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
  'email',
  'coverImage',
  'fecha',
  'date',
  'id',
  'source',
  'sourcePosts',
  'fuente',
]);

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
  ].map((s) => s.toLowerCase()),
);

type Registro = { nombre: string; porIdioma: Record<Locale, unknown> };

// Se completa a medida que cada dataset pasa a tener sus tres idiomas.
// Mientras un dataset no esté acá, no está verificado.
const REGISTRO: Registro[] = [];

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
  // Enlaces y rutas
  if (/^(https?:|\/|#|mailto:)/.test(t)) return true;
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
      const invariante = CAMPOS_INVARIANTES.has(clave);
      const valorEs = (es as Record<string, unknown>)[clave];

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
