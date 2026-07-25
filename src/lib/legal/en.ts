// en.ts — English courtesy translation of /[locale]/terms-privacy.
//
// Courtesy translation only (docs/GLOSARIO-TRADUCCION.md §7, "Documentos
// legales — traducción de cortesía"): es.ts is the only legally binding
// version. `nota` below carries the mandatory notice and is rendered
// prominently at the top of the page.
//
// Translation is deliberately literal and conservative: no clause was added,
// removed, or "improved". Argentine legal figures without an exact foreign
// equivalent (the Dirección Nacional de Derechos de Autor / DNDA) are kept
// in Spanish with a short parenthetical gloss instead of being replaced by a
// figure from another jurisdiction. URLs, the email address, the filing
// number and the postal address are left untouched, per the glossary's rule
// that identifiers and invariants never get translated.
//
// NOTE (not fixed here, see es.ts and the task report): the "Your rights"
// section contains generic template language (mentions of "European
// resident" and data transfers to Canada/US) that reads as boilerplate not
// adapted to an Argentine civil association. That is a source-text issue in
// Spanish, translated faithfully as-is rather than corrected here.
import type { LegalDocument } from './types';

export const en: LegalDocument = {
  documentTitle: 'Privacy Policy',
  subtitle: 'Privacy policy of Usina de Justicia – Argentina Asociación Civil',
  source: {
    label: 'Source: WordPress institucional de IVUJUS (page id 18848, slug "terms-privacy")',
    url: 'https://ivujus.org.ar/wp-json/wp/v2/pages?slug=terms-privacy&_fields=title,content',
    fetchedAt: '2026-07-21',
  },
  nota: 'Courtesy translation. The Spanish version is the only legally binding text.',
  intro:
    'This privacy policy describes how your personal information is collected, used, and shared when you visit or make a purchase from www.ivujus.org.ar (hereinafter referred to as the "Site").',
  sections: [
    {
      heading: 'Personal information we collect',
      blocks: [
        {
          type: 'paragraph',
          text: 'When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information".',
        },
        {
          type: 'paragraph',
          text: 'We collect Device Information using the following technologies:',
        },
        { type: 'paragraph', text: 'Cookies' },
        {
          type: 'list',
          items: [
            'wordpress_test_cookie – WordPress uses this cookie to check and store whether cookies are enabled in the browser. Session-based. Necessary.',
            'wordpress_[hash] – cookie restricted to the administration area (wp-admin). Not visible on the frontend even while logged in. Stores your login details. Session-based. Necessary.',
            'wordpress_sec_[hash] – same as the previous one (in fact, I believe it replaces it). Necessary.',
            'wordpress_logged_in_[hash] – Stores who you are while you are logged in and is used by WordPress for its interface. Session-based. Necessary.',
            'wp-settings-{time}-[UID] – Stores your settings for the administration area and even the frontend. UID is your user ID in WordPress. Persistent. Default duration 1 year. Necessary.',
            'wp-settings-[UID] – same as the previous one. Stores your settings for the administration area and even the frontend. UID is your user ID. Persistent. Default duration 1 year.',
            'wp-postpass_[hash] – Cookie that stores access to password-protected pages. Persistent. Default duration 10 days.',
            'comment_author_[hash] – to remember the name of whoever leaves the comment. Persistent. Duration 347 days.',
            'comment_author_email_[hash] – to remember the email of whoever leaves the comment. Persistent. Duration 347 days.',
            'comment_author_url_[hash] – to remember the URL of whoever leaves the comment. Persistent. Duration 347 days.',
          ],
        },
        {
          type: 'paragraph',
          text: '– "Log files" track actions occurring on the Site and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.',
        },
        {
          type: 'paragraph',
          text: '– "Web beacons," "tags," and "pixels" are electronic files used to record information about how you browse the Site.',
        },
        {
          type: 'paragraph',
          text: 'In addition, when you make or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number. At the same time, you accept the terms and conditions of the company Mercado Pago S.A, responsible for approving and processing your payment. We refer to this information as "Order Information".',
        },
        {
          type: 'paragraph',
          text: 'When we speak of "Personal Information" in this privacy policy, we are referring to both Device Information and Order Information.',
        },
      ],
    },
    {
      heading: 'How do we use your personal information?',
      blocks: [
        {
          type: 'paragraph',
          text: 'We generally use the Order Information that we collect to fulfil any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to: communicate with you;',
        },
        {
          type: 'paragraph',
          text: 'screen our orders for potential fraud or risk; and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.',
        },
        {
          type: 'paragraph',
          text: 'We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimise our Site (for example, by generating analytics about how our customers and visitors browse and interact with the Site, and to assess the success of our advertising and marketing campaigns).',
        },
      ],
    },
    {
      heading: 'Sharing your personal information',
      blocks: [
        {
          type: 'paragraph',
          text: 'We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use WordPress and WooCommerce technology in our online store. You can read more about how WordPress uses your Personal Information here: https://www.wordpress.com/legal/privacy. We also use Google Analytics to help us understand how our customers and visitors use the Site. You can read more about how Google uses your Personal Information here: https://www.google.com/intl/es/policies/privacy/. You can opt out of Google Analytics here: https://tools.google.com/dlpage/gaoptout.',
        },
        {
          type: 'paragraph',
          text: 'Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful request for information we receive, or to otherwise protect our rights.',
        },
      ],
    },
    {
      heading: 'Behavioural advertising',
      blocks: [
        {
          type: 'paragraph',
          text: 'As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the educational page of the Network Advertising Initiative ("NAI") at http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.',
        },
        {
          type: 'paragraph',
          text: 'You can opt out of targeted advertising using the following links:',
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
          text: "Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance's opt-out portal at: http://optout.aboutads.info/.",
        },
      ],
    },
    {
      heading: 'Do Not Track',
      blocks: [
        {
          type: 'paragraph',
          text: "Please note that we do not alter our Site's data collection and use practices when we see a Do Not Track signal from your browser.",
        },
      ],
    },
    {
      heading: 'Your rights',
      blocks: [
        {
          type: 'paragraph',
          text: 'If you are a European resident, you have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information set out below.',
        },
        {
          type: 'paragraph',
          text: 'Additionally, if you are a European resident, we note that we are processing your information in order to fulfil contracts we might have with you (for example, if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.',
        },
        {
          type: 'paragraph',
          text: 'For the rest of the geographic regions, local laws and their procedures relating to the handling of and access to information apply; should you have any query, please do not hesitate to contact us and we will inform you of the procedures corresponding to your place of residence.',
        },
      ],
    },
    {
      heading: 'Data retention',
      blocks: [
        {
          type: 'paragraph',
          text: 'When you place an order through the Site, we will retain your Order Information for our records unless and until you ask us to delete this information.',
        },
      ],
    },
    {
      heading: 'Changes',
      blocks: [
        {
          type: 'paragraph',
          text: 'We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.',
        },
      ],
    },
    {
      heading: 'Content rights',
      blocks: [
        {
          type: 'paragraph',
          text: 'All content on the Site is the intellectual property of Usina de Justicia – Argentina Asociación Civil.',
        },
        {
          type: 'paragraph',
          text: "The courses and all audiovisual material, visible, not visible, downloadable or not, are registered under filing number RL-2023-25257495-APN-DNDA#MJ with the Dirección Nacional de Derechos de Autor (DNDA, Argentina's national copyright office), and any total or partial copying in any format is prohibited, as is total or partial reproduction or use for any purpose without the prior authorisation of the author. If you wish to make use of the material on this site, you may request the corresponding permission by contacting us, and we will evaluate your request.",
        },
        {
          type: 'paragraph',
          text: 'Third-party content embedded in the Site will be duly referenced, citing the source.',
        },
      ],
    },
    {
      heading: 'Contact us',
      blocks: [
        {
          type: 'paragraph',
          text: 'For more information about our privacy practices, if you have questions, or if you would like to file a complaint, please contact us by email at info@usinadejusticia.org.ar or by mail using the details provided below:',
        },
        {
          type: 'paragraph',
          text: 'Virrey del Pino 2222, Ciudad Autónoma de Buenos Aires – Argentina.',
        },
      ],
    },
  ],
};
