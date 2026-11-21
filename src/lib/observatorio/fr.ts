import { MAPA_DEL_DELITO_URL } from './constants';
import type { ObservatorioContent } from './types';

export const fr: ObservatorioContent = {
  labels: {
    metaTitle: 'Observatoire',
    metaDescription:
      "Observatoire de l'Institut de Victimologie d'Usina de Justicia (IVUJUS) : outils de données et d'analyse sur la criminalité et les victimes.",
    eyebrow: 'Observatoire',
    heading: 'Des données et des outils pour comprendre la criminalité et ses victimes.',
    lead: "L'Observatoire de l'IVUJUS réunit des outils de données et d'analyse en accès libre, développés par l'Institut et par Usina de Justicia.",
    herramientasHeading: 'Outils',
    verHerramienta: "Découvrir l'outil",
    fichaHeading: 'Fiche',
    abreEnPestana: "S'ouvre dans un nouvel onglet.",
    volver: "Retour à l'Observatoire",
    breadcrumbHome: 'Accueil',
  },
  herramientas: [
    {
      slug: 'mapa-del-delito',
      nombre: 'Mapa Nacional del Delito (Carte nationale de la criminalité)',
      resumen: 'Carte interactive de la criminalité en Argentine, province par province.',
      descripcion: [
        "La Carte nationale de la criminalité est une carte interactive de la criminalité en Argentine. Elle présente les données province par province.",
        "Elle s'appuie sur les données officielles du Système national d'information criminelle (SNIC), avec une couverture nationale et des séries depuis 2014.",
        "C'est un outil public développé par Usina de Justicia.",
      ],
      ficha: [
        { etiqueta: 'Source des données', valor: "Système national d'information criminelle (SNIC)" },
        { etiqueta: 'Couverture', valor: 'Nationale, par province' },
        { etiqueta: 'Période', valor: 'Depuis 2014' },
        { etiqueta: 'Développement', valor: 'Usina de Justicia' },
      ],
      autoria: 'Usina de Justicia',
      credito: "Un outil d'Usina de Justicia présenté par l'Observatoire de l'IVUJUS.",
      url: MAPA_DEL_DELITO_URL,
      abrir: 'Ouvrir la carte',
      notaIdioma: 'La carte est en espagnol.',
      source_url: MAPA_DEL_DELITO_URL,
    },
  ],
};
