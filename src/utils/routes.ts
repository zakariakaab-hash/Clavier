import { SupportedLocale } from './i18n';
import { ALL_KEYBOARDS } from '../data/keyboards';

// Standard slug aliases for popular keyboards across the 4 supported website languages (en, fr, es, ar)
export const KEYBOARD_SLUGS_MAP: Record<string, Record<string, string>> = {
  arabic: {
    en: 'arabic-keyboard',
    fr: 'clavier-arabe',
    es: 'teclado-arabe',
    ar: 'clavier-arabe'
  },
  russian: {
    en: 'russian-keyboard',
    fr: 'clavier-russe',
    es: 'teclado-ruso',
    ar: 'clavier-russian'
  },
  'polytonic-greek': {
    en: 'polytonic-greek-keyboard',
    fr: 'clavier-grec-polytonique',
    es: 'teclado-griego-politonico',
    ar: 'clavier-polytonic-greek'
  },
  greek: {
    en: 'greek-keyboard',
    fr: 'clavier-grec',
    es: 'teclado-griego'
  },
  hebrew: {
    en: 'hebrew-keyboard',
    fr: 'clavier-hebreu',
    es: 'teclado-hebreo'
  },
  persian: {
    en: 'persian-farsi-keyboard',
    fr: 'clavier-persan-farsi',
    es: 'teclado-persa-farsi',
    ar: 'clavier-persian'
  },
  urdu: {
    en: 'urdu-keyboard',
    fr: 'clavier-ourdou',
    es: 'teclado-urdu',
    ar: 'clavier-urdu'
  },
  hindi: {
    en: 'hindi-devanagari-keyboard',
    fr: 'clavier-hindi-devanagari',
    es: 'teclado-hindi-devanagari'
  },
  'japanese-hiragana': {
    en: 'japanese-hiragana-keyboard',
    fr: 'clavier-japonais-hiragana',
    es: 'teclado-japones-hiragana'
  },
  'korean-hangul': {
    en: 'korean-hangul-keyboard',
    fr: 'clavier-coreen-hangul',
    es: 'teclado-coreano-hangul'
  },
  'ipa-phonetic': {
    en: 'ipa-phonetic-keyboard',
    fr: 'clavier-phonetique-ipa',
    es: 'teclado-fonetico-ipa'
  },
  hieroglyphs: {
    en: 'egyptian-hieroglyphs-keyboard',
    fr: 'clavier-hieroglyphes-egyptiens',
    es: 'teclado-jeroglificos-egipcios'
  },
  tifinagh: {
    en: 'tifinagh-berber-keyboard',
    fr: 'clavier-tifinaghe-berbere',
    es: 'teclado-tifinagh-bereber'
  },
  amharic: {
    en: 'amharic-geez-keyboard',
    fr: 'clavier-amharique-geez',
    es: 'teclado-amharico-geez'
  },
  armenian: {
    en: 'armenian-keyboard',
    fr: 'clavier-armenien',
    es: 'teclado-armenio'
  },
  georgian: {
    en: 'georgian-keyboard',
    fr: 'clavier-georgien',
    es: 'teclado-georgiano'
  },
  runes: {
    en: 'runic-futhark-keyboard',
    fr: 'clavier-runes-futhark',
    es: 'teclado-runas-futhark'
  },
  'math-symbols': {
    en: 'math-symbols-keyboard',
    fr: 'clavier-symboles-mathematiques',
    es: 'teclado-simbolos-matematicos'
  },
  braille: {
    en: 'braille-keyboard',
    fr: 'clavier-braille',
    es: 'teclado-braille'
  }
};

// Default keyboard to associate when only language prefix is requested (e.g. /ar/ -> arabic, /fr/ -> arabic)
export const LOCALE_DEFAULT_KEYBOARDS: Record<SupportedLocale, string> = {
  ar: 'arabic',
  en: 'arabic',
  fr: 'arabic',
  es: 'arabic',
};

const SUPPORTED_LOCALES: SupportedLocale[] = ['en', 'fr', 'es', 'ar'];

/**
 * Generate canonical SEO URL path for a given keyboard and locale.
 * Examples:
 * - getLocalizedPath('arabic', 'fr') -> "/fr/clavier-arabe"
 * - getLocalizedPath('arabic', 'en') -> "/en/arabic-keyboard"
 * - getLocalizedPath('arabic', 'ar') -> "/ar/clavier-arabe"
 * - getLocalizedPath('russian', 'fr') -> "/fr/clavier-russe"
 */
export function getLocalizedPath(keyboardId: string, locale: SupportedLocale = 'fr'): string {
  const keyboard = ALL_KEYBOARDS.find(k => k.id === keyboardId);
  const validId = keyboard ? keyboard.id : 'arabic';

  const customSlug = KEYBOARD_SLUGS_MAP[validId]?.[locale];
  if (customSlug) {
    return `/${locale}/${customSlug}`;
  }

  // Fallback slug patterns based on locale
  if (locale === 'fr') {
    return `/${locale}/clavier-${validId}`;
  }
  if (locale === 'es') {
    return `/${locale}/teclado-${validId}`;
  }
  if (locale === 'ar') {
    return `/${locale}/clavier-${validId}`;
  }
  
  return `/${locale}/${validId}-keyboard`;
}

export type StaticPageType = 'privacy' | 'terms' | 'about' | 'contact';

export const STATIC_PAGE_SLUGS: Record<StaticPageType, Record<SupportedLocale, string>> = {
  privacy: {
    en: 'privacy',
    fr: 'confidentialite',
    es: 'privacidad',
    ar: 'privacy',
  },
  terms: {
    en: 'terms',
    fr: 'conditions',
    es: 'terminos',
    ar: 'terms',
  },
  about: {
    en: 'about',
    fr: 'a-propos',
    es: 'acerca-de',
    ar: 'about',
  },
  contact: {
    en: 'contact',
    fr: 'contact',
    es: 'contacto',
    ar: 'contact',
  },
};

/**
 * Generate canonical SEO URL path for a given static legal/trust page and locale.
 * Examples:
 * - getStaticPagePath('privacy', 'en') -> "/en/privacy"
 * - getStaticPagePath('privacy', 'fr') -> "/fr/confidentialite"
 * - getStaticPagePath('terms', 'fr') -> "/fr/conditions"
 * - getStaticPagePath('about', 'es') -> "/es/acerca-de"
 */
export function getStaticPagePath(page: StaticPageType, locale: SupportedLocale = 'en'): string {
  const slug = STATIC_PAGE_SLUGS[page]?.[locale] || STATIC_PAGE_SLUGS[page]?.en || page;
  return `/${locale}/${slug}`;
}

export function resolveStaticPageFromSlug(slug: string): { page: StaticPageType; locale?: SupportedLocale } | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  for (const [pageKey, localeMap] of Object.entries(STATIC_PAGE_SLUGS)) {
    for (const [locKey, s] of Object.entries(localeMap)) {
      if (s === clean) {
        return { page: pageKey as StaticPageType, locale: locKey as SupportedLocale };
      }
    }
  }
  return undefined;
}

/**
 * Parse any pathname & query params into a resolved locale, keyboardId, staticPage, and whether it is a homepage.
 * Supports:
 * - / -> isHomepage: true, locale: undefined, keyboardId: undefined
 * - /en/ or /en -> isHomepage: true, locale: 'en', keyboardId: undefined
 * - /fr/ or /fr -> isHomepage: true, locale: 'fr', keyboardId: undefined
 * - /es/ or /es -> isHomepage: true, locale: 'es', keyboardId: undefined
 * - /ar/ or /ar -> isHomepage: true, locale: 'ar', keyboardId: undefined
 * - /en/privacy -> isHomepage: false, locale: 'en', staticPage: 'privacy'
 * - /fr/confidentialite -> isHomepage: false, locale: 'fr', staticPage: 'privacy'
 * - /fr/conditions -> isHomepage: false, locale: 'fr', staticPage: 'terms'
 * - /en/about -> isHomepage: false, locale: 'en', staticPage: 'about'
 * - /en/contact -> isHomepage: false, locale: 'en', staticPage: 'contact'
 * - /en/arabic-keyboard -> isHomepage: false, locale: 'en', keyboardId: 'arabic'
 * - /fr/clavier-arabe -> isHomepage: false, locale: 'fr', keyboardId: 'arabic'
 * - /ar/clavier-arabe -> isHomepage: false, locale: 'ar', keyboardId: 'arabic'
 * - /es/teclado-arabe -> isHomepage: false, locale: 'es', keyboardId: 'arabic'
 * - /clavier-arabe -> isHomepage: false, locale: 'fr', keyboardId: 'arabic'
 * - /arabic-keyboard -> isHomepage: false, locale: 'en', keyboardId: 'arabic'
 * - ?kb=arabic&lang=fr
 */
export function parseCurrentPath(pathname: string, search: string): { 
  locale?: SupportedLocale; 
  keyboardId?: string;
  isHomepage?: boolean;
  staticPage?: StaticPageType;
} {
  const searchParams = new URLSearchParams(search);
  const kbQuery = searchParams.get('kb');
  const langQuery = searchParams.get('lang') as SupportedLocale | null;

  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath ? cleanPath.split('/') : [];

  let detectedLocale: SupportedLocale | undefined = undefined;
  let detectedKbId: string | undefined = undefined;
  let detectedStaticPage: StaticPageType | undefined = undefined;
  let isHomepage = false;

  // Root homepage: /
  if (segments.length === 0) {
    isHomepage = true;
  } else if (segments.length === 1 && SUPPORTED_LOCALES.includes(segments[0] as SupportedLocale)) {
    // Localized homepage: /en, /fr, /es, /ar
    detectedLocale = segments[0] as SupportedLocale;
    isHomepage = true;
  } else if (segments.length === 1) {
    // Single segment that might be a static page slug (e.g. /privacy, /confidentialite, /about)
    const staticMatch = resolveStaticPageFromSlug(segments[0]);
    if (staticMatch) {
      detectedStaticPage = staticMatch.page;
      detectedLocale = staticMatch.locale || 'en';
      isHomepage = false;
    } else {
      // Or a single keyboard slug directly like /clavier-arabe or /arabic-keyboard
      const slug = segments[0].toLowerCase();
      detectedKbId = resolveKeyboardFromSlug(slug);
      isHomepage = false;
      
      if (slug.startsWith('clavier-')) {
        detectedLocale = 'fr';
      } else if (slug.startsWith('teclado-')) {
        detectedLocale = 'es';
      } else if (slug.endsWith('-keyboard')) {
        detectedLocale = 'en';
      }
    }
  } else if (segments.length > 1 && SUPPORTED_LOCALES.includes(segments[0] as SupportedLocale)) {
    // Localized route: /en/privacy, /fr/confidentialite, /en/arabic-keyboard, etc.
    detectedLocale = segments[0] as SupportedLocale;
    const secondSegment = segments[1].toLowerCase();
    
    const staticMatch = resolveStaticPageFromSlug(secondSegment);
    if (staticMatch) {
      detectedStaticPage = staticMatch.page;
      isHomepage = false;
    } else {
      detectedKbId = resolveKeyboardFromSlug(secondSegment);
      isHomepage = false;
    }
  } else if (segments.length > 0) {
    // Fallback
    const slug = segments[segments.length - 1].toLowerCase();
    const staticMatch = resolveStaticPageFromSlug(slug);
    if (staticMatch) {
      detectedStaticPage = staticMatch.page;
      detectedLocale = staticMatch.locale || 'en';
      isHomepage = false;
    } else {
      detectedKbId = resolveKeyboardFromSlug(slug);
      isHomepage = false;
    }
  }

  // Override with query params if explicitly present
  if (kbQuery) {
    const found = ALL_KEYBOARDS.find(k => k.id === kbQuery);
    if (found) {
      detectedKbId = found.id;
      isHomepage = false;
      detectedStaticPage = undefined;
    }
  }
  if (langQuery && SUPPORTED_LOCALES.includes(langQuery)) {
    detectedLocale = langQuery;
  }

  return {
    locale: detectedLocale,
    keyboardId: detectedKbId,
    isHomepage,
    staticPage: detectedStaticPage,
  };
}

/**
 * Resolve a keyboard ID from any slug variant
 */
function resolveKeyboardFromSlug(slug: string): string | undefined {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().trim();

  // 1. Direct ID match
  const directMatch = ALL_KEYBOARDS.find(k => k.id.toLowerCase() === cleanSlug);
  if (directMatch) return directMatch.id;

  // 2. Check in KEYBOARD_SLUGS_MAP
  for (const [kbId, langSlugs] of Object.entries(KEYBOARD_SLUGS_MAP)) {
    for (const s of Object.values(langSlugs)) {
      if (s.toLowerCase() === cleanSlug) {
        return kbId;
      }
    }
  }

  // 3. Normalized strip match (e.g. "clavier-arabe" -> "arabic", "urdu-keyboard" -> "urdu", "teclado-ruso" -> "russian")
  const stripped = cleanSlug
    .replace(/^clavier-/, '')
    .replace(/^teclado-/, '')
    .replace(/^tastiera-/, '')
    .replace(/^keyboard-/, '')
    .replace(/-keyboard$/, '')
    .replace(/-clavier$/, '')
    .replace(/-teclado$/, '')
    .replace(/-tastatur$/, '')
    .trim();

  // Match stripped directly against keyboard ID
  const directStripped = ALL_KEYBOARDS.find(k => k.id.toLowerCase() === stripped);
  if (directStripped) return directStripped.id;

  // Match stripped against keyboard names or native names
  const nameMatch = ALL_KEYBOARDS.find(k => 
    k.name.toLowerCase() === stripped || 
    k.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === stripped ||
    k.id.toLowerCase().replace(/-/g, '') === stripped.replace(/-/g, '')
  );
  if (nameMatch) return nameMatch.id;

  // Substring fuzzy match
  const fuzzy = ALL_KEYBOARDS.find(k => k.id.includes(stripped) || stripped.includes(k.id));
  if (fuzzy) return fuzzy.id;

  // Specific common language words & multi-lingual terms
  if (stripped.includes('arabe') || stripped.includes('arab')) return 'arabic';
  if (stripped.includes('russe') || stripped.includes('ruso') || stripped.includes('russ')) return 'russian';
  if (stripped.includes('ukrain') || stripped.includes('ukrainien') || stripped.includes('ucraniano')) return 'ukrainian';
  if (stripped.includes('grec') || stripped.includes('griego') || stripped.includes('greek')) return 'polytonic-greek';
  if (stripped.includes('hebreu') || stripped.includes('hebreo') || stripped.includes('hebrew')) return 'hebrew';
  if (stripped.includes('farsi') || stripped.includes('persan') || stripped.includes('persa') || stripped.includes('persian')) return 'persian';
  if (stripped.includes('japonais') || stripped.includes('japones') || stripped.includes('japanese') || stripped.includes('hiragana')) return 'japanese-hiragana';
  if (stripped.includes('coreen') || stripped.includes('coreano') || stripped.includes('korean') || stripped.includes('hangul')) return 'korean-hangul';
  if (stripped.includes('ipa') || stripped.includes('phonetique') || stripped.includes('fonetico')) return 'ipa-phonetic';
  if (stripped.includes('hieroglyph') || stripped.includes('hieroglyphe') || stripped.includes('jeroglifico')) return 'hieroglyphs';
  if (stripped.includes('ourdou')) return 'urdu';

  return undefined;
}
