// Datos curados de la sección Novedades (agenda pública y difusión
// institucional del IVUJUS). Mismo criterio que src/lib/instituto.ts,
// src/lib/simposio2026.ts y src/lib/formacion.ts: contenido único en
// español — las rutas /en y /fr reutilizan estos mismos datos sin traducir
// el cuerpo (solo cambian labels de navegación y metadata de la página),
// igual que instituto/* y formacion/* (ver docs/CLAUDE.md, "Estado actual
// de frontend y migracion", y src/lib/formacion.ts, comentario de cabecera).
//
// NOTA DE ARQUITECTURA (Fase 3): esta estructura curada es un puente hacia
// la colección `Novedades` que ya existe en el schema de Payload (ver
// docs/CLAUDE.md). En Fase 3, la fuente de este listado pasará a ser la
// REST API del WP en vivo de ivujus.org.ar consumida con ISR (revalidate),
// reemplazando este array estático por un fetch con caché — el tipo
// `Novedad` de abajo está pensado para mapear 1 a 1 contra los campos que
// ya devuelve `wp/v2/posts` (title, date, content/excerpt, featured media,
// id, link), así que no debería cambiar de forma drástica cuando eso pase.
//
// REGLA DE ORO de esta ola: nada de lo que sigue es inventado. Los 6 posts
// de abajo son los mapeados a `novedades` en la sección "Posts" de
// docs/CONTENT-MIGRATION-LEDGER.md, bajados el 2026-07-21 vía la REST API
// pública del WP vivo de ivujus.org.ar:
//   https://ivujus.org.ar/wp-json/wp/v2/posts/<id>?_fields=id,slug,date,title,content,excerpt,link,featured_media
// y sus imágenes destacadas vía:
//   https://ivujus.org.ar/wp-json/wp/v2/media/<id>?_fields=id,source_url,alt_text,media_details
//
// El campo `contenido` reescribe el HTML de Gutenberg/Elementor de `content.
// rendered` como párrafos de texto editorial legible (se desarman listas y
// subtítulos <h3> en oraciones corridas, se quitan emojis usados como
// viñetas decorativas y el markup de botones/figuras), sin agregar ni quitar
// hechos respecto de la fuente. `bajada` es el primer párrafo real del
// posteo (no una fuente inventada). Los links reales que traía cada post
// (nota de prensa, PDF) se conservan en `enlacesExternos`.

export type FuenteContenido = 'migracion_wp';

export type EnlaceExterno = {
  titulo: string;
  url: string;
};

export type Novedad = {
  slug: string;
  titulo: string;
  /** Fecha de publicación original en WP, formato ISO (YYYY-MM-DD) para poder ordenar y para `datePublished` en JSON-LD. */
  fecha: string;
  /** Bajada / resumen: primer párrafo real del posteo original, no una síntesis inventada. */
  bajada: string;
  /** Cuerpo editorial limpio, en párrafos. */
  contenido: string[];
  /** URL de la imagen destacada real del post en wp-content, si existe. */
  imagen?: string;
  /** Links reales citados por el post original (nota de prensa, PDF, etc.). */
  enlacesExternos?: EnlaceExterno[];
  fuente: FuenteContenido;
  source_wp_id: number;
  source_url: string;
};

// Orden cronológico descendente (más reciente primero). Usar
// `getNovedadesOrdenadas()` en las páginas en vez de leer este array
// directo, para no depender de mantener el orden a mano acá.
export const novedadesData: Novedad[] = [
  {
    slug: 'hito-en-la-justicia-argentina-sera-sede-del-primer-simposio-americano-y-europeo-de-victimologia-penal',
    titulo:
      'Hito en la Justicia: Argentina será sede del Primer Simposio Americano y Europeo de Victimología Penal',
    fecha: '2026-04-06',
    bajada:
      'En un avance sin precedentes para el sistema judicial de nuestro país y la región, el Instituto de Victimología de Usina de Justicia (IVUJUS), en conjunto con el Colegio Público de la Abogacía de la Capital Federal (CPACF), anuncian la realización del Primer Simposio Americano y Europeo de Victimología Penal.',
    contenido: [
      'En un avance sin precedentes para el sistema judicial de nuestro país y la región, el Instituto de Victimología de Usina de Justicia (IVUJUS), en conjunto con el Colegio Público de la Abogacía de la Capital Federal (CPACF), anuncian la realización del Primer Simposio Americano y Europeo de Victimología Penal.',
      'Este evento, que tendrá lugar los próximos 9 y 10 de abril, posiciona a la Argentina en el centro del debate internacional sobre los derechos de las víctimas, reuniendo a más de 20 especialistas de primer nivel provenientes de Argentina, Canadá, México y Panamá.',
      'Hacia una ciencia autónoma de la víctima: el simposio surge con un objetivo claro, consolidar a la victimología como una ciencia autónoma e independiente de la criminología tradicional. Como ha señalado María Jimena Molina, directora del IVUJUS, es fundamental analizar los alcances y límites en la atención a las víctimas, especialmente en contextos de inseguridad y homicidios, para pasar de la teoría a una protección real y efectiva.',
      'El encuentro contará con la presencia de figuras destacadas como Irwin Waller (Canadá), presidente de la Organización Internacional para la Asistencia a Víctimas; María de la Luz Lima Malvido (México), doctora Magna Cum Laude en Derecho y referente regional; y Germán Garavano, Ricardo Gil Lavedra y Francisco Quintana, figuras clave del derecho y la justicia en Argentina.',
      'Temas estratégicos y tecnología: durante las dos jornadas se abordarán problemáticas urgentes que definen el presente y futuro del área, entre ellas las políticas públicas de asistencia y atención, el impacto del abolicionismo penal en la sociedad argentina, la intersección entre la inteligencia artificial y el derecho penal, y la necesidad de un paradigma con verdadera perspectiva de víctima.',
      'La Declaración de Buenos Aires: el cierre del evento, previsto para el viernes 10 de abril, marcará un precedente histórico con la firma de la Declaración de Buenos Aires. Este manifiesto instará a universidades, centros de investigación y poderes judiciales de América y Europa a desarrollar programas de estudio y líneas de financiamiento para la victimología científica, integrando la ciencia de datos y los derechos humanos para formar a las nuevas generaciones de profesionales.',
      'Participación y registro: desde Usina de Justicia invitamos a toda la comunidad jurídica, académica y a los ciudadanos interesados en la defensa de los derechos de las víctimas a formar parte de este evento inédito. Fecha: jueves 9 y viernes 10 de abril. Lugar: Colegio Público de la Abogacía de la Capital Federal. Inscripción: gratuita (con cupos limitados) a través de www.simposiousinadejusticia.org.ar.',
      'Este simposio no es solo una reunión de expertos: es el inicio de una nueva era donde la voz y la ciencia de la víctima se vuelven protagonistas de la justicia.',
    ],
    // Imagen destacada real del post (id de media 24626): isotipo/logos del
    // simposio, no una foto editorial de un hecho puntual.
    imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/logossimposio.webp',
    enlacesExternos: [
      {
        titulo: 'Accedé a la nota en DEF',
        url: 'https://defonline.com.ar/seguridad/hito-en-la-justicia-argentina-se-organizara-el-primer-simposio-americano-y-europeo-de-victimologia-penal/',
      },
    ],
    fuente: 'migracion_wp',
    source_wp_id: 24625,
    source_url:
      'https://ivujus.org.ar/hito-en-la-justicia-argentina-sera-sede-del-primer-simposio-americano-y-europeo-de-victimologia-penal/',
  },
  {
    slug: 'el-ivujus-presente-en-el-ciclo-de-formacion-2026',
    titulo: 'El IVUJUS presente en el Ciclo de Formación 2026',
    fecha: '2026-02-06',
    bajada:
      'Desde el Instituto de Victimología de Usina de Justicia (IVUJUS), nos complace invitar a las jornadas sobre «Edad de Imputabilidad» organizadas por el Grupo Diálogo y Debate Jurídico Penal.',
    contenido: [
      'Desde el Instituto de Victimología de Usina de Justicia (IVUJUS), nos complace invitar a las jornadas sobre «Edad de Imputabilidad» organizadas por el Grupo Diálogo y Debate Jurídico Penal.',
      'Contaremos con la destacada participación de nuestros miembros de Usina de Justicia: la Dra. Jimena Molina, el Dr. Roberto Picozzi y el Mgter. Francisco Javier Pascua.',
      'Fechas: 23 y 24 de febrero. Hora: 18:00 hs. Modalidad: Zoom.',
      'Un espacio fundamental para el debate técnico y la formación en políticas criminales que pongan en el centro el derecho de las víctimas.',
    ],
    // Imagen destacada real del post (id de media 24556): la misma foto de
    // perfil de María Jimena Molina que WP asignó como featured image de
    // este posteo (coincide con institutoData.consejoDirectivo, ver
    // src/lib/instituto.ts); no hay flyer propio marcado como destacado.
    imagen: 'https://ivujus.org.ar/wp-content/uploads/2025/12/jimena_molina_profiles.jpg',
    fuente: 'migracion_wp',
    source_wp_id: 24591,
    source_url: 'https://ivujus.org.ar/el-ivujus-presente-en-el-ciclo-de-formacion-2026/',
  },
  {
    slug: 'reconocimiento-a-marcelo-aebi',
    titulo: 'Reconocimiento a Marcelo Aebi',
    fecha: '2025-11-13',
    bajada:
      'Marcelo Aebi, miembro del Comité Científico del IVUJUS, ha sido galardonado con el premio Freda Adler 2025.',
    contenido: [
      'Marcelo Aebi, miembro del Comité Científico del IVUJUS, ha sido galardonado con el premio Freda Adler 2025. Este prestigioso reconocimiento le fue entregado en Washington D. C. por la American Society of Criminology (Sociedad Americana de Criminología) en honor a su destacada labor.',
    ],
    imagen: 'https://ivujus.org.ar/wp-content/uploads/2025/09/marcelo-aebi.jpg',
    fuente: 'migracion_wp',
    source_wp_id: 24544,
    source_url: 'https://ivujus.org.ar/reconocimiento-a-marcelo-aebi/',
  },
  {
    // Slug limpiado: el original (`jornada-en-el-cpacf-derecho-y-algoritmos-
    // %e2%9a%96%ef%b8%8f%f0%9f%92%bb`) terminaba en un emoji URL-encoded
    // (⚖️💻); ver docs/CONTENT-MIGRATION-LEDGER.md, nota sobre el WP ID
    // 24513 ("Limpiar slug y titulo al migrar").
    slug: 'jornada-en-el-cpacf-derecho-y-algoritmos',
    // Título limpiado por el mismo motivo (el original incluía el emoji
    // "⚖️💻" al final).
    titulo: 'Jornada en el CPACF: Derecho y Algoritmos',
    fecha: '2025-11-01',
    bajada:
      'El Colegio Público de la Abogacía de la Capital Federal (CPACF) invita a la jornada presencial «Hacia un Derecho Científico: Medición Cualitativa en la Era del Algoritmo».',
    contenido: [
      '¡Imperdible! El Colegio Público de la Abogacía de la Capital Federal (CPACF) invita a la jornada presencial «Hacia un Derecho Científico: Medición Cualitativa en la Era del Algoritmo».',
      'Cuándo: miércoles 12 de noviembre, de 15:00 a 17:00 hs. Lugar: Salón Auditorio (Corrientes 1441, 1° piso). Inscripción: requiere inscripción previa enviando un correo a infoacademicas@cpacf.org.ar.',
    ],
    imagen: 'https://ivujus.org.ar/wp-content/uploads/2025/11/CPACF.png',
    fuente: 'migracion_wp',
    source_wp_id: 24513,
    // `source_url` conserva la URL real del post, con el emoji URL-encoded
    // tal cual figura en el WP vivo — es el origen real del contenido, no
    // la ruta nueva y limpia del sitio (mismo criterio que
    // src/lib/formacion.ts con las URLs de usinadejusticia.org.ar).
    source_url:
      'https://ivujus.org.ar/jornada-en-el-cpacf-derecho-y-algoritmos-%e2%9a%96%ef%b8%8f%f0%9f%92%bb/',
  },
  {
    slug: 'encuentro-empresarial-argentina-israel-2025',
    titulo: 'Encuentro Empresarial Argentina-Israel 2025',
    fecha: '2025-10-31',
    bajada:
      'Nuestra presidente, Diana Cohen Agrest, y nuestra directora del Instituto de Victimología, María Jimena Molina, estuvieron presentes en el Encuentro Empresarial Argentina-Israel 2025.',
    contenido: [
      'Nuestra presidente, Diana Cohen Agrest, y nuestra directora del Instituto de Victimología, María Jimena Molina, estuvieron presentes en el Encuentro Empresarial Argentina-Israel 2025.',
    ],
    imagen: 'https://ivujus.org.ar/wp-content/uploads/2025/11/jimena_diana2.jpeg',
    fuente: 'migracion_wp',
    source_wp_id: 24517,
    source_url: 'https://ivujus.org.ar/encuentro-empresarial-argentina-israel-2025/',
  },
  {
    slug: 'la-esc-difundio-las-proximas-presentaciones-de-usina-de-justicia',
    titulo: 'La ESC difundió las próximas presentaciones de Usina de Justicia',
    fecha: '2025-10-30',
    bajada:
      'La Sociedad Europea de Criminología (ESC) difundió las próximas presentaciones del Índice Legislativo de Usina de Justicia y de nuestro libro «Nuevos paradigmas para la justicia penal. Hacia una era con perspectiva de víctima».',
    contenido: [
      'La Sociedad Europea de Criminología (ESC) difundió las próximas presentaciones del Índice Legislativo de Usina de Justicia y de nuestro libro «Nuevos paradigmas para la justicia penal. Hacia una era con perspectiva de víctima».',
      'El artículo completo puede leerse en el newsletter de octubre de 2025 de la Sociedad Europea de Criminología (ESC Victimology Newsletter).',
    ],
    imagen: 'https://ivujus.org.ar/wp-content/uploads/2025/10/ESC.png',
    enlacesExternos: [
      {
        titulo: 'Leer el newsletter completo (PDF)',
        url: 'https://ivujus.org.ar/wp-content/uploads/2025/10/ESC-Victimology-Newsletter-7_October-2025.pdf',
      },
    ],
    fuente: 'migracion_wp',
    source_wp_id: 24504,
    source_url: 'https://ivujus.org.ar/la-esc-difundio-las-proximas-presentaciones-de-usina-de-justicia/',
  },
];

export function getNovedadBySlug(slug: string): Novedad | undefined {
  return novedadesData.find((novedad) => novedad.slug === slug);
}

/** Copia ordenada por fecha descendente (más reciente primero). */
export function getNovedadesOrdenadas(): Novedad[] {
  return [...novedadesData].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
