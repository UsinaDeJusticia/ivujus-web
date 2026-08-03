import type { BibliotecaLocaleContent } from './types';

// Version française. Voir es.ts pour la raison pour laquelle
// `librosRecomendados` est vide.
export const fr: BibliotecaLocaleContent = {
  labels: {
    biblioteca: 'Bibliothèque',
    metaTitle: 'Bibliothèque',
    metaDescription:
      "Toute la production éditoriale de l'Institut de Victimologie d'Usina de Justicia : livres, dossiers thématiques et déclarations, avec leur résumé et leur accès.",
    eyebrow: 'Publications / Bibliothèque',
    heading: "Tout le matériel de l'Institut, en un seul endroit.",
    lead: "Livres, dossiers thématiques et déclarations. Pour chaque pièce, nous publions un résumé et le lien permettant d'accéder au document complet ou de l'acheter sur son site officiel.",
    vidrieraNota:
      "L'étagère est une vue décorative du matériel. La liste complète, avec le résumé et le lien de chaque pièce, se trouve ci-dessous.",
    librosPropiosTitle: "Livres de l'IVUJUS",
    librosPropiosLead: "Ouvrages édités par l'institut ou avec sa participation directe.",
    librosRecomendadosTitle: 'Livres recommandés',
    librosRecomendadosLead:
      "Ouvrages de tiers que l'institut recommande. Ce ne sont pas nos propres publications : pour chacun, nous donnons un résumé et le lien vers son point de vente officiel.",
    dossiersTitle: 'Dossiers thématiques',
    dossiersLead: "Documents de travail de l'institut sur un sujet précis, en téléchargement libre.",
    declaracionesTitle: 'Déclarations',
    declaracionesLead: "Documents officiels signés dans le cadre des activités de l'institut.",
    verFicha: 'Voir la fiche complète',
    verDossiers: 'Voir tous les dossiers',
    verDeclaracion: 'Lire la déclaration complète',
  },
  librosRecomendados: [],
};
