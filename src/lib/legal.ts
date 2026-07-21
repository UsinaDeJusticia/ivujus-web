// legal.ts — dataset de /[locale]/terms-privacy.
//
// Contenido trazable: texto legal real extraído de la API pública de
// WordPress del sitio vivo de IVUJUS (page id 18848, slug "terms-privacy"),
// consultado el 2026-07-21 vía:
//   curl -sS "https://ivujus.org.ar/wp-json/wp/v2/pages?slug=terms-privacy&_fields=title,content"
//
// El título devuelto por WP es "Políticas de privacidad": la página fuente
// contiene únicamente una política de privacidad (no hay una sección
// separada de "términos y condiciones" en el HTML recibido), por eso este
// dataset no inventa un bloque de términos que no existe en la fuente.
//
// Limpieza aplicada sobre el HTML crudo (Gutenberg, párrafos sueltos con
// spans font-weight:400): se removieron las etiquetas de formato inline y
// se agrupó el texto en secciones H2/H3 según los títulos en mayúsculas que
// ya traía el documento original. No se agregó, resumió ni reformuló
// ninguna cláusula.
//
// Única corrección ortográfica sobre la fuente: el enlace de baja de
// Digital Advertising Alliance venía como "ttp://optout.aboutads.info/"
// (falta la "h" inicial, error de tipeo evidente en el WP de origen) — se
// corrigió a "http://" para que el enlace funcione; no cambia contenido ni
// clausulado.
export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export const termsPrivacyData = {
  documentTitle: 'Políticas de privacidad',
  subtitle: 'Política de privacidad de Usina de Justicia – Argentina Asociación Civil',
  source: {
    label: 'Fuente: WordPress institucional de IVUJUS (page id 18848, slug "terms-privacy")',
    url: 'https://ivujus.org.ar/wp-json/wp/v2/pages?slug=terms-privacy&_fields=title,content',
    fetchedAt: '2026-07-21',
  },
  intro:
    'Esta política de privacidad describe cómo se recopila, utiliza y comparte su información personal cuando visita o hace una compra en www.ivujus.org.ar (denominado en lo sucesivo el "Sitio").',
  sections: [
    {
      heading: 'Información personal que recopilamos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cuando visita el Sitio, recopilamos automáticamente cierta información sobre su dispositivo, incluida información sobre su navegador web, dirección IP, zona horaria y algunas de las cookies que están instaladas en su dispositivo. Además, a medida que navega por el Sitio, recopilamos información sobre las páginas web individuales o los productos que ve, las páginas web o los términos de búsqueda que lo remitieron al Sitio e información sobre cómo interactúa usted con el Sitio. Nos referimos a esta información recopilada automáticamente como "Información del dispositivo".',
        },
        {
          type: 'paragraph',
          text: 'Recopilamos Información del dispositivo mediante el uso de las siguientes tecnologías:',
        },
        { type: 'paragraph', text: 'Cookies' },
        {
          type: 'list',
          items: [
            'wordpress_test_cookie – en esta cookie WordPress comprueba y guarda si las cookies están activadas en el navegador. Técnica de sesión. Necesaria.',
            'wordpress_[hash] – cookie restringida al área de administración (wp-admin). No se ve en el frontend incluso estando registrado. Guarda tus datos de acceso. Técnica de sesión. Necesaria.',
            'wordpress_sec_[hash] – lo mismo que la anterior (de hecho creo que la sustituye). Necesaria.',
            'wordpress_logged_in_[hash] – Guarda quien eres mientras estás registrado y lo usa WordPress para su interfaz. Técnica de sesión. Necesaria.',
            'wp-settings-{time}-[UID] – Guarda tus configuraciones de la zona de administración e incluso del frontend. UID es tu ID de usuario en WordPress. Técnica persistente. Tiempo por defecto 1 año. Necesaria.',
            'wp-settings-[UID] – como la anterior. Guarda tus configuraciones de la zona de administración e incluso del frontend. UID es tu ID de usuario. Técnica persistente. Tiempo por defecto 1 año.',
            'wp-postpass_[hash] – Cookie donde se guarda el acceso a páginas protegidas con contraseña. Técnica persistente. Tiempo por defecto 10 días.',
            'comment_author_[hash] – para recordar el nombre del que realiza el comentario. Técnica persistente. Duración 347 días.',
            'comment_author_email_[hash] – para recordar el email del que realiza el comentario. Técnica persistente. Duración 347 días.',
            'comment_author_url_[hash] – para recordar la url del que realiza el comentario. Técnica persistente. Duración 347 días.',
          ],
        },
        {
          type: 'paragraph',
          text: '– Los "Archivos de registro" rastrean las acciones que ocurren en el Sitio y recopilan datos, incluyendo su dirección IP, tipo de navegador, proveedor de servicio de Internet, páginas de referencia/salida y marcas de fecha/horario.',
        },
        {
          type: 'paragraph',
          text: '– Las "balizas web", las "etiquetas" y los "píxeles" son archivos electrónicos utilizados para registrar información sobre cómo navega usted por el Sitio.',
        },
        {
          type: 'paragraph',
          text: 'Además, cuando hace una compra o intenta hacer una compra a través del Sitio, recopilamos cierta información de usted, entre la que se incluye su nombre, dirección de facturación, dirección de envío, información de pago (incluidos los números de la tarjeta de crédito), dirección de correo electrónico y número de teléfono. Al mismo tiempo acepta los términos y condiciones de la empresa Mercado Pago S.A, responsable de aprobar y procesar su pago. Nos referimos a esta información como "Información del pedido".',
        },
        {
          type: 'paragraph',
          text: 'Cuando hablamos de "Información personal" en la presente política de privacidad, nos referimos tanto a la Información del dispositivo como a la Información del pedido.',
        },
      ],
    },
    {
      heading: '¿Cómo utilizamos su información personal?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Usamos la Información del pedido que recopilamos en general para preparar los pedidos realizados a través del Sitio (incluido el procesamiento de su información de pago, la organización de los envíos y la entrega de facturas y/o confirmaciones de pedido). Además, utilizamos esta Información del pedido para: comunicarnos con usted;',
        },
        {
          type: 'paragraph',
          text: 'examinar nuestros pedidos en busca de fraudes o riesgos potenciales; y cuando de acuerdo con las preferencias que usted compartió con nosotros, le proporcionamos información o publicidad relacionada con nuestros productos o servicios.',
        },
        {
          type: 'paragraph',
          text: 'Utilizamos la Información del dispositivo que recopilamos para ayudarnos a detectar posibles riesgos y fraudes (en particular, su dirección IP) y, en general, para mejorar y optimizar nuestro Sitio (por ejemplo, al generar informes y estadísticas sobre cómo nuestros clientes y visitantes navegan e interactúan con el Sitio y para evaluar el éxito de nuestras campañas publicitarias y de marketing).',
        },
      ],
    },
    {
      heading: 'Compartir su información personal',
      blocks: [
        {
          type: 'paragraph',
          text: 'Compartimos su Información personal con terceros para que nos ayuden a utilizar su Información personal, tal como se describió anteriormente. Por ejemplo, utilizamos la tecnología de WordPress y WooCommerce en nuestra tienda online. Puede obtener más información sobre cómo WordPress utiliza su Información personal aquí: https://www.wordpress.com/legal/privacy. También utilizamos Google Analytics para ayudarnos a comprender cómo usan nuestros clientes y visitantes el Sitio. Puede obtener más información sobre cómo Google utiliza su Información personal aquí: https://www.google.com/intl/es/policies/privacy/. Puede darse de baja de Google Analytics aquí: https://tools.google.com/dlpage/gaoptout.',
        },
        {
          type: 'paragraph',
          text: 'Finalmente, también podemos compartir su Información personal para cumplir con las leyes y regulaciones aplicables, para responder a una citación, orden de registro u otra solicitud legal de información que recibamos, o para proteger nuestros derechos.',
        },
      ],
    },
    {
      heading: 'Publicidad orientada por el comportamiento',
      blocks: [
        {
          type: 'paragraph',
          text: 'Como se describió anteriormente, utilizamos su Información personal para proporcionarle anuncios publicitarios dirigidos o comunicaciones de marketing que creemos que pueden ser de su interés. Para más información sobre cómo funciona la publicidad dirigida, puede visitar la página educativa de la Iniciativa Publicitaria en la Red ("NAI" por sus siglas en inglés) en http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.',
        },
        {
          type: 'paragraph',
          text: 'Puede darse de baja de la publicidad dirigida mediante los siguientes enlaces:',
        },
        {
          type: 'list',
          items: [
            'Facebook: https://www.facebook.com/settings/?tab=ads',
            'Google: https://adssettings.google.com/authenticated?hl=es',
            'Bing: https://about.ads.microsoft.com/es-es/recursos/directivas/anuncios-personalizados',
          ],
        },
        {
          type: 'paragraph',
          text: 'Además, puede darse de baja de algunos de estos servicios visitando el portal de exclusión voluntaria de Digital Advertising Alliance en: http://optout.aboutads.info/.',
        },
      ],
    },
    {
      heading: 'No rastrear',
      blocks: [
        {
          type: 'paragraph',
          text: 'Tenga en cuenta que no alteramos las prácticas de recopilación y uso de datos de nuestro Sitio cuando vemos una señal de No rastrear desde su navegador.',
        },
      ],
    },
    {
      heading: 'Sus derechos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Si usted es un residente europeo, tiene derecho a acceder a la información personal que tenemos sobre usted y a solicitar que su información personal sea corregida, actualizada o eliminada. Si desea ejercer este derecho, comuníquese con nosotros a través de la información de contacto que se encuentra a continuación.',
        },
        {
          type: 'paragraph',
          text: 'Además, si usted es un residente europeo, tenemos en cuenta que estamos procesando su información para cumplir con los contratos que podamos tener con usted (por ejemplo, si realiza un pedido a través del Sitio) o para perseguir nuestros intereses comerciales legítimos enumerados anteriormente. Además, tenga en cuenta que su información se transferirá fuera de Europa, incluidos Canadá y los Estados Unidos.',
        },
        {
          type: 'paragraph',
          text: 'Para el resto de las zonas geográficas se aplican las leyes locales y sus procedimientos relacionados con el manejo y acceso a la información, ante cualquier consulta no dude en contactarnos y le informaremos de los procedimientos que correspondan a su lugar de residencia.',
        },
      ],
    },
    {
      heading: 'Retención de datos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Cuando realiza un pedido a través del Sitio, mantendremos su Información del pedido para nuestros registros a menos que y hasta que nos pida que eliminemos esta información.',
        },
      ],
    },
    {
      heading: 'Cambios',
      blocks: [
        {
          type: 'paragraph',
          text: 'Podemos actualizar esta política de privacidad periódicamente para reflejar, por ejemplo, cambios en nuestras prácticas o por otros motivos operativos, legales o reglamentarios.',
        },
      ],
    },
    {
      heading: 'Derechos sobre contenidos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Todos los contenidos del Sitio son propiedad intelectual de Usina de Justicia – Argentina Asociación Civil.',
        },
        {
          type: 'paragraph',
          text: 'Los cursos y todo el material audiovisual, visible, no visible, descargable o no, se encuentran registrados bajo el legajo RL-2023-25257495-APN-DNDA#MJ de la Dirección Nacional de Derechos de Autor, quedando prohibida su copia total o parcial en cualquier formato, como así también la reproducción o uso total o parcial para cualquier fin sin autorización previa del autor. Si usted desea hacer uso del material de este sitio puede solicitar el permiso correspondiente poniéndose en contacto con nosotros y evaluaremos su petición.',
        },
        {
          type: 'paragraph',
          text: 'Los contenidos de terceros integrados al Sitio se referenciarán debidamente citando la fuente.',
        },
      ],
    },
    {
      heading: 'Contáctenos',
      blocks: [
        {
          type: 'paragraph',
          text: 'Para obtener más información sobre nuestras prácticas de privacidad, si tiene alguna pregunta o si desea presentar una queja, contáctenos por correo electrónico a info@usinadejusticia.org.ar o por correo mediante el uso de la información que se proporciona a continuación:',
        },
        {
          type: 'paragraph',
          text: 'Virrey del Pino 2222, Ciudad Autónoma de Buenos Aires – Argentina.',
        },
      ],
    },
  ] satisfies LegalSection[],
};
