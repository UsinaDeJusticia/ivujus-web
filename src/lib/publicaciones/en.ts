import type { PublicacionesLocaleContent } from './types';

// English version. See es.ts for sourcing notes and the fidelity rule that
// governs this dataset. Fields that never translate (slug, coverImage,
// fecha, videoUrl, sourcePosts) are copied verbatim from es.ts.
//
// Book title: "Nuevos Paradigmas para la Justicia Penal" is a work published
// in Spanish, so the original title is kept as-is in every locale (see
// docs/GLOSARIO-TRADUCCION.md §5 ter). A courtesy gloss of the title and
// subtitle is added in parentheses the first time they are quoted in running
// prose, inside `announcementParagraphs[0]`.
//
// Quotes: the statements in `quotes` were made in Spanish by real people at
// the book presentation. They are translated for comprehension; `quotesNote`
// carries the courtesy-translation notice required by §7 of the glossary.
export const en: PublicacionesLocaleContent = {
  labels: {
    publicaciones: 'Publications',
    declaraciones: 'Declarations',
    libros: 'Books',
    documentoOficial: 'Official document',
    organizacion: 'Organization',
    sede: 'Venue',
    fecha: 'Date',
    lugar: 'Location',
    autores: 'Authors',
    presentacion: 'Presentation',
    anuncioEyebrow: 'Announcement',
    anuncioTitle: 'A book to place victims at the centre of criminal proceedings.',
    presentacionEyebrow: 'Book launch',
    presentacionTitle: 'Voices from the book launch.',
    descargarDeclaracion: 'Download declaration',
    verDeclaracionCompleta: 'Read full declaration',
    verLibro: 'View book',
    leerNotaCompleta: 'Read the full article',
    volverA: 'Back to',
    fuente: 'Source',
    dossiers: 'Dossiers',
    dossiersMetaTitle: 'Thematic dossiers',
    dossiersMetaDescription:
      'Research dossiers by the Institute of Victimology of Usina de Justicia on life imprisonment, mental health and juvenile criminal responsibility.',
    dossiersEyebrow: 'Publications / Dossiers',
    dossiersTitle: 'The Institute’s thematic dossiers.',
    dossiersLead:
      "Research documents produced within the Institute's debate series, focused on three central discussions in Argentine criminal policy.",
    descargarDossier: 'Download dossier',
  },
  libro: {
    slug: 'nuevos-paradigmas-para-la-justicia-penal',
    title: 'Nuevos Paradigmas para la Justicia Penal',
    subtitle: 'Towards an era with a victim-centred perspective',
    authors: 'Diana Cohen Agrest and María Jimena Molina (editors)',
    coverImage: 'https://ivujus.org.ar/wp-content/uploads/2025/11/jimena_diana.jpg',
    coverAlt:
      'Diana Cohen Agrest and María Jimena Molina, editors of the book Nuevos Paradigmas para la Justicia Penal',
    fecha: '2025-11-04',
    announcementParagraphs: [
      'Usina de Justicia — the civil association founded and chaired by Diana Cohen Agrest — announced the presentation of its new book: "Nuevos Paradigmas para la Justicia Penal. Hacia una era con perspectiva de víctima" (New Paradigms for Criminal Justice. Towards an Era with a Victim\'s Perspective).',
      'The book, written by Cohen Agrest and María Jimena Molina, proposes a profound transformation of the Argentine judicial system. The central thrust of the work is the need to foster a debate that places victims at the centre of the criminal process, guaranteeing their rights and addressing their needs.',
      'The text brings together articles by various leading figures from the legal and academic fields, offering a critical view of the current criminal justice system. The aim is to promote a more humane, equitable model of justice, sensitive to the consequences of crime.',
    ],
    presentacion: {
      lugar: 'Dain Usina Cultural, Palermo, Ciudad Autónoma de Buenos Aires',
      fecha: '10 November 2025',
      horario: '18:00 to 20:00',
    },
    summaryIntro:
      'Summary of the book presentation, compiled by Diana Cohen Agrest and María Jimena Molina, with opening remarks by Silvia Fesquet (Clarín) and Florencia Abramzon (Quórum).',
    quotes: [
      {
        autor: 'Silvia Fesquet',
        rol: 'Editor-in-Chief at Clarín',
        cita: 'The great merit of the book and of Usina de Justicia is "putting victims back at the centre of the debate" and ending the "mistreatment by a system" that ignores them.',
      },
      {
        autor: 'Diana Cohen Agrest',
        rol: 'Philosopher and editor',
        cita: 'Unlike traditional legal writing, the work is written in "plain, almost colloquial language" for a general audience, unpacking the "fallacies and deceptions of abolitionist law".',
      },
      {
        autor: 'María Jimena Molina',
        rol: 'Editor',
        cita: 'She highlighted the work of Usina de Justicia through the Diploma Programme in Victimology and Victims\' Rights Legislation, created to "train every operator in the system", from staff to judges.',
      },
      {
        autor: 'Marcelo Peluzzi',
        rol: 'Judge for Criminal Sentence Enforcement (Juez de Ejecución Penal)',
        cita: 'A call to the Judiciary and the public prosecution services to "show solidarity with victims" when they come forward to report a crime, and to give them "more humane, more personal treatment".',
      },
      {
        autor: 'Florencia Abramzon',
        rol: 'Lawyer, founder of Quórum',
        cita: 'She defined the book as an urgent "paradigm shift", because "the offender cannot hold all the winning cards" while "we forget about the victim".',
      },
    ],
    quotesNote: 'Statements were made in Spanish; quotations are courtesy translations.',
    videoUrl:
      'https://ivujus.org.ar/wp-content/uploads/2025/11/WhatsApp-Video-2025-11-12-at-12.38.13-1.mp4',
    sourcePosts: [
      {
        id: 24509,
        url: 'https://ivujus.org.ar/usina-de-justicia-presenta-el-libro-nuevos-paradigmas-para-la-justicia-penal/',
      },
      {
        id: 24540,
        url: 'https://ivujus.org.ar/%f0%9f%93%96-resumen-de-la-presentacion-nuevos-paradigmas-para-la-justicia-penal/',
      },
    ],
  },
  dossiers: [
    {
      slug: 'prision-perpetua',
      titulo: 'Academic publication: the constitutionality of life imprisonment',
      fecha: 'January 2021',
      resumen:
        'Produced in collaboration with the Instituto de Altos Estudios de Mendoza, this text focuses on the legal dispute over life imprisonment under Argentine law. It compiles the analyses of a multidisciplinary forum held after a ruling by the Supreme Court of Justice of Mendoza, covering ethical, philosophical and criminal-law perspectives. The prologue notes that the provincial court upheld the legality of this sanction, setting a precedent for the country’s justice system.',
      pdfUrl: 'https://ivujus.org.ar/wp-content/uploads/2023/07/prision-perpetua.pdf',
    },
    {
      slug: 'salud-mental',
      titulo: 'Mental Health Dossier',
      fecha: 'November 2021',
      resumen:
        'Offers a critique of National Mental Health Law No. 26,657, arguing that its abolitionist approach fails to protect both patients and society. It contends that the law prioritises political ideology over scientific knowledge, promoting the closure of specialised institutions without offering effective alternatives for care, and warns about the law’s rigidity in the face of modern medical advances.',
      pdfUrl: 'https://ivujus.org.ar/wp-content/uploads/2023/07/Dossier-Salud-Mental.pdf',
    },
    {
      slug: 'responsabilidad-penal-juvenil',
      titulo: 'Juvenile Criminal Responsibility Dossier',
      fecha: 'August 2025',
      resumen:
        'Presents arguments in favour of reforming the juvenile criminal justice system in Argentina, focusing on lowering the age of criminal responsibility and on a paradigm shift that puts the victim first. It argues for lowering the minimum age of criminal responsibility to 14 or 13, drawing on neuroscience evidence about the development of moral judgment between ages 10 and 12, and notes that Argentina is among a minority of jurisdictions with a minimum age of 16 or older, against a global average of 12. It concludes that lowering the age of criminal responsibility is not merely a punitive measure, but a social and technical necessity to protect victims and provide real institutional intervention for minors in conflict with the law.',
      pdfUrl:
        'https://ivujus.org.ar/wp-content/uploads/2025/09/Dossier.-La-responsabilidad-penal-de-los-menores-delincuentes_IVUJUS-1.pdf',
    },
  ],
};
