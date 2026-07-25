// fr.ts — traduction de courtoisie en français de /[locale]/terms-privacy.
//
// Traduction de courtoisie uniquement (docs/GLOSARIO-TRADUCCION.md §7,
// « Documentos legales — traducción de cortesía ») : es.ts est la seule
// version ayant valeur juridique. `nota` porte l'avis obligatoire et doit
// être affiché de façon visible en tête de la page.
//
// Traduction volontairement littérale et conservatrice : aucune clause n'a
// été ajoutée, supprimée ni « améliorée ». Les figures juridiques argentines
// sans équivalent exact (la Dirección Nacional de Derechos de Autor / DNDA)
// sont conservées en espagnol avec une brève glose entre parenthèses, plutôt
// que remplacées par une figure d'une autre juridiction. Les URL, l'adresse
// e-mail, le numéro de dossier et l'adresse postale restent inchangés,
// conformément à la règle du glossaire sur les identifiants invariants.
//
// NOTE (non corrigée ici, voir es.ts et le rapport de la tâche) : la section
// « Vos droits » contient un langage de modèle générique (mentions de
// « résident européen » et de transferts de données vers le Canada/les
// États-Unis) qui ressemble à du texte type non adapté à une association
// civile argentine. C'est un problème du texte SOURCE en espagnol, traduit
// fidèlement tel quel plutôt que corrigé ici.
import type { LegalDocument } from './types';

export const fr: LegalDocument = {
  documentTitle: 'Politique de confidentialité',
  subtitle: 'Politique de confidentialité de Usina de Justicia – Argentina Asociación Civil',
  source: {
    label: 'Source : WordPress institucional de IVUJUS (page id 18848, slug « terms-privacy »)',
    url: 'https://ivujus.org.ar/wp-json/wp/v2/pages?slug=terms-privacy&_fields=title,content',
    fetchedAt: '2026-07-21',
  },
  nota: 'Traduction de courtoisie. Seule la version espagnole a valeur juridique.',
  intro:
    "Cette politique de confidentialité décrit comment vos informations personnelles sont recueillies, utilisées et partagées lorsque vous visitez ou effectuez un achat sur www.ivujus.org.ar (ci-après dénommé le « Site »).",
  sections: [
    {
      heading: 'Informations personnelles que nous recueillons',
      blocks: [
        {
          type: 'paragraph',
          text: "Lorsque vous visitez le Site, nous recueillons automatiquement certaines informations sur votre appareil, y compris des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire et certains des cookies installés sur votre appareil. En outre, à mesure que vous naviguez sur le Site, nous recueillons des informations sur les pages web individuelles ou les produits que vous consultez, les sites web ou les termes de recherche qui vous ont orienté vers le Site, ainsi que des informations sur la façon dont vous interagissez avec le Site. Nous désignons ces informations recueillies automatiquement sous le nom d'« Informations sur l'appareil ».",
        },
        {
          type: 'paragraph',
          text: "Nous recueillons les Informations sur l'appareil au moyen des technologies suivantes :",
        },
        { type: 'paragraph', text: 'Cookies' },
        {
          type: 'list',
          items: [
            "wordpress_test_cookie – WordPress utilise ce cookie pour vérifier et enregistrer si les cookies sont activés dans le navigateur. Technique de session. Nécessaire.",
            "wordpress_[hash] – cookie limité à la zone d'administration (wp-admin). Il n'est pas visible sur le frontend même en étant connecté. Il enregistre vos données de connexion. Technique de session. Nécessaire.",
            'wordpress_sec_[hash] – identique au précédent (en fait, je crois qu\'il le remplace). Nécessaire.',
            "wordpress_logged_in_[hash] – Enregistre qui vous êtes pendant que vous êtes connecté et est utilisé par WordPress pour son interface. Technique de session. Nécessaire.",
            "wp-settings-{time}-[UID] – Enregistre vos réglages de la zone d'administration et même du frontend. UID est votre identifiant d'utilisateur dans WordPress. Technique persistante. Durée par défaut 1 an. Nécessaire.",
            "wp-settings-[UID] – identique au précédent. Enregistre vos réglages de la zone d'administration et même du frontend. UID est votre identifiant d'utilisateur. Technique persistante. Durée par défaut 1 an.",
            "wp-postpass_[hash] – Cookie qui enregistre l'accès aux pages protégées par mot de passe. Technique persistante. Durée par défaut 10 jours.",
            "comment_author_[hash] – pour se souvenir du nom de l'auteur du commentaire. Technique persistante. Durée 347 jours.",
            "comment_author_email_[hash] – pour se souvenir de l'e-mail de l'auteur du commentaire. Technique persistante. Durée 347 jours.",
            "comment_author_url_[hash] – pour se souvenir de l'URL de l'auteur du commentaire. Technique persistante. Durée 347 jours.",
          ],
        },
        {
          type: 'paragraph',
          text: "– Les « fichiers journaux » suivent les actions qui se produisent sur le Site et recueillent des données, y compris votre adresse IP, le type de navigateur, le fournisseur d'accès à Internet, les pages de référence/sortie et les horodatages.",
        },
        {
          type: 'paragraph',
          text: "– Les « balises web », les « étiquettes » et les « pixels » sont des fichiers électroniques utilisés pour enregistrer des informations sur la façon dont vous naviguez sur le Site.",
        },
        {
          type: 'paragraph',
          text: "En outre, lorsque vous effectuez ou tentez d'effectuer un achat par l'intermédiaire du Site, nous recueillons certaines informations vous concernant, notamment votre nom, votre adresse de facturation, votre adresse de livraison, vos informations de paiement (y compris les numéros de carte de crédit), votre adresse e-mail et votre numéro de téléphone. Vous acceptez en même temps les conditions générales de l'entreprise Mercado Pago S.A, chargée d'approuver et de traiter votre paiement. Nous désignons ces informations sous le nom d'« Informations sur la commande ».",
        },
        {
          type: 'paragraph',
          text: "Lorsque nous parlons d'« Informations personnelles » dans la présente politique de confidentialité, nous faisons référence aussi bien aux Informations sur l'appareil qu'aux Informations sur la commande.",
        },
      ],
    },
    {
      heading: 'Comment utilisons-nous vos informations personnelles ?',
      blocks: [
        {
          type: 'paragraph',
          text: "Nous utilisons en général les Informations sur la commande que nous recueillons pour préparer les commandes passées par l'intermédiaire du Site (y compris le traitement de vos informations de paiement, l'organisation des envois et la remise de factures et/ou de confirmations de commande). En outre, nous utilisons ces Informations sur la commande pour : communiquer avec vous ;",
        },
        {
          type: 'paragraph',
          text: "examiner nos commandes à la recherche de fraudes ou de risques potentiels ; et, conformément aux préférences que vous avez partagées avec nous, vous fournir des informations ou de la publicité relatives à nos produits ou services.",
        },
        {
          type: 'paragraph',
          text: "Nous utilisons les Informations sur l'appareil que nous recueillons pour nous aider à détecter les risques et fraudes potentiels (en particulier votre adresse IP) et, plus généralement, pour améliorer et optimiser notre Site (par exemple, en générant des rapports et des statistiques sur la façon dont nos clients et visiteurs naviguent et interagissent avec le Site, et pour évaluer le succès de nos campagnes publicitaires et marketing).",
        },
      ],
    },
    {
      heading: 'Partage de vos informations personnelles',
      blocks: [
        {
          type: 'paragraph',
          text: "Nous partageons vos Informations personnelles avec des tiers pour qu'ils nous aident à utiliser vos Informations personnelles, comme décrit ci-dessus. Par exemple, nous utilisons la technologie WordPress et WooCommerce dans notre boutique en ligne. Vous pouvez en savoir plus sur la façon dont WordPress utilise vos Informations personnelles ici : https://www.wordpress.com/legal/privacy. Nous utilisons également Google Analytics pour nous aider à comprendre comment nos clients et visiteurs utilisent le Site. Vous pouvez en savoir plus sur la façon dont Google utilise vos Informations personnelles ici : https://www.google.com/intl/es/policies/privacy/. Vous pouvez vous désinscrire de Google Analytics ici : https://tools.google.com/dlpage/gaoptout.",
        },
        {
          type: 'paragraph',
          text: "Enfin, nous pouvons également partager vos Informations personnelles pour nous conformer aux lois et réglementations applicables, pour répondre à une citation à comparaître, un mandat de perquisition ou toute autre demande légale d'informations que nous recevons, ou pour protéger nos droits.",
        },
      ],
    },
    {
      heading: 'Publicité comportementale',
      blocks: [
        {
          type: 'paragraph',
          text: "Comme décrit ci-dessus, nous utilisons vos Informations personnelles pour vous proposer des publicités ciblées ou des communications marketing que nous pensons susceptibles de vous intéresser. Pour plus d'informations sur le fonctionnement de la publicité ciblée, vous pouvez consulter la page pédagogique de la Network Advertising Initiative (« NAI ») à l'adresse http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work.",
        },
        {
          type: 'paragraph',
          text: 'Vous pouvez vous désinscrire de la publicité ciblée au moyen des liens suivants :',
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
          text: "En outre, vous pouvez vous désinscrire de certains de ces services en visitant le portail de désinscription volontaire de la Digital Advertising Alliance à l'adresse : http://optout.aboutads.info/.",
        },
      ],
    },
    {
      heading: 'Ne pas suivre',
      blocks: [
        {
          type: 'paragraph',
          text: "Veuillez noter que nous ne modifions pas les pratiques de collecte et d'utilisation des données de notre Site lorsque nous détectons un signal Ne pas suivre provenant de votre navigateur.",
        },
      ],
    },
    {
      heading: 'Vos droits',
      blocks: [
        {
          type: 'paragraph',
          text: "Si vous résidez en Europe, vous avez le droit d'accéder aux informations personnelles que nous détenons à votre sujet et de demander que vos informations personnelles soient corrigées, mises à jour ou supprimées. Si vous souhaitez exercer ce droit, veuillez nous contacter au moyen des coordonnées indiquées ci-dessous.",
        },
        {
          type: 'paragraph',
          text: "En outre, si vous résidez en Europe, nous précisons que nous traitons vos informations afin d'exécuter les contrats que nous pourrions avoir avec vous (par exemple, si vous passez une commande par l'intermédiaire du Site), ou de poursuivre nos intérêts commerciaux légitimes énumérés ci-dessus. Par ailleurs, veuillez noter que vos informations seront transférées hors d'Europe, y compris vers le Canada et les États-Unis.",
        },
        {
          type: 'paragraph',
          text: "Pour le reste des zones géographiques, les lois locales et leurs procédures relatives au traitement et à l'accès à l'information s'appliquent ; pour toute question, n'hésitez pas à nous contacter et nous vous informerons des procédures correspondant à votre lieu de résidence.",
        },
      ],
    },
    {
      heading: 'Conservation des données',
      blocks: [
        {
          type: 'paragraph',
          text: "Lorsque vous passez une commande par l'intermédiaire du Site, nous conserverons vos Informations sur la commande dans nos dossiers, sauf si et jusqu'à ce que vous nous demandiez de supprimer ces informations.",
        },
      ],
    },
    {
      heading: 'Modifications',
      blocks: [
        {
          type: 'paragraph',
          text: "Nous pouvons mettre à jour cette politique de confidentialité de temps à autre afin de refléter, par exemple, des changements dans nos pratiques ou pour d'autres motifs opérationnels, légaux ou réglementaires.",
        },
      ],
    },
    {
      heading: 'Droits sur les contenus',
      blocks: [
        {
          type: 'paragraph',
          text: 'Tous les contenus du Site sont la propriété intellectuelle de Usina de Justicia – Argentina Asociación Civil.',
        },
        {
          type: 'paragraph',
          text: "Les cours et tout le matériel audiovisuel, visible, non visible, téléchargeable ou non, sont enregistrés sous le numéro de dossier RL-2023-25257495-APN-DNDA#MJ auprès de la Dirección Nacional de Derechos de Autor (DNDA, l'office national argentin du droit d'auteur), toute copie totale ou partielle sous quelque format que ce soit étant interdite, de même que la reproduction ou l'utilisation totale ou partielle à quelque fin que ce soit sans l'autorisation préalable de l'auteur. Si vous souhaitez utiliser le matériel de ce site, vous pouvez demander l'autorisation correspondante en nous contactant, et nous évaluerons votre demande.",
        },
        {
          type: 'paragraph',
          text: 'Les contenus de tiers intégrés au Site seront dûment référencés en citant la source.',
        },
      ],
    },
    {
      heading: 'Nous contacter',
      blocks: [
        {
          type: 'paragraph',
          text: "Pour plus d'informations sur nos pratiques en matière de confidentialité, si vous avez des questions ou si vous souhaitez déposer une plainte, veuillez nous contacter par e-mail à info@usinadejusticia.org.ar ou par courrier en utilisant les coordonnées fournies ci-dessous :",
        },
        {
          type: 'paragraph',
          text: 'Virrey del Pino 2222, Ciudad Autónoma de Buenos Aires – Argentina.',
        },
      ],
    },
  ],
};
