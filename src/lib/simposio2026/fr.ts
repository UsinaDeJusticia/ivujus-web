import type { GaleriaImagen, PressArticle, Simposio2026Content, SymposiumDay } from './types';

// Nota de idioma para las notas de prensa: son artículos reales publicados en
// español (docs/GLOSARIO-TRADUCCION.md §7, "Títulos de notas de prensa"). El
// título NUNCA se traduce; esta nota es la única marca de idioma.
const NOTA_IDIOMA_PRENSA = 'Article publié en espagnol.';

export const content: Simposio2026Content = {
  slug: '2026-buenos-aires',
  title: 'Premier Symposium américain et européen de victimologie pénale',
  subtitle: "Les victimes d'homicide dans un contexte d'insécurité",
  location: 'Ville autonome de Buenos Aires',
  dates: '9 et 10 avril 2026',
  organizingInstitution: 'Usina de Justicia et CPACF',
  summary:
    "Rencontre académique et institutionnelle qui a réuni des références d'Amérique et d'Europe pour débattre des droits des victimes, de la victimologie scientifique et de nouvelles bases pour un droit pénal à perspective centrée sur la victime.",
  highlights: [
    'Déclaration de Buenos Aires',
    'Douze blocs du programme avec archive audiovisuelle',
    'Couverture dans les médias nationaux et spécialisés',
  ],
  declaration: {
    title: 'Déclaration de Buenos Aires',
    intro:
      "Document officiel signé par des universitaires, des professionnels et des acteurs du système de justice à la clôture du symposium.",
    standards: [
      "Article 1 : Réaffirmation de la Déclaration de l'ONU de 1985 comme norme minimale et incontournable.",
      'Article 2 : Nouveau paradigme du système pénal axé sur une ère à perspective centrée sur la victime.',
      'Article 3 : Transition vers un droit pénal et procédural scientifique fondé sur des preuves.',
      "Article 4 : Exhortation à l'OEA afin qu'elle adopte une Convention interaméricaine inspirée de la Directive 2012/29/UE.",
      'Article 5 : Engagement académique et institutionnel à financer et développer le paradigme de la victimologie scientifique.',
    ],
    pdfUrl:
      'https://ivujus.org.ar/wp-content/uploads/2026/04/Declaracion-de-Buenos-Aires-Traduccion-al-Ingles-Frances-y-Portugues.pdf',
    pdfNote: 'Comprend des versions en espagnol, anglais, français et portugais.',
  },
  days: [
    {
      id: 'jueves',
      shortLabel: '9 AVR',
      title: "Journée d'ouverture",
      summary:
        'Ouverture du symposium et positionnement de la victimologie pénale comme science autonome et indépendante.',
      sessions: [
        {
          time: '15h00',
          title: "Discours d'ouverture",
          speakers:
            'Ricardo Gil Lavedra, Diana Cohen Agrest, José Console, María Jimena Molina.',
        },
        {
          time: '15h20',
          title: 'Panel I : Politiques publiques de prise en charge et d’assistance aux victimes',
          speakers: 'María de la Luz Lima Malvido.',
          youtubeUrl: 'https://www.youtube.com/embed/Adi-yBGunbw',
        },
        {
          time: '16h05',
          title: 'Panel II : La victime et le droit pénal',
          speakers: 'Francisco Castex, José Console.',
          youtubeUrl: 'https://www.youtube.com/embed/LFcAFOmdHas',
        },
        {
          time: '16h35',
          title: 'Panel III : La victime et la science',
          speakers: 'Daniel Roggero, Noelia Marelyn Juárez.',
          youtubeUrl: 'https://www.youtube.com/embed/3mv5NoXD6pQ',
        },
        {
          time: '17h15',
          title: 'Panel IV : Travail de terrain et loi sur les données génétiques',
          speakers: 'Raquel Slotolow, Guillermo Bargna.',
          summary: 'Témoignages de proches et analyse de la Ley 27.759.',
          youtubeUrl: 'https://www.youtube.com/embed/9Arb38RS-6U',
        },
        {
          time: '17h45',
          title: 'Panel V : La fonction de défenseur de la victime (Panama)',
          speakers: 'Darío Solís.',
          youtubeUrl: 'https://www.youtube.com/embed/Ozv_7gJu5t8',
        },
        {
          time: '18h30',
          title: 'Remise de distinctions et clôture de la journée',
          notes: 'Réserver la photographie officielle de la clôture dès que le fichier définitif sera disponible.',
        },
      ],
    },
    {
      id: 'viernes',
      shortLabel: '10 AVR',
      title: 'Journée de clôture',
      summary:
        "Approfondissement sur le rôle du Ministère public, l'abolitionnisme pénal et la signature de la Déclaration de Buenos Aires.",
      sessions: [
        {
          time: '15h00',
          title: 'Panel I : Les droits des victimes',
          speakers: 'María Jimena Molina.',
          summary: 'Intervention centrale sur les principes fondamentaux de la justice.',
          youtubeUrl: 'https://www.youtube.com/embed/dpYH04fdXew',
        },
        {
          time: '15h45',
          title: 'Panel II : La victime, le Ministère public et la politique criminelle',
          speakers: 'Germán Garavano, Martín Casares.',
          youtubeUrl: 'https://www.youtube.com/embed/hQqwZlV_mcs',
        },
        {
          time: '16h15',
          title: 'Panel III : Le jugement par contumace et l’abolitionnisme pénal',
          speakers: 'Diana Cohen Agrest, Franco Fiumara.',
          summary: 'Comprend une participation vidéo de Franco Fiumara.',
          youtubeUrl: 'https://www.youtube.com/embed/Zfeha2pQOiM',
          notes: 'Vidéo individuelle de Franco Fiumara : https://www.youtube.com/embed/nBpQHVXIOr0',
        },
        {
          time: '16h45',
          title: "Panel IV : La victime au stade de l'exécution de la peine",
          speakers: 'Marcelo Peluzzi.',
          youtubeUrl: 'https://www.youtube.com/embed/t8K0Z0vCH-s',
        },
        {
          time: '17h10',
          title: 'Panel V : Abolitionnisme pénal. Contre le dogme dominant',
          speakers: 'Francisco Javier Pascua, María Jimena Molina.',
          youtubeUrl: 'https://www.youtube.com/embed/Zfeha2pQOiM',
        },
        {
          time: '17h40',
          title: 'Panel VI : Critiques de la criminologie critique',
          speakers: 'Marcelo Aebi.',
          youtubeUrl: 'https://www.youtube.com/embed/PgRiWq_X0D8',
        },
        {
          time: '18h25',
          title: 'Lecture et signature de la Déclaration de Buenos Aires',
          summary: 'Remise de distinctions et clôture officielle du symposium.',
          youtubeUrl: 'https://www.youtube.com/embed/nnGiCHyhgzw',
          notes: 'Réserver la photographie officielle de la signature dès que le fichier définitif sera disponible.',
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
      alt: "Couverture d'Infobae sur le Symposium 2026",
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'DEF Online',
      title: 'Un espacio que reclama por las víctimas de América y Europa',
      href: 'https://defonline.com.ar/seguridad/simposio-de-victimologia-penal-un-espacio-que-reclama-por-las-victimas-de-america-y-europa/',
      image: 'https://defonline.com.ar/wp-content/uploads/2026/04/Portada-1.jpeg',
      alt: 'Couverture de DEF Online sur le Symposium 2026',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'Revista Quórum',
      title: 'Victimología penal: hacia una justicia centrada en la víctima',
      href: 'https://revistaquorum.com.ar/2026/04/13/victimologia-penal-hacia-una-justicia-centrada-en-la-victima/',
      image:
        'https://revistaquorum.com.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-8.12.29-PM-1068x481.jpeg',
      alt: 'Couverture de Revista Quórum sur le Symposium 2026',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'DEF Online',
      title: 'Hito en la Justicia argentina: se organizará el Primer Simposio Americano y Europeo',
      href: 'https://defonline.com.ar/seguridad/hito-en-la-justicia-argentina-se-organizara-el-primer-simposio-americano-y-europeo-de-victimologia-penal/',
      image: 'https://defonline.com.ar/wp-content/uploads/2026/04/colegio-abogados-caba-1392x927.jpg',
      alt: 'Couverture préalable de DEF Online sur le Symposium 2026',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'DEF Online',
      title: 'Victimología penal: por qué el sistema judicial le sigue fallando a las víctimas',
      href: 'https://defonline.com.ar/internacionales/victimologia-penal-por-que-el-sistema-judicial-le-sigue-fallando-a-las-victimas/',
      image:
        'https://defonline.com.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-10-at-18.26.35.jpeg',
      alt: 'Couverture de DEF Online sur les victimes et la justice',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
    {
      outlet: 'Revista Quórum',
      title: 'La victimología penal como modelo a seguir',
      href: 'https://revistaquorum.com.ar/2026/03/13/la-victimologia-penal-como-modelo-a-seguir/',
      image:
        'https://revistaquorum.com.ar/wp-content/uploads/2026/03/25062513_Diseno-sin-titulo-3-1068x726.jpg',
      alt: 'Couverture de Revista Quórum sur la victimologie pénale',
      notaIdioma: NOTA_IDIOMA_PRENSA,
    },
  ] satisfies PressArticle[],
  galeria: [
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/aebi-1024x862.jpeg',
      alt: 'Marcelo Aebi intervient lors du Premier Symposium américain et européen de victimologie pénale.',
      epigrafe: 'Marcelo Aebi, intervenant au symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/slotolow-1024x862.jpeg',
      alt: 'Raquel Slotolow intervient lors du Premier Symposium américain et européen de victimologie pénale.',
      epigrafe: 'Raquel Slotolow, intervenante au symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/pascua-1024x862.jpeg',
      alt: 'Francisco Javier Pascua intervient lors du Premier Symposium américain et européen de victimologie pénale.',
      epigrafe: 'Francisco Javier Pascua, intervenant au symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/molina-1024x862.jpeg',
      alt: 'María Jimena Molina intervient lors du Premier Symposium américain et européen de victimologie pénale.',
      epigrafe: 'María Jimena Molina, intervenante au symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/garavano-1024x862.jpeg',
      alt: 'Germán Garavano intervient lors du Premier Symposium américain et européen de victimologie pénale.',
      epigrafe: 'Germán Garavano, intervenant au symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/console-1024x862.jpeg',
      alt: 'José Console intervient lors du Premier Symposium américain et européen de victimologie pénale.',
      epigrafe: 'José Console, intervenant au symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/casares-1024x862.jpeg',
      alt: 'Martín Casares intervient lors du Premier Symposium américain et européen de victimologie pénale.',
      epigrafe: 'Martín Casares, intervenant au symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/bargna-1024x862.jpeg',
      alt: 'Guillermo Bargna intervient lors du Premier Symposium américain et européen de victimologie pénale.',
      epigrafe: 'Guillermo Bargna, intervenant au symposium.',
    },
    {
      imagen: 'https://ivujus.org.ar/wp-content/uploads/2026/04/1-1024x1024.jpeg',
      alt: 'Photographie de groupe de clôture du Premier Symposium américain et européen de victimologie pénale, CPACF, avril 2026.',
      epigrafe: 'Photographie de clôture sur la scène du CPACF.',
    },
    {
      imagen:
        'https://ivujus.org.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-14-at--1024x862.jpeg',
      alt: 'Public dans la salle pendant le Premier Symposium américain et européen de victimologie pénale, CPACF, avril 2026.',
      epigrafe: "La salle du CPACF pendant l'une des journées.",
    },
    {
      imagen:
        'https://ivujus.org.ar/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-14-at-11.06.08-1024x576.jpeg',
      alt: 'Remise de distinctions pendant le Premier Symposium américain et européen de victimologie pénale, CPACF, avril 2026.',
      epigrafe: "Remise de distinctions à la clôture de l'une des journées.",
    },
  ] satisfies GaleriaImagen[],
};
