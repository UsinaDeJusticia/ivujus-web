import type { GaleriaImagen, PressArticle, Simposio2026Content, SymposiumDay } from './types';

// Nota de idioma para las notas de prensa: son artículos reales publicados en
// español (docs/GLOSARIO-TRADUCCION.md §7, "Títulos de notas de prensa"). El
// título NUNCA se traduce; esta nota es la única marca de idioma.
const NOTA_IDIOMA_PRENSA = 'Article published in Spanish.';

export const content: Simposio2026Content = {
  slug: '2026-buenos-aires',
  title: 'First American and European Symposium on Criminal Victimology',
  subtitle: 'Homicide victims in a context of insecurity',
  location: 'Autonomous City of Buenos Aires',
  dates: '9 and 10 April 2026',
  organizingInstitution: 'Usina de Justicia and CPACF',
  summary:
    'An academic and institutional gathering that brought together leading figures from the Americas and Europe to discuss victims’ rights, scientific victimology and new foundations for a criminal law with a victim-centred perspective.',
  highlights: [
    'Buenos Aires Declaration',
    'Twelve programme sessions with audiovisual archive',
    'Coverage in national and specialised media',
  ],
  declaration: {
    title: 'Buenos Aires Declaration',
    intro:
      'Official document signed by academics, professionals and justice-system operators at the close of the symposium.',
    standards: [
      'Article 1: Reaffirmation of the 1985 UN Declaration as a minimum, non-derogable standard.',
      'Article 2: A new criminal justice system paradigm focused on an era with a victim-centred perspective.',
      'Article 3: Transition towards an evidence-based Scientific Criminal and Procedural Law.',
      'Article 4: A call on the OAS to adopt an Inter-American Convention inspired by Directive 2012/29/EU.',
      'Article 5: Academic and institutional commitment to fund and develop the paradigm of scientific victimology.',
    ],
    pdfUrl:
      'https://ivujus.org.ar/wp-content/uploads/2026/04/Declaracion-de-Buenos-Aires-Traduccion-al-Ingles-Frances-y-Portugues.pdf',
    pdfNote: 'Includes versions in Spanish, English, French and Portuguese.',
  },
  days: [
    {
      id: 'jueves',
      shortLabel: '9 APR',
      title: 'Opening day',
      summary:
        'Opening of the symposium and positioning of criminal victimology as an autonomous and independent science.',
      sessions: [
        {
          time: '15:00',
          title: 'Opening remarks',
          speakers:
            'Ricardo Gil Lavedra, Diana Cohen Agrest, José Console, María Jimena Molina.',
        },
        {
          time: '15:20',
          title: 'Panel I: Public policies on victim care and assistance',
          speakers: 'María de la Luz Lima Malvido.',
          youtubeUrl: 'https://www.youtube.com/embed/Adi-yBGunbw',
        },
        {
          time: '16:05',
          title: 'Panel II: The victim and criminal law',
          speakers: 'Francisco Castex, José Console.',
          youtubeUrl: 'https://www.youtube.com/embed/LFcAFOmdHas',
        },
        {
          time: '16:35',
          title: 'Panel III: The victim and science',
          speakers: 'Daniel Roggero, Noelia Marelyn Juárez.',
          youtubeUrl: 'https://www.youtube.com/embed/3mv5NoXD6pQ',
        },
        {
          time: '17:15',
          title: 'Panel IV: Fieldwork and the Genetic Data Act',
          speakers: 'Raquel Slotolow, Guillermo Bargna.',
          summary: 'Testimonies from relatives and analysis of Ley 27.759.',
          youtubeUrl: 'https://www.youtube.com/embed/9Arb38RS-6U',
        },
        {
          time: '17:45',
          title: 'Panel V: The victim advocate role (Panama)',
          speakers: 'Darío Solís.',
          youtubeUrl: 'https://www.youtube.com/embed/Ozv_7gJu5t8',
        },
        {
          time: '18:30',
          title: 'Awards ceremony and closing of the day',
          notes: 'Reserve the official closing photograph once the final asset is available.',
        },
      ],
    },
    {
      id: 'viernes',
      shortLabel: '10 APR',
      title: 'Closing day',
      summary:
        'In-depth discussion on the role of the Public Prosecutor’s Office, penal abolitionism and the signing of the Buenos Aires Declaration.',
      sessions: [
        {
          time: '15:00',
          title: 'Panel I: Victims’ rights',
          speakers: 'María Jimena Molina.',
          summary: 'Keynote address on the fundamental principles of justice.',
          youtubeUrl: 'https://www.youtube.com/embed/dpYH04fdXew',
        },
        {
          time: '15:45',
          title: 'Panel II: The victim, the Public Prosecutor’s Office and criminal policy',
          speakers: 'Germán Garavano, Martín Casares.',
          youtubeUrl: 'https://www.youtube.com/embed/hQqwZlV_mcs',
        },
        {
          time: '16:15',
          title: 'Panel III: Trial in absentia and penal abolitionism',
          speakers: 'Diana Cohen Agrest, Franco Fiumara.',
          summary: 'Includes a video contribution from Franco Fiumara.',
          youtubeUrl: 'https://www.youtube.com/embed/Zfeha2pQOiM',
          notes: 'Individual video from Franco Fiumara: https://www.youtube.com/embed/nBpQHVXIOr0',
        },
        {
          time: '16:45',
          title: 'Panel IV: The victim at the sentence-enforcement stage',
          speakers: 'Marcelo Peluzzi.',
          youtubeUrl: 'https://www.youtube.com/embed/t8K0Z0vCH-s',
        },
        {
          time: '17:10',
          title: 'Panel V: Penal abolitionism. Against the prevailing dogma',
          speakers: 'Francisco Javier Pascua, María Jimena Molina.',
          youtubeUrl: 'https://www.youtube.com/embed/Zfeha2pQOiM',
        },
        {
          time: '17:40',
          title: 'Panel VI: Critiques of critical criminology',
          speakers: 'Marcelo Aebi.',
          youtubeUrl: 'https://www.youtube.com/embed/PgRiWq_X0D8',
        },
        {
          time: '18:25',
          title: 'Reading and signing of the Buenos Aires Declaration',
          summary: 'Awards ceremony and official closing of the symposium.',
          youtubeUrl: 'https://www.youtube.com/embed/nnGiCHyhgzw',
          notes: 'Reserve the official signing photograph once the final asset is available.',
        },
      ],
    },
  ] satisfies SymposiumDay[],
  press: [
    {
      outlet: 'Infobae / DEF',
      title: 'Victimología penal: una discusión internacional histórica con sede en Argentina',
      href: 'https://www.infobae.com/def/2026/04/11/victimologia-penal-una-discusion-internacional-historica-con-sede-en-argentina/',
      image:
        'https://www.infobae.com/resizer/v2/MULE7IV3V5CDFIW3L3DDKLIS5E.jpeg?auth=7f880a1198911b63e26665e77e7ef84925c05217f493c050a21321e16f88e228&smart=true&width=800&height=420&quality=85',
      alt: 'Infobae coverage of the 2026 Symposium',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'DEF Online',
      title: 'Un espacio que reclama por las víctimas de América y Europa',
      href: 'https://defonline.com.ar/seguridad/simposio-de-victimologia-penal-un-espacio-que-reclama-por-las-victimas-de-america-y-europa/',
      image: 'https://defonline.com.ar/wp-content/uploads/2026/04/Portada-1.jpeg',
      alt: 'DEF Online coverage of the 2026 Symposium',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'Revista Quórum',
      title: 'Victimología penal: hacia una justicia centrada en la víctima',
      href: 'https://revistaquorum.com.ar/2026/04/13/victimologia-penal-hacia-una-justicia-centrada-en-la-victima/',
      image:
        'https://revistaquorum.com.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-8.12.29-PM-1068x481.jpeg',
      alt: 'Revista Quórum coverage of the 2026 Symposium',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'DEF Online',
      title: 'Hito en la Justicia argentina: se organizará el Primer Simposio Americano y Europeo',
      href: 'https://defonline.com.ar/seguridad/hito-en-la-justicia-argentina-se-organizara-el-primer-simposio-americano-y-europeo-de-victimologia-penal/',
      image: 'https://defonline.com.ar/wp-content/uploads/2026/04/colegio-abogados-caba-1392x927.jpg',
      alt: 'Prior DEF Online coverage of the 2026 Symposium',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'DEF Online',
      title: 'Victimología penal: por qué el sistema judicial le sigue fallando a las víctimas',
      href: 'https://defonline.com.ar/internacionales/victimologia-penal-por-que-el-sistema-judicial-le-sigue-fallando-a-las-victimas/',
      image:
        'https://defonline.com.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-18.26.35.jpeg',
      alt: 'DEF Online coverage on victims and justice',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'Revista Quórum',
      title: 'La victimología penal como modelo a seguir',
      href: 'https://revistaquorum.com.ar/2026/03/13/la-victimologia-penal-como-modelo-a-seguir/',
      image:
        'https://revistaquorum.com.ar/wp-content/uploads/2026/03/25062513_Diseno-sin-titulo-3-1068x726.jpg',
      alt: 'Revista Quórum coverage on criminal victimology',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
  ] satisfies PressArticle[],
  galeria: [
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/aebi-1024x862.jpeg',
      alt: 'Marcelo Aebi speaks at the First American and European Symposium on Criminal Victimology.',
      epigrafe: 'Marcelo Aebi, speaker at the symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/slotolow-1024x862.jpeg',
      alt: 'Raquel Slotolow speaks at the First American and European Symposium on Criminal Victimology.',
      epigrafe: 'Raquel Slotolow, speaker at the symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/pascua-1024x862.jpeg',
      alt: 'Francisco Javier Pascua speaks at the First American and European Symposium on Criminal Victimology.',
      epigrafe: 'Francisco Javier Pascua, speaker at the symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/molina-1024x862.jpeg',
      alt: 'María Jimena Molina speaks at the First American and European Symposium on Criminal Victimology.',
      epigrafe: 'María Jimena Molina, speaker at the symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/garavano-1024x862.jpeg',
      alt: 'Germán Garavano speaks at the First American and European Symposium on Criminal Victimology.',
      epigrafe: 'Germán Garavano, speaker at the symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/console-1024x862.jpeg',
      alt: 'José Console speaks at the First American and European Symposium on Criminal Victimology.',
      epigrafe: 'José Console, speaker at the symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/casares-1024x862.jpeg',
      alt: 'Martín Casares speaks at the First American and European Symposium on Criminal Victimology.',
      epigrafe: 'Martín Casares, speaker at the symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/bargna-1024x862.jpeg',
      alt: 'Guillermo Bargna speaks at the First American and European Symposium on Criminal Victimology.',
      epigrafe: 'Guillermo Bargna, speaker at the symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/1-1024x1024.jpeg',
      alt: 'Group closing photograph of the First American and European Symposium on Criminal Victimology, CPACF, April 2026.',
      epigrafe: 'Closing photograph on the CPACF stage.',
    },
    {
      imagen:
        'https://ivujus.org.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-14-at--1024x862.jpeg',
      alt: 'Audience in the hall during the First American and European Symposium on Criminal Victimology, CPACF, April 2026.',
      epigrafe: 'The CPACF hall during one of the conference days.',
    },
    {
      imagen:
        'https://ivujus.org.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-14-at-11.06.08-1024x576.jpeg',
      alt: 'Awards ceremony during the First American and European Symposium on Criminal Victimology, CPACF, April 2026.',
      epigrafe: 'Awards ceremony at the close of one of the conference days.',
    },
  ] satisfies GaleriaImagen[],
};
