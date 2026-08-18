import { SupportedLocale } from './i18n';
import { KeyboardLayout } from '../types';
import { StaticPageType, getStaticPagePath, getLocalizedPath } from './routes';
import { getPageSeoMetadata, getStaticPageSeoMetadata } from './seo';

/**
 * Generate complete, dynamic Schema.org JSON-LD structured data for the current page.
 */
export function generateSchemaJsonLd(
  keyboard: KeyboardLayout,
  locale: SupportedLocale,
  isHomepage: boolean,
  staticPage: StaticPageType | null,
  isNotFound: boolean
): object[] {
  const baseUrl = 'https://keypadking.com';

  if (isNotFound) {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Page Not Found (404) | KeypadKing',
        url: `${baseUrl}/404`,
        isPartOf: {
          '@type': 'WebSite',
          name: 'KeypadKing',
          url: baseUrl,
        },
      },
    ];
  }

  // 1. WebSite structured data with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'KeypadKing',
    alternateName: 'KeypadKing Multilingual Virtual Keyboards',
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/${locale}/?kb={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // 2. WebApplication Schema
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: `KeypadKing - ${isHomepage ? 'Online Multilingual Keyboards' : `${keyboard.name} Keyboard Online`}`,
    url: `${baseUrl}${isHomepage ? `/${locale}/` : getLocalizedPath(keyboard.id, locale)}`,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All (Web, Windows, macOS, Linux, Android, iOS)',
    inLanguage: ['en', 'fr', 'es', 'ar'],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    description: isHomepage
      ? 'Complete online virtual keyboard platform providing multilingual writing systems, real-time phonetic transliteration, and full diacritic support.'
      : `Free online ${keyboard.name} virtual keyboard with phonetic typing mode, hardware keyboard passthrough, and special script characters.`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Interactive On-Screen Virtual Keyboard',
      'Real-Time Phonetic Transliteration Engine',
      'Physical Keyboard Input Passthrough',
      'Full Diacritics & Vocalization Support',
      '100% Client-Side Privacy Protection',
      'Instant Text Copy and TXT Export',
    ],
  };

  // 3. BreadcrumbList Schema
  let breadcrumbList: object | null = null;
  if (staticPage) {
    const meta = getStaticPageSeoMetadata(staticPage, locale);
    breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${baseUrl}/${locale}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: meta.h1,
          item: `${baseUrl}${getStaticPagePath(staticPage, locale)}`,
        },
      ],
    };
  } else if (!isHomepage) {
    const meta = getPageSeoMetadata(keyboard, locale, false);
    breadcrumbList = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${baseUrl}/${locale}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: `${keyboard.name} Keyboard`,
          item: `${baseUrl}${getLocalizedPath(keyboard.id, locale)}`,
        },
      ],
    };
  }

  // 4. FAQPage Schema (for Homepage and Keyboard pages)
  let faqSchema: object | null = null;
  if (!staticPage && !isNotFound) {
    const langName = keyboard.name || 'Arabic';
    const langFr = keyboard.name.toLowerCase();
    const langEs = keyboard.name.toLowerCase();
    const langAr = keyboard.nativeName || keyboard.name;

    let faqEntities: { name: string; text: string }[] = [];

    switch (locale) {
      case 'fr':
        faqEntities = [
          {
            name: `Comment puis-je taper en ${langFr} sans clavier physique ?`,
            text: `Sur KeypadKing, utilisez simplement les touches de votre clavier d'ordinateur d'origine. Chaque touche latine correspond phonétiquement aux caractères en ${langFr}. Vous pouvez aussi cliquer directement sur les touches à l'écran.`,
          },
          {
            name: `Puis-je taper en ${langFr} sur mon téléphone portable ?`,
            text: `Oui ! KeypadKing est optimisé pour iPhone et Android avec des touches tactiles confortables, sans zoom intempestif.`,
          },
          {
            name: `Mes textes en ${langFr} sont-ils confidentiels ?`,
            text: `Absolument. Vos textes restent à 100 % dans votre navigateur local. Aucun texte saisi n'est envoyé ni enregistré sur des serveurs distants.`,
          },
        ];
        break;
      case 'es':
        faqEntities = [
          {
            name: `¿Cómo puedo escribir en ${langEs} sin un teclado físico?`,
            text: `En KeypadKing, simplemente escriba con las teclas de su teclado habitual o haga clic directamente en las teclas del teclado virtual en pantalla.`,
          },
          {
            name: `¿El teclado de ${langEs} funciona en teléfonos móviles?`,
            text: `¡Sí! KeypadKing está totalmente optimizado para iPhone y Android con teclas táctiles adaptadas y respuesta instantánea.`,
          },
          {
            name: `¿Mis textos en ${langEs} son privados y seguros?`,
            text: `Totalmente. El texto escrito permanece en su navegador local al 100%. No guardamos ni enviamos su texto personal a ningún servidor.`,
          },
        ];
        break;
      case 'ar':
        faqEntities = [
          {
            name: `كيف يمكنني الكتابة بلغة ${langAr} بدون لوحة مفاتيح مخصصة؟`,
            text: `على KeypadKing، يمكنك استخدام مفاتيح لوحة مفاتيح الكمبيوتر العادية أو النقر مباشرة على الحروف في لوحة المفاتيح الافتراضية على الشاشة.`,
          },
          {
            name: `هل تعمل لوحة المفاتيح على الهواتف الذكية؟`,
            text: `نعم، تم تصميم KeypadKing ليعمل بسلاسة فائقة على هواتف iPhone و Android مع أزرار لمس مريحة وسريعة الاستجابة.`,
          },
          {
            name: `هل النصوص المكتوبة محمية وخاصة بي؟`,
            text: `نعم بكل تأكيد. تظل نصوصك المكتوبة داخل متصفحك بنسبة 100%. لا نقوم بإرسال أو حفظ أي نصوص على الخوادم.`,
          },
        ];
        break;
      case 'en':
      default:
        faqEntities = [
          {
            name: `How can I type ${langName} without a physical ${langName} keyboard?`,
            text: `On KeypadKing, simply type on your physical computer keyboard. Each Latin key intuitively maps to ${langName} letters. Alternatively, click directly on the on-screen virtual keyboard.`,
          },
          {
            name: `Does the ${langName} keyboard work on iPhone and Android?`,
            text: `Yes! KeypadKing is optimized for mobile browsers with comfortably sized touch keys and instant response without downloading extra apps.`,
          },
          {
            name: `Is my typed text private and secure?`,
            text: `Your typed text stays in your browser. All typing, transliteration, and text formatting are processed 100% client-side without sending content to remote servers.`,
          },
        ];
        break;
    }

    faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqEntities.map((faq) => ({
        '@type': 'Question',
        name: faq.name,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.text,
        },
      })),
    };
  }

  const schemas: object[] = [websiteSchema, webAppSchema];
  if (breadcrumbList) schemas.push(breadcrumbList);
  if (faqSchema) schemas.push(faqSchema);

  return schemas;
}
