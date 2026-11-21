import { MAPA_DEL_DELITO_URL } from './constants';
import type { ObservatorioContent } from './types';

export const en: ObservatorioContent = {
  labels: {
    metaTitle: 'Observatory',
    metaDescription:
      'Observatory of the Institute of Victimology of Usina de Justicia (IVUJUS): data and analysis tools on crime and victims.',
    eyebrow: 'Observatory',
    heading: 'Evidence and tools to understand crime and its victims.',
    lead: 'The IVUJUS Observatory brings together publicly available data and analysis tools, developed by the Institute and by Usina de Justicia.',
    herramientasHeading: 'Tools',
    verHerramienta: 'About this tool',
    fichaHeading: 'Overview',
    abreEnPestana: 'Opens in a new tab.',
    volver: 'Back to the Observatory',
    breadcrumbHome: 'Home',
  },
  herramientas: [
    {
      slug: 'mapa-del-delito',
      nombre: 'Mapa Nacional del Delito (National Crime Map)',
      resumen: 'Interactive map of crime in Argentina, province by province.',
      descripcion: [
        'The National Crime Map is an interactive map of crime in Argentina. It shows the data province by province.',
        'It uses official data from the National Criminal Information System (SNIC), with national coverage and data going back to 2014.',
        'It is a public tool developed by Usina de Justicia.',
      ],
      ficha: [
        { etiqueta: 'Data source', valor: 'National Criminal Information System (SNIC)' },
        { etiqueta: 'Coverage', valor: 'National, by province' },
        { etiqueta: 'Period', valor: 'Since 2014' },
        { etiqueta: 'Developed by', valor: 'Usina de Justicia' },
      ],
      autoria: 'Usina de Justicia',
      credito: 'A tool by Usina de Justicia, presented by the IVUJUS Observatory.',
      url: MAPA_DEL_DELITO_URL,
      abrir: 'Open the map',
      notaIdioma: 'The map is in Spanish.',
      source_url: MAPA_DEL_DELITO_URL,
    },
  ],
};
