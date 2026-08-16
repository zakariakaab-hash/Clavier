// Internationalization (i18n) & User System Locale / Geolocation Detection Engine
// Restructured to the 4 main requested languages: English, French, Spanish, Arabic
import { ALL_KEYBOARDS } from '../data/keyboards';
import { KeyboardLayout } from '../types';

export type SupportedLocale = 'en' | 'fr' | 'es' | 'ar';

export interface TranslationDict {
  appName: string;
  tagline: string;
  searchPlaceholder: string;
  searchModalPlaceholder: string;
  categories: string;
  allKeyboards: string;
  popularKeyboards: string;
  library: string;
  favorites: string;
  favoriteKeyboardsTitle: string;
  noFavorites: string;
  soundOn: string;
  soundMuted: string;
  editorPlaceholder: string;
  physicalTypingLabel: string;
  physicalTypingDesc: string;
  phoneticMode: string;
  phoneticActive: string;
  phoneticStandard: string;
  clearText: string;
  copyText: string;
  copied: string;
  listenSpeech: string;
  downloadText: string;
  fullscreen: string;
  exitFullscreen: string;
  transliterationTools: string;
  scriptInfo: string;
  quickCharMap: string;
  diacritics: string;
  specialChars: string;
  space: string;
  enter: string;
  backspace: string;
  capsLock: string;
  altGr: string;
  allKeyboardsCount: string;
  languageDetected: string;
  switchUiLanguage: string;
  autoDetectedLocation: string;
  
  // UI Actions & Extended Labels
  dictionary?: string;
  saveText?: string;
  lightMode?: string;
  darkMode?: string;
  originalKeyboard?: string;
  pcMatrix?: string;
  quickTranslit?: string;
  charsCount?: string;
  wordsCount?: string;
  instructionsTitle?: string;
  instructionsDesc?: string;
  vowelsAndDiacritics?: string;
  help?: string;
  typeInLatin?: string;
  targetOutput?: string;
  insertToEditor?: string;
  morseAudioTitle?: string;
  morsePlay?: string;
  morsePlaying?: string;
  morseDesc?: string;
  footerDesc?: string;
  popularKeyboardsFooter?: string;
  ancientAndStemFooter?: string;
  resourcesFooter?: string;
  officialLexilogos?: string;
  unicodeTables?: string;
  ipaSite?: string;
}

export const TRANSLATIONS: Record<SupportedLocale, TranslationDict> = {
  en: {
    appName: 'KEYPADKING',
    tagline: 'Universal Multilingual Keyboards & Transliteration',
    searchPlaceholder: 'Search 100+ languages (e.g. Arabic, Russian, Greek, Hindi)...',
    searchModalPlaceholder: 'Type a language (e.g., Arabic, Russian, Greek, Hindi, Runes, IPA)...',
    categories: 'Categories:',
    allKeyboards: 'All Keyboards',
    popularKeyboards: 'Popular:',
    library: 'Catalog',
    favorites: 'Favorites',
    favoriteKeyboardsTitle: 'Favorite Keyboards',
    noFavorites: 'Click the star on any keyboard to pin it here.',
    soundOn: 'Tactile sound ON',
    soundMuted: 'Tactile sound MUTED',
    editorPlaceholder: 'Type here using your computer keyboard or the virtual keyboard...',
    physicalTypingLabel: 'Physical typing:',
    physicalTypingDesc: 'Your physical keyboard keys type in',
    phoneticMode: 'Phonetic Mode',
    phoneticActive: 'Active',
    phoneticStandard: 'Standard',
    clearText: 'Clear',
    copyText: 'Copy',
    copied: 'Copied!',
    listenSpeech: 'Pronounce',
    downloadText: 'Download text',
    fullscreen: 'Full Screen',
    exitFullscreen: 'Exit Full Screen',
    transliterationTools: 'Transliteration & Unicode Tools',
    scriptInfo: 'Script Information & Alphabet Guide',
    quickCharMap: 'Special Characters & Vowels',
    diacritics: 'Diacritics & Accents',
    specialChars: 'Special Symbols',
    space: 'Space',
    enter: 'Enter',
    backspace: 'Backspace',
    capsLock: 'Caps Lock',
    altGr: 'AltGr',
    allKeyboardsCount: 'View All Keyboards',
    languageDetected: 'System language & region detected:',
    switchUiLanguage: 'Language',
    autoDetectedLocation: 'Auto-detected from your system/location',
    dictionary: 'Dictionary',
    saveText: 'Save',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    originalKeyboard: 'Original Guide Keyboard',
    pcMatrix: 'PC Hardware Matrix',
    quickTranslit: 'Quick Transliteration Latin ⇄',
    charsCount: 'characters',
    wordsCount: 'words',
    instructionsTitle: 'Instructions:',
    instructionsDesc: 'To type directly with your computer keyboard: use the keys shown above each letter.',
    vowelsAndDiacritics: 'Vowels & Diacritics:',
    help: 'Help',
    typeInLatin: 'Type in Latin letters:',
    targetOutput: 'Target output:',
    insertToEditor: 'Insert to Editor',
    morseAudioTitle: 'Telegraphic Morse Audio Synthesizer (700Hz CW Tone)',
    morsePlay: 'Play Morse Audio',
    morsePlaying: 'Playing Beeps...',
    morseDesc: 'Synthesize standard Morse audio beeps (. = 1 unit, - = 3 units, 700Hz tone) for the text in your editor.',
    footerDesc: 'Universal multilingual virtual keyboards portal. Type in all world languages using your physical keyboard or mouse.',
    popularKeyboardsFooter: 'Popular Keyboards',
    ancientAndStemFooter: 'Ancient & STEM Scripts',
    resourcesFooter: 'Linguistic Resources',
    officialLexilogos: 'Official Lexilogos Website',
    unicodeTables: 'Unicode Character Tables',
    ipaSite: 'International Phonetic Association'
  },
  fr: {
    appName: 'KEYPADKING',
    tagline: 'Claviers Multilingues & Translittération en Ligne',
    searchPlaceholder: 'Rechercher parmi 100+ langues (Arabe, Russe, Grec, Hindi...)...',
    searchModalPlaceholder: 'Tapez une langue (ex: Arabe, Russe, Grec, Hindi, Runes, API)...',
    categories: 'Catégories :',
    allKeyboards: 'Tous les claviers',
    popularKeyboards: 'Populaires :',
    library: 'Bibliothèque',
    favorites: 'Favoris',
    favoriteKeyboardsTitle: 'Claviers Favoris',
    noFavorites: 'Cliquez sur l\'étoile d\'un clavier pour l\'épingler ici.',
    soundOn: 'Son des touches activé',
    soundMuted: 'Son des touches muet',
    editorPlaceholder: 'Écrivez ici avec les touches de votre clavier d\'ordinateur ou le clavier virtuel...',
    physicalTypingLabel: 'Saisie physique :',
    physicalTypingDesc: 'Les touches de votre clavier écrivent en',
    phoneticMode: 'Mode Phonétique',
    phoneticActive: 'Actif',
    phoneticStandard: 'Standard',
    clearText: 'Effacer',
    copyText: 'Copier',
    copied: 'Copié !',
    listenSpeech: 'Prononcer',
    downloadText: 'Télécharger',
    fullscreen: 'Plein écran',
    exitFullscreen: 'Quitter plein écran',
    transliterationTools: 'Outils de Translittération et Unicode',
    scriptInfo: 'Informations Linguistiques et Guide Alphabétique',
    quickCharMap: 'Caractères Spéciaux & Voyelles',
    diacritics: 'Diacritiques & Accents',
    specialChars: 'Symboles Spéciaux',
    space: 'Espace',
    enter: 'Entrée',
    backspace: 'Retour',
    capsLock: 'Verr. Maj',
    altGr: 'AltGr',
    allKeyboardsCount: 'Voir tout le catalogue',
    languageDetected: 'Langue système et région détectées :',
    switchUiLanguage: 'Langue',
    autoDetectedLocation: 'Détecté automatiquement selon votre système / région',
    dictionary: 'Dictionnaire',
    saveText: 'Enregistrer',
    lightMode: 'Mode Clair',
    darkMode: 'Mode Sombre',
    originalKeyboard: 'Clavier Guide d\'Origine',
    pcMatrix: 'Matrice PC Matériel',
    quickTranslit: 'Translittération Rapide Latin ⇄',
    charsCount: 'caractères',
    wordsCount: 'mots',
    instructionsTitle: 'Mode d\'emploi :',
    instructionsDesc: 'Pour écrire directement avec le clavier d\'ordinateur : utiliser les touches indiquées au-dessus de chaque lettre.',
    vowelsAndDiacritics: 'Voyelles et Diacritiques :',
    help: 'Aide',
    typeInLatin: 'Écrire en caractères latins :',
    targetOutput: 'Résultat converti :',
    insertToEditor: 'Insérer dans l\'éditeur',
    morseAudioTitle: 'Synthétiseur Audio Morse Télégraphique (700Hz)',
    morsePlay: 'Jouer le Code Morse',
    morsePlaying: 'Lecture en cours...',
    morseDesc: 'Synthétise les bips audio du code Morse standard (. = 1 unité, - = 3 unités, tonalité 700Hz).',
    footerDesc: 'Portail universel de claviers virtuels multilingues. Tapez dans toutes les langues du monde.',
    popularKeyboardsFooter: 'Claviers Populaires',
    ancientAndStemFooter: 'Écritures Anciennes & STEM',
    resourcesFooter: 'Ressources Linguistiques',
    officialLexilogos: 'Site officiel Lexilogos',
    unicodeTables: 'Tables de Caractères Unicode',
    ipaSite: 'Association Phonétique Internationale (API)'
  },
  es: {
    appName: 'KEYPADKING',
    tagline: 'Teclados Multilingües y Transliteración en Línea',
    searchPlaceholder: 'Buscar entre más de 100 idiomas (Árabe, Ruso, Griego, Hindi)...',
    searchModalPlaceholder: 'Escriba un idioma (ej: Árabe, Ruso, Griego, Hindi, Runas, AFI)...',
    categories: 'Categorías:',
    allKeyboards: 'Todos los teclados',
    popularKeyboards: 'Populares:',
    library: 'Catálogo',
    favorites: 'Favoritos',
    favoriteKeyboardsTitle: 'Teclados Favoritos',
    noFavorites: 'Haga clic en la estrella para anclar teclados aquí.',
    soundOn: 'Sonido táctil ACTIVO',
    soundMuted: 'Sonido táctil SILENCIADO',
    editorPlaceholder: 'Escriba aquí usando el teclado de su computadora o el teclado virtual...',
    physicalTypingLabel: 'Escritura física:',
    physicalTypingDesc: 'Las teclas de su teclado físico escriben en',
    phoneticMode: 'Modo Fonético',
    phoneticActive: 'Activo',
    phoneticStandard: 'Estándar',
    clearText: 'Borrar',
    copyText: 'Copiar',
    copied: '¡Copiado!',
    listenSpeech: 'Pronunciar',
    downloadText: 'Descargar texto',
    fullscreen: 'Pantalla completa',
    exitFullscreen: 'Salir de pantalla completa',
    transliterationTools: 'Herramientas de Transliteración y Unicode',
    scriptInfo: 'Información Lingüística y Guía del Alfabeto',
    quickCharMap: 'Caracteres Especiales y Vocales',
    diacritics: 'Diacríticos y Acentos',
    specialChars: 'Símbolos Especiales',
    space: 'Espacio',
    enter: 'Entrar',
    backspace: 'Retroceso',
    capsLock: 'Bloq Mayús',
    altGr: 'AltGr',
    allKeyboardsCount: 'Ver todos los teclados',
    languageDetected: 'Idioma del sistema detectado:',
    switchUiLanguage: 'Idioma',
    autoDetectedLocation: 'Detectado automáticamente según su sistema / región',
    dictionary: 'Diccionario',
    saveText: 'Guardar',
    lightMode: 'Modo Claro',
    darkMode: 'Modo Oscuro',
    originalKeyboard: 'Teclado Guía Original',
    pcMatrix: 'Matriz de Hardware PC',
    quickTranslit: 'Transliteración Rápida Latín ⇄',
    charsCount: 'caracteres',
    wordsCount: 'palabras',
    instructionsTitle: 'Instrucciones:',
    instructionsDesc: 'Para escribir directamente con el teclado de su PC: use las teclas indicadas sobre cada letra.',
    vowelsAndDiacritics: 'Vocales y Diacríticos:',
    help: 'Ayuda',
    typeInLatin: 'Escribir en letras latinas:',
    targetOutput: 'Resultado:',
    insertToEditor: 'Insertar en el editor',
    morseAudioTitle: 'Sintetizador de Audio Morse (700Hz)',
    morsePlay: 'Reproducir Código Morse',
    morsePlaying: 'Reproduciendo...',
    morseDesc: 'Sintetiza pitidos de audio en código Morse estándar para el texto en el editor.',
    footerDesc: 'Portal universal de teclados virtuales multilingües. Escriba en cualquier idioma del mundo.',
    popularKeyboardsFooter: 'Teclados Populares',
    ancientAndStemFooter: 'Escrituras Antiguas y STEM',
    resourcesFooter: 'Recursos Lingüísticos',
    officialLexilogos: 'Sitio oficial Lexilogos',
    unicodeTables: 'Tablas de Caracteres Unicode',
    ipaSite: 'Asociación Fonética Internacional (AFI)'
  },
  ar: {
    appName: 'KEYPADKING',
    tagline: 'لوحات المفاتيح العالمية والنسخ الصوتي عبر الإنترنت',
    searchPlaceholder: 'ابحث في أكثر من 100 لغة (العربية، الروسية، اليونانية، الهندية)...',
    searchModalPlaceholder: 'اكتب اسم اللغة (مثل: العربية، الروسية، اليونانية، الهندية، الرونية)...',
    categories: 'التصنيفات:',
    allKeyboards: 'جميع لوحات المفاتيح',
    popularKeyboards: 'الشائعة:',
    library: 'دليل اللغات',
    favorites: 'المفضلة',
    favoriteKeyboardsTitle: 'لوحات المفاتيح المفضلة',
    noFavorites: 'انقر على رمز النجمة لحفظ لوحة المفاتيح في هذه القائمة.',
    soundOn: 'صوت المفاتيح مفعل',
    soundMuted: 'صوت المفاتيح مكتوم',
    editorPlaceholder: 'اكتب هنا باستخدام لوحة مفاتيح حاسوبك العادية أو لوحة المفاتيح الافتراضية...',
    physicalTypingLabel: 'الكتابة بلوحة الحاسوب:',
    physicalTypingDesc: 'مفاتيح حاسوبك تكتب الآن باللغة',
    phoneticMode: 'الوضع الصوتي (الفونيتك)',
    phoneticActive: 'مفعل',
    phoneticStandard: 'قياسي',
    clearText: 'مسح',
    copyText: 'نسخ',
    copied: 'تم النسخ!',
    listenSpeech: 'نطق',
    downloadText: 'تنزيل النص',
    fullscreen: 'ملء الشاشة',
    exitFullscreen: 'إلغاء ملء الشاشة',
    transliterationTools: 'أدوات النسخ الصوتي واليونيكود',
    scriptInfo: 'معلومات الأبجدية والدليل الصوتي',
    quickCharMap: 'الحروف والتشكيلات الخاصة',
    diacritics: 'الحركات والتشكيل',
    specialChars: 'رموز خاصة',
    space: 'مسافة',
    enter: 'إدخال',
    backspace: 'حذف',
    capsLock: 'تثبيت العالي',
    altGr: 'AltGr',
    allKeyboardsCount: 'عرض كل اللغات',
    languageDetected: 'تم اكتشاف لغة ونظام الجهاز:',
    switchUiLanguage: 'اللغة',
    autoDetectedLocation: 'تم الكشف تلقائياً وفقاً للغة جهازك ونظام التشغيل',
    dictionary: 'القاموس',
    saveText: 'حفظ',
    lightMode: 'الوضع الفاتح',
    darkMode: 'الوضع الداكن',
    originalKeyboard: 'لوحة الحروف الأصلية',
    pcMatrix: 'تخطيط الحاسوب المكتبي (PC)',
    quickTranslit: 'النسخ الصوتي اللاتيني ⇄',
    charsCount: 'حرف',
    wordsCount: 'كلمة',
    instructionsTitle: 'طريقة الاستخدام:',
    instructionsDesc: 'للكتابة المباشرة بلوحة مفاتيح جهازك: استخدم المفاتيح الموضحة أعلى كل حرف.',
    vowelsAndDiacritics: 'الحركات والتشكيل:',
    help: 'مساعدة',
    typeInLatin: 'اكتب بالحروف اللاتينية:',
    targetOutput: 'النتيجة المترجمة:',
    insertToEditor: 'إدراج في المحرر',
    morseAudioTitle: 'مركب مورس الصوتي (700Hz)',
    morsePlay: 'تشغيل نغمات مورس',
    morsePlaying: 'جارٍ التشغيل...',
    morseDesc: 'توليد إشارات شفرة مورس الصوتية للنص المكتوب في المحرر.',
    footerDesc: 'بوابة لوحات المفاتيح الافتراضية العالمية متعددة اللغات مع النسخ الصوتي.',
    popularKeyboardsFooter: 'لوحات المفاتيح الشائعة',
    ancientAndStemFooter: 'الخطوط القديمة والرموز العلمية',
    resourcesFooter: 'المصادر والمراجع اللغوية',
    officialLexilogos: 'موقع ليكسيلوجوس الرسمي',
    unicodeTables: 'جداول رموز اليونيكود',
    ipaSite: 'جمعية الصوتيات الدولية (IPA)'
  }
};

export function getTranslation(locale?: SupportedLocale | string): TranslationDict {
  const target = (locale && TRANSLATIONS[locale as SupportedLocale]) || TRANSLATIONS.en;
  return { ...TRANSLATIONS.en, ...target };
}

// Locale-to-Starting-Keyboard mapping
const LOCALE_TO_KEYBOARD_ID: Record<string, string> = {
  ar: 'arabic',
  'ar-SA': 'arabic',
  'ar-EG': 'arabic',
  'ar-AE': 'arabic',
  'ar-DZ': 'arabic',
  'ar-MA': 'arabic',
  'ar-TN': 'arabic',
  'ar-IQ': 'arabic',
  'ar-SY': 'arabic',
  'ar-JO': 'arabic',
  'ar-LB': 'arabic',
  'ar-KW': 'arabic',
  'ar-QA': 'arabic',
  'ar-OM': 'arabic',
  'ar-BH': 'arabic',
  'ar-YE': 'arabic',
  'ar-SD': 'arabic',
  'ar-LY': 'arabic',
  fr: 'french',
  'fr-FR': 'french',
  'fr-BE': 'french',
  'fr-CA': 'french',
  'fr-CH': 'french',
  es: 'spanish',
  'es-ES': 'spanish',
  'es-MX': 'spanish',
  'es-AR': 'spanish',
  'es-CO': 'spanish',
  'es-CL': 'spanish',
  'es-PE': 'spanish',
  en: 'arabic',
  'en-US': 'arabic',
  'en-GB': 'arabic',
  fa: 'persian',
  ur: 'urdu',
  ru: 'russian',
  el: 'polytonic-greek',
  hi: 'hindi',
  ja: 'japanese-hiragana',
  ko: 'korean-hangul',
  de: 'german'
};

const TIMEZONE_TO_KEYBOARD_ID: Record<string, string> = {
  'Asia/Riyadh': 'arabic',
  'Africa/Cairo': 'arabic',
  'Asia/Dubai': 'arabic',
  'Africa/Algiers': 'arabic',
  'Africa/Casablanca': 'arabic',
  'Africa/Tunis': 'arabic',
  'Europe/Paris': 'french',
  'Europe/Madrid': 'spanish',
  'America/Mexico_City': 'spanish',
  'America/Bogota': 'spanish',
  'America/Argentina/Buenos_Aires': 'spanish',
  'America/Santiago': 'spanish',
  'America/Lima': 'spanish',
  'Asia/Tehran': 'persian',
  'Asia/Karachi': 'urdu',
  'Europe/Moscow': 'russian',
  'Europe/Athens': 'polytonic-greek',
  'Asia/Kolkata': 'hindi',
  'Asia/Tokyo': 'japanese-hiragana',
  'Asia/Seoul': 'korean-hangul',
  'Europe/Berlin': 'german'
};

export interface DetectedInfo {
  locale: SupportedLocale;
  systemLangTag: string;
  countryCode: string;
  timeZone: string;
  matchedKeyboard?: KeyboardLayout;
  locationLabel: string;
}

export function detectUserSystemLanguageAndLocation(): DetectedInfo {
  const supportedLocales: SupportedLocale[] = ['ar', 'fr', 'es', 'en'];
  const candidateLangs: string[] = [];

  try {
    if (navigator.languages && navigator.languages.length > 0) {
      candidateLangs.push(...navigator.languages);
    }
  } catch {}

  try {
    if (navigator.language) {
      candidateLangs.push(navigator.language);
    }
  } catch {}

  try {
    const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (intlLocale) candidateLangs.push(intlLocale);
  } catch {}

  if (candidateLangs.length === 0) {
    candidateLangs.push('en');
  }

  const primaryLang = candidateLangs[0] || 'en';
  let matchedLocale: SupportedLocale = 'en';

  // Check each candidate for supported UI translation in the 4 main languages
  for (const rawLang of candidateLangs) {
    if (!rawLang || typeof rawLang !== 'string') continue;
    const cleanPrefix = rawLang.split('-')[0].toLowerCase();
    if (supportedLocales.includes(cleanPrefix as SupportedLocale)) {
      matchedLocale = cleanPrefix as SupportedLocale;
      break;
    }
  }

  let timeZone = 'UTC';
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {}

  let countryCode = '';
  for (const rawLang of candidateLangs) {
    if (rawLang && rawLang.includes('-')) {
      countryCode = rawLang.split('-')[1].toUpperCase();
      break;
    }
  }

  // Determine starting keyboard layout from language candidates or timezone
  let targetKbId: string | undefined = undefined;
  for (const rawLang of candidateLangs) {
    const cleanPrefix = rawLang.split('-')[0].toLowerCase();
    if (LOCALE_TO_KEYBOARD_ID[rawLang]) {
      targetKbId = LOCALE_TO_KEYBOARD_ID[rawLang];
      break;
    }
    if (LOCALE_TO_KEYBOARD_ID[cleanPrefix]) {
      targetKbId = LOCALE_TO_KEYBOARD_ID[cleanPrefix];
      break;
    }
  }

  if (!targetKbId && timeZone && TIMEZONE_TO_KEYBOARD_ID[timeZone]) {
    targetKbId = TIMEZONE_TO_KEYBOARD_ID[timeZone];
  }

  const matchedKeyboard = targetKbId 
    ? ALL_KEYBOARDS.find(k => k.id === targetKbId) 
    : undefined;

  const shortTz = timeZone.includes('/') ? timeZone.split('/')[1].replace(/_/g, ' ') : timeZone;
  const locationLabel = `${primaryLang.toUpperCase()} (${shortTz})`;

  return {
    locale: matchedLocale,
    systemLangTag: primaryLang,
    countryCode,
    timeZone,
    matchedKeyboard,
    locationLabel
  };
}
