import { SupportedLocale } from './i18n';
import { KeyboardLayout } from '../types';
import { StaticPageType } from './routes';

export interface PageSeoMetadata {
  title: string;
  h1: string;
  description: string;
}

/**
 * Provides accurate, natural, non-stuffed SEO metadata for the legal & trust pages.
 */
export function getStaticPageSeoMetadata(page: StaticPageType, locale: SupportedLocale): PageSeoMetadata {
  switch (page) {
    case 'privacy':
      switch (locale) {
        case 'fr':
          return {
            title: 'Politique de Confidentialité | KeypadKing',
            h1: 'Politique de Confidentialité',
            description: "Consultez la politique de confidentialité de KeypadKing : fonctionnement côté client, stockage local, cookies et protection de vos données sur notre plateforme de claviers virtuels."
          };
        case 'es':
          return {
            title: 'Política de Privacidad | KeypadKing',
            h1: 'Política de Privacidad',
            description: "Conozca la política de privacidad de KeypadKing: procesamiento de texto en el navegador, almacenamiento local, cookies y protección de datos en nuestra plataforma de teclados virtuales."
          };
        case 'ar':
          return {
            title: 'سياسة الخصوصية | KeypadKing',
            h1: 'سياسة الخصوصية',
            description: "تعرف على سياسة الخصوصية في KeypadKing وكيفية حماية البيانات ومعالجة الكتابة داخل المتصفح واستخدام ملفات تعريف الارتباط."
          };
        case 'en':
        default:
          return {
            title: 'Privacy Policy | KeypadKing',
            h1: 'Privacy Policy',
            description: "Learn about KeypadKing's privacy practices. Read how client-side typing, cookies, analytics, and data protection work on our virtual keyboard platform."
          };
      }

    case 'terms':
      switch (locale) {
        case 'fr':
          return {
            title: "Conditions d'Utilisation | KeypadKing",
            h1: "Conditions d'Utilisation",
            description: "Consultez les conditions d'utilisation de la plateforme KeypadKing, de ses claviers virtuels gratuits et de ses outils de translittération en ligne."
          };
        case 'es':
          return {
            title: 'Términos de Uso | KeypadKing',
            h1: 'Términos de Uso',
            description: "Consulte los términos y condiciones de uso de los teclados virtuales gratuitos y herramientas de transliteración de KeypadKing."
          };
        case 'ar':
          return {
            title: 'شروط الاستخدام | KeypadKing',
            h1: 'شروط الاستخدام',
            description: "شروط وأحكام استخدام موقع KeypadKing ولوحات المفاتيح الافتراضية المجانية وأدوات الكتابة والترجمة الصوتية."
          };
        case 'en':
        default:
          return {
            title: 'Terms of Use | KeypadKing',
            h1: 'Terms of Use',
            description: "Read the terms and conditions for using KeypadKing's free online virtual keyboards, multilingual input tools, and transliteration services."
          };
      }

    case 'about':
      switch (locale) {
        case 'fr':
          return {
            title: 'À Propos de KeypadKing | Claviers Virtuels en Ligne',
            h1: 'À Propos de KeypadKing',
            description: "KeypadKing est une plateforme gratuite de claviers virtuels en ligne conçue pour vous permettre d'écrire dans tous les alphabets et caractères sans installer de logiciel."
          };
        case 'es':
          return {
            title: 'Acerca de KeypadKing | Teclados Virtuales en Línea',
            h1: 'Acerca de KeypadKing',
            description: "KeypadKing es una plataforma gratuita de teclados virtuales en línea diseñada para escribir en alfabetos y caracteres no disponibles en su teclado físico."
          };
        case 'ar':
          return {
            title: 'عن الموقع | KeypadKing',
            h1: 'عن موقع KeypadKing',
            description: "منصة KeypadKing هي موقع مجاني للوحات المفاتيح الافتراضية مصممة لمساعدتك على الكتابة بمختلف اللغات والحروف غير المتوفرة على لوحة مفاتيحك الفعلية."
          };
        case 'en':
        default:
          return {
            title: 'About KeypadKing | Online Virtual Keyboards',
            h1: 'About KeypadKing',
            description: "KeypadKing is a free online virtual keyboard platform designed to help people type characters and scripts that may not be available on their physical keyboard."
          };
      }

    case 'contact':
      switch (locale) {
        case 'fr':
          return {
            title: 'Contact KeypadKing | Claviers Virtuels en Ligne',
            h1: 'Contactez KeypadKing',
            description: "Contactez l'équipe KeypadKing pour nous faire part de vos retours, suggérer une nouvelle langue ou signaler un problème technique."
          };
        case 'es':
          return {
            title: 'Contacto | KeypadKing',
            h1: 'Contacto',
            description: "Póngase en contacto con el equipo de KeypadKing para enviar comentarios, sugerir nuevos teclados o reportar errores."
          };
        case 'ar':
          return {
            title: 'اتصل بنا | KeypadKing',
            h1: 'اتصل بنا',
            description: "تواصل مع فريق KeypadKing لتقديم الملاحظات والاقتراحات أو الإبلاغ عن المشكلات المتعلقة بلوحات المفاتيح."
          };
        case 'en':
        default:
          return {
            title: 'Contact KeypadKing | Online Virtual Keyboards',
            h1: 'Contact KeypadKing',
            description: "Get in touch with the KeypadKing team for feedback, keyboard layout suggestions, bug reports, or general inquiries."
          };
      }
  }
}

/**
 * Provides accurate, natural, non-stuffed SEO titles, H1 headings, and meta descriptions
 * tailored specifically for each localized language page and keyboard layout.
 */
export function getPageSeoMetadata(
  keyboard: KeyboardLayout,
  locale: SupportedLocale,
  isHomepageOnly = false
): PageSeoMetadata {
  // 1. Homepage Specific SEO (when explicitly on generic home)
  if (isHomepageOnly) {
    switch (locale) {
      case 'fr':
        return {
          title: 'Claviers en Ligne pour Toutes les Langues | KeypadKing',
          h1: 'Claviers en Ligne pour Toutes les Langues',
          description: "Écrivez dans n'importe quelle langue grâce à des claviers virtuels interactifs, la translittération phonétique en temps réel et les diacritiques directement dans votre navigateur."
        };
      case 'es':
        return {
          title: 'Teclados en Línea para Todos los Idiomas | KeypadKing',
          h1: 'Teclados en Línea para Todos los Idiomas',
          description: 'Escriba en cualquier idioma o alfabeto con teclados virtuales interactivos, transliteración fonética en tiempo real y diacríticos directamente en su navegador web.'
        };
      case 'ar':
        return {
          title: 'لوحات مفاتيح أونلاين لجميع اللغات | KeypadKing',
          h1: 'لوحات مفاتيح أونلاين لجميع اللغات',
          description: 'اكتب بأي لغة أو نظام كتابة باستخدام لوحات المفاتيح الافتراضية التفاعلية والترجمة الصوتية الفورية وتشكيل الحروف في متصفحك مباشرة.'
        };
      case 'en':
      default:
        return {
          title: 'Online Keyboards for Every Language | KeypadKing',
          h1: 'Online Keyboards for Every Language',
          description: 'Type in any language or script with interactive virtual keyboards, real-time phonetic transliteration, and diacritics directly in your web browser.'
        };
    }
  }

  // 2. Arabic Keyboard Dedicated SEO
  if (keyboard.id === 'arabic') {
    switch (locale) {
      case 'fr':
        return {
          title: 'Clavier Arabe en Ligne – Écrire en Arabe Gratuitement | KeypadKing',
          h1: 'Clavier Arabe en Ligne (لوحة مفاتيح عربية)',
          description: 'Écrivez en arabe en ligne gratuitement sans clavier arabe physique. Translittération phonétique intuitive (Yamli), voyelles complètes du Tashkeel et copie instantanée.'
        };
      case 'ar':
        return {
          title: 'لوحة مفاتيح عربية أونلاين | KeypadKing',
          h1: 'لوحة مفاتيح عربية أونلاين',
          description: 'لوحة مفاتيح عربية افتراضية مجانية وسريعة للكتابة باللغة العربية مع دعم كامل لحركات التشكيل والكتابة الصوتية والنسخ السريع بدون تثبيت برامج.'
        };
      case 'es':
        return {
          title: 'Teclado Árabe en Línea – Escribir en Árabe Gratis | KeypadKing',
          h1: 'Teclado Árabe en Línea (لوحة مفاتيح عربية)',
          description: 'Escriba en árabe en línea sin teclado físico. Teclado árabe virtual con modo fonético inteligente, vocales completas harakat y copia instantánea.'
        };
      case 'en':
      default:
        return {
          title: 'Arabic Keyboard Online – Type Arabic Without an Arabic Keyboard | KeypadKing',
          h1: 'Arabic Keyboard Online (لوحة مفاتيح عربية)',
          description: 'Type Arabic online without a physical Arabic keyboard. Features smart phonetic transliteration, full Arabic Tashkeel diacritics, and instant text copying.'
        };
    }
  }

  // 3. Russian Cyrillic Keyboard
  if (keyboard.id === 'russian') {
    switch (locale) {
      case 'fr':
        return {
          title: 'Clavier Russe en Ligne – Écrire en Russe Cyrillique | KeypadKing',
          h1: 'Clavier Russe en Ligne (Русская клавиатура)',
          description: 'Tapez en russe en ligne avec disposition cyrillique et translittération phonétique instantanée sur votre clavier azerty ou qwerty.'
        };
      case 'ar':
        return {
          title: 'لوحة مفاتيح روسية أونلاين (سيريلية) | KeypadKing',
          h1: 'لوحة مفاتيح روسية سيريلية أونلاين',
          description: 'اكتب بالحروف السيريلية الروسية بسهولة مع دعم الكتابة الصوتية والتحويل المباشر بدون الحاجة للوحة مفاتيح روسية.'
        };
      case 'es':
        return {
          title: 'Teclado Ruso en Línea – Escribir en Ruso Cirílico | KeypadKing',
          h1: 'Teclado Ruso en Línea (Русская клавиатура)',
          description: 'Escriba en ruso cirílico en línea con teclado virtual interactivo y transliteración fonética directa desde su teclado habitual.'
        };
      case 'en':
      default:
        return {
          title: 'Russian Keyboard Online – Type Cyrillic Russian | KeypadKing',
          h1: 'Russian Keyboard Online (Русская клавиатура)',
          description: 'Type in Russian Cyrillic online with our interactive virtual keyboard and real-time phonetic transliteration mapping.'
        };
    }
  }

  // 4. Polytonic Greek Keyboard
  if (keyboard.id === 'polytonic-greek') {
    switch (locale) {
      case 'fr':
        return {
          title: 'Clavier Grec Polytonique en Ligne – Grec Ancien | KeypadKing',
          h1: 'Clavier Grec Polytonique (Polytonic Greek)',
          description: 'Écrivez en grec ancien et polytonique avec tous les accents (oxia, varia, perispomeni, iota souscrit) et esprits.'
        };
      case 'es':
        return {
          title: 'Teclado Griego Politónico en Línea – Griego Antiguo | KeypadKing',
          h1: 'Teclado Griego Politónico en Línea',
          description: 'Escriba en griego antiguo y politónico con todos los acentos y espíritus en su navegador sin instalar fuentes adicionales.'
        };
      case 'ar':
        return {
          title: 'لوحة مفاتيح يونانية قديمة كلاسيكية أونلاين | KeypadKing',
          h1: 'لوحة مفاتيح يونانية كلاسيكية أونلاين',
          description: 'اكتب باليونانية الكلاسيكية والقديمة مع كافة علامات النبر والتشكيل اليوناني بسهولة ودقة.'
        };
      case 'en':
      default:
        return {
          title: 'Polytonic Greek Keyboard Online – Ancient & Classical Greek | KeypadKing',
          h1: 'Polytonic Greek Keyboard Online',
          description: 'Type ancient and classical polytonic Greek with full accents (acute, grave, circumflex, iota subscript) and breathing marks online.'
        };
    }
  }

  // 5. Urdu Keyboard
  if (keyboard.id === 'urdu') {
    switch (locale) {
      case 'fr':
        return {
          title: 'Clavier Ourdou en Ligne – Écrire en Ourdou Nastaliq | KeypadKing',
          h1: 'Clavier Ourdou en Ligne (اردو کی بورڈ)',
          description: 'Écrivez en ourdou en ligne avec support des caractères étendus et translittération phonétique rapide.'
        };
      case 'ar':
        return {
          title: 'لوحة مفاتيح أردية أونلاين (اردو کی بورڈ) | KeypadKing',
          h1: 'لوحة مفاتيح أردية أونلاين',
          description: 'اكتب باللغة الأردية أونلاين مع الحروف الخاصة والأرقام الأردية والكتابة الصوتية السهلة.'
        };
      case 'es':
        return {
          title: 'Teclado Urdu en Línea – Escribir en Urdu | KeypadKing',
          h1: 'Teclado Urdu en Línea (اردو کی بورڈ)',
          description: 'Escriba en urdu en línea con caracteres nastaliq extendidos y transliteración fonética fluida.'
        };
      case 'en':
      default:
        return {
          title: 'Urdu Keyboard Online – Type Urdu Online | KeypadKing',
          h1: 'Urdu Keyboard Online (اردو کی بورڈ)',
          description: 'Type in Urdu online with special Urdu characters, nastaliq ligature support, and phonetic typing assistance.'
        };
    }
  }

  // 6. Generic Formatter for any other keyboard
  const nativePart = keyboard.nativeName ? ` (${keyboard.nativeName})` : '';
  switch (locale) {
    case 'fr':
      return {
        title: `Clavier ${keyboard.name} en Ligne – Écrire en ${keyboard.name} | KeypadKing`,
        h1: `Clavier ${keyboard.name} en Ligne${nativePart}`,
        description: `Tapez en ${keyboard.name}${nativePart} en ligne avec notre clavier virtuel interactif, caractères spéciaux et translittération.`
      };
    case 'ar':
      return {
        title: `لوحة مفاتيح ${keyboard.nativeName || keyboard.name} أونلاين | KeypadKing`,
        h1: `لوحة مفاتيح ${keyboard.nativeName || keyboard.name} أونلاين`,
        description: `اكتب بنظام كتابة ${keyboard.nativeName || keyboard.name} أونلاين بسهولة وسرعة مع لوحة المفاتيح الافتراضية.`
      };
    case 'es':
      return {
        title: `Teclado ${keyboard.name} en Línea – Escribir en ${keyboard.name} | KeypadKing`,
        h1: `Teclado ${keyboard.name} en Línea${nativePart}`,
        description: `Escriba en ${keyboard.name}${nativePart} en línea con nuestro teclado virtual interactivo y modo fonético.`
      };
    case 'en':
    default:
      return {
        title: `${keyboard.name} Keyboard Online – Type ${keyboard.name} | KeypadKing`,
        h1: `${keyboard.name} Keyboard Online${nativePart}`,
        description: `Type in ${keyboard.name}${nativePart} online using our interactive virtual keyboard with special characters and phonetic mode.`
      };
  }
}
