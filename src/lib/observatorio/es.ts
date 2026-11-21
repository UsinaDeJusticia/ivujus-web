import { MAPA_DEL_DELITO_URL } from './constants';
import type { ObservatorioContent } from './types';

// Fuente de la ficha del Mapa: los metadatos públicos de la propia
// aplicación (title, description y og:description de
// https://mapa-delito-usina.vercel.app/mapa-del-delito, leídos el
// 21-nov-2026). No se agregan cifras, indicadores ni metodología que no
// estén ahí: cuando el equipo los provea, se suman a `descripcion`/`ficha`.
// Crédito definido por Emanuel (21-nov-2026).
export const es: ObservatorioContent = {
  labels: {
    metaTitle: 'Observatorio',
    metaDescription:
      'Observatorio del Instituto de Victimología de Usina de Justicia (IVUJUS): herramientas de datos y análisis sobre el delito y las víctimas.',
    eyebrow: 'Observatorio',
    heading: 'Evidencia y herramientas para comprender el delito y a sus víctimas.',
    lead: 'El Observatorio del IVUJUS reúne herramientas de datos y análisis, propias y de Usina de Justicia, de acceso público.',
    herramientasHeading: 'Herramientas',
    verHerramienta: 'Conocer la herramienta',
    fichaHeading: 'Ficha',
    abreEnPestana: 'Se abre en una pestaña nueva.',
    volver: 'Volver al Observatorio',
    breadcrumbHome: 'Inicio',
  },
  herramientas: [
    {
      slug: 'mapa-del-delito',
      nombre: 'Mapa Nacional del Delito',
      resumen: 'Mapa interactivo de la criminalidad en la Argentina, provincia por provincia.',
      descripcion: [
        'El Mapa Nacional del Delito es un mapa interactivo de la criminalidad en la Argentina. Permite visualizar los datos provincia por provincia.',
        'Trabaja con datos oficiales del Sistema Nacional de Información Criminal (SNIC), con cobertura nacional y profundidad temporal desde 2014.',
        'Es una herramienta pública de Usina de Justicia.',
      ],
      ficha: [
        { etiqueta: 'Fuente de los datos', valor: 'Sistema Nacional de Información Criminal (SNIC)' },
        { etiqueta: 'Cobertura', valor: 'Nacional, por provincia' },
        { etiqueta: 'Período', valor: 'Desde 2014' },
        { etiqueta: 'Desarrollo', valor: 'Usina de Justicia' },
      ],
      autoria: 'Usina de Justicia',
      credito: 'Una herramienta de Usina de Justicia presentada por el Observatorio del IVUJUS.',
      url: MAPA_DEL_DELITO_URL,
      abrir: 'Abrir el mapa',
      source_url: MAPA_DEL_DELITO_URL,
    },
  ],
};
