import { KeyboardLayout } from '../../types';

export const hindiDevanagariKeyboard: KeyboardLayout = {
  id: 'hindi',
  name: 'Hindi & Sanskrit (Devanagari)',
  nativeName: 'हिन्दी / संस्कृतम्',
  category: 'south-asian',
  region: 'South Asia (India, Nepal)',
  direction: 'ltr',
  isoCode: 'hi',
  flag: '🇮🇳',
  description: 'Devanagari script for Hindi, Sanskrit, Marathi, and Nepali with InScript arrangement, vowel matras, halant (virama), and Vedic accents.',
  fontFamilyClass: 'font-devanagari text-xl',
  defaultFontSize: 24,
  sampleText: 'सर्वे मानवाः जन्मना स्वतन्त्राः समर्यादाः समुत्पन्नाः च।',
  hasPhoneticMode: true,
  phoneticDescription: 'ITRANS Phonetic typing: ksha=क्ष, gya=ज्ञ, sh=श, kh=ख, gh=घ, aa=आ, ee=ई, oo=ऊ',
  diacritics: ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', '्', 'ं', 'ः', 'ँ', '़'],
  specialCharGroups: [
    { title: 'Swar (Independent Vowels)', chars: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'] },
    { title: 'Matras (Vowel Signs)', chars: ['ा', 'ि', 'ी', 'ु', 'ू', 'ृ', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः', 'ँ', '्'] },
    { title: 'Vyanjan (Consonants)', chars: ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह'] },
    { title: 'Sanyukt (Conjuncts & Nukta)', chars: ['क्ष', 'त्र', 'ज्ञ', 'श्र', 'क़', 'ख़', 'ग़', 'ज़', 'ड़', 'ढ़', 'फ़'] },
    { title: 'Devanagari Numerals & Sacred', chars: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', 'ॐ', '।', '॥', '₹'] }
  ],
  rows: [
    [
      { char: 'ौ', shiftChar: 'औ', code: 'KeyQ' },
      { char: 'ै', shiftChar: 'ऐ', code: 'KeyW' },
      { char: 'ा', shiftChar: 'आ', code: 'KeyE' },
      { char: 'ी', shiftChar: 'ई', code: 'KeyR' },
      { char: 'ू', shiftChar: 'ऊ', code: 'KeyT' },
      { char: 'ब', shiftChar: 'भ', code: 'KeyY' },
      { char: 'ह', shiftChar: 'ङ', code: 'KeyU' },
      { char: 'ग', shiftChar: 'घ', code: 'KeyI' },
      { char: 'द', shiftChar: 'ध', code: 'KeyO' },
      { char: 'ज', shiftChar: 'झ', code: 'KeyP' },
      { char: 'ड', shiftChar: 'ढ', code: 'BracketLeft' },
      { char: '़', shiftChar: 'ञ', code: 'BracketRight' },
    ],
    [
      { char: 'ो', shiftChar: 'ओ', code: 'KeyA' },
      { char: 'े', shiftChar: 'ए', code: 'KeyS' },
      { char: '्', shiftChar: 'अ', code: 'KeyD' },
      { char: 'ि', shiftChar: 'इ', code: 'KeyF' },
      { char: 'ु', shiftChar: 'उ', code: 'KeyG' },
      { char: 'प', shiftChar: 'फ', code: 'KeyH' },
      { char: 'र', shiftChar: 'ऋ', code: 'KeyJ' },
      { char: 'क', shiftChar: 'ख', code: 'KeyK' },
      { char: 'त', shiftChar: 'थ', code: 'KeyL' },
      { char: 'च', shiftChar: 'छ', code: 'Semicolon' },
      { char: 'ट', shiftChar: 'ठ', code: 'Quote' },
    ],
    [
      { char: 'ं', shiftChar: 'ँ', code: 'KeyZ' },
      { char: 'म', shiftChar: 'ण', code: 'KeyX' },
      { char: 'न', shiftChar: 'ऩ', code: 'KeyC' },
      { char: 'व', shiftChar: 'ऴ', code: 'KeyV' },
      { char: 'ल', shiftChar: 'ळ', code: 'KeyB' },
      { char: 'स', shiftChar: 'श', code: 'KeyN' },
      { char: 'य', shiftChar: 'ष', code: 'KeyM' },
      { char: '।', shiftChar: '॥', code: 'Comma' },
      { char: 'ॐ', shiftChar: '₹', code: 'Period' },
      { char: 'य', shiftChar: 'य', code: 'Slash' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'hi',
    wiktionaryLang: 'hi',
    lexilogosUrl: 'https://www.lexilogos.com/clavier/devanagari.htm'
  },
  seoKeywords: ['hindi keyboard', 'devanagari keyboard', 'sanskrit keyboard online', 'clavier hindi', 'inscript hindi keyboard', 'hindi typing online']
};

export const bengaliKeyboard: KeyboardLayout = {
  id: 'bengali',
  name: 'Bengali / Bangla',
  nativeName: 'বাংলা',
  category: 'south-asian',
  region: 'South Asia (Bangladesh & West Bengal)',
  direction: 'ltr',
  isoCode: 'bn',
  flag: '🇧🇩',
  description: 'Bengali script layout for Bangla and Assamese with full Juktakkhor conjunct support, matras, hasant, and Bengali numbers.',
  defaultFontSize: 24,
  sampleText: 'সমস্ত মানুষ স্বাধীনভাবে সমান মর্যাদা এবং অধিকার নিয়ে জন্মগ্রহণ করে।',
  hasPhoneticMode: true,
  specialCharGroups: [
    { title: 'Bengali Vowels & Signs', chars: ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ', 'া', 'ি', 'ী', 'ু', 'ূ', 'ৃ', 'ে', 'ৈ', 'ো', 'ৌ', '্', 'ং', 'ঃ', 'ঁ'] },
    { title: 'Bengali Consonants', chars: ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ध', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'শ', 'ষ', 'স', 'হ', 'ড়', 'ঢ়', 'য়', 'ৎ'] },
    { title: 'Bengali Numerals & Currency', chars: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯', '৳', '।', '॥'] }
  ],
  rows: [
    [
      { char: 'ৌ', shiftChar: 'ঔ' },
      { char: 'ৈ', shiftChar: 'ঐ' },
      { char: 'া', shiftChar: 'আ' },
      { char: 'ী', shiftChar: 'ঈ' },
      { char: 'ূ', shiftChar: 'ঊ' },
      { char: 'ব', shiftChar: 'ভ' },
      { char: 'হ', shiftChar: 'ঙ' },
      { char: 'গ', shiftChar: 'ঘ' },
      { char: 'দ', shiftChar: 'ধ' },
      { char: 'জ', shiftChar: 'ঝ' },
      { char: 'ড', shiftChar: 'ঢ' },
      { char: '়', shiftChar: 'ঞ' },
    ],
    [
      { char: 'ো', shiftChar: 'ও' },
      { char: 'ে', shiftChar: 'এ' },
      { char: '্', shiftChar: 'অ' },
      { char: 'ি', shiftChar: 'ই' },
      { char: 'ু', shiftChar: 'উ' },
      { char: 'প', shiftChar: 'ফ' },
      { char: 'র', shiftChar: 'ঋ' },
      { char: 'ক', shiftChar: 'খ' },
      { char: 'ত', shiftChar: 'থ' },
      { char: 'চ', shiftChar: 'ছ' },
      { char: 'ট', shiftChar: 'ঠ' },
    ],
    [
      { char: 'ং', shiftChar: 'ঁ' },
      { char: 'ম', shiftChar: 'ণ' },
      { char: 'ন', shiftChar: 'ৎ' },
      { char: 'ব', shiftChar: 'ঃ' },
      { char: 'ল', shiftChar: 'ড়' },
      { char: 'স', shiftChar: 'শ' },
      { char: 'য', shiftChar: 'ষ' },
      { char: 'য়', shiftChar: 'ঢ়' },
      { char: '।', shiftChar: '৳' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'bn',
    wiktionaryLang: 'bn',
    lexilogosUrl: 'https://www.lexilogos.com/clavier/bengali.htm'
  },
  seoKeywords: ['bengali keyboard', 'bangla keyboard', 'বাংলা কিবোর্ড', 'bangla typing online']
};

export const tamilKeyboard: KeyboardLayout = {
  id: 'tamil',
  name: 'Tamil',
  nativeName: 'தமிழ்',
  category: 'south-asian',
  region: 'South Asia (Tamil Nadu, Sri Lanka, Singapore)',
  direction: 'ltr',
  isoCode: 'ta',
  flag: '🇮🇳',
  description: 'Tamil script layout (InScript & 99 layout) with uyir ezhuthu (vowels), mei ezhuthu (consonants), ayutha ezhuthu (ஃ), and Grantha letters.',
  defaultFontSize: 24,
  sampleText: 'மனிதப் பிறவியினர் சகலரும் சுதந்திரமாகவே பிறக்கின்றனர்;',
  specialCharGroups: [
    { title: 'Uyir (Vowels)', chars: ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ'] },
    { title: 'Mei & Uyirmei Signs', chars: ['ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை', 'ொ', 'ோ', 'ௌ', '்'] },
    { title: 'Mei (Consonants)', chars: ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம', 'ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன', 'ஜ', 'ஷ', 'ஸ', 'ஹ', 'க்ஷ'] },
    { title: 'Tamil Numerals', chars: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯', '௰', '௱', '௲', '௳', '௴', '௵'] }
  ],
  rows: [
    [
      { char: 'ௌ', shiftChar: 'ஔ' },
      { char: 'ை', shiftChar: 'ஐ' },
      { char: 'ா', shiftChar: 'ஆ' },
      { char: 'ீ', shiftChar: 'ஈ' },
      { char: 'ூ', shiftChar: 'ஊ' },
      { char: 'ப', shiftChar: 'ப' },
      { char: 'ஹ', shiftChar: 'ங' },
      { char: 'க', shiftChar: 'க' },
      { char: 'த', shiftChar: 'த' },
      { char: 'ஜ', shiftChar: 'ஜ' },
      { char: 'ட', shiftChar: 'ட' },
      { char: 'ஞ', shiftChar: 'ஞ' },
    ],
    [
      { char: 'ொ', shiftChar: 'ஒ' },
      { char: 'ே', shiftChar: 'ஏ' },
      { char: '்', shiftChar: 'அ' },
      { char: 'ி', shiftChar: 'இ' },
      { char: 'ு', shiftChar: 'உ' },
      { char: 'ப', shiftChar: 'ப' },
      { char: 'ர', shiftChar: 'ற' },
      { char: 'க', shiftChar: 'க' },
      { char: 'த', shiftChar: 'த' },
      { char: 'ச', shiftChar: 'ச' },
      { char: 'ட', shiftChar: 'ட' },
    ],
    [
      { char: 'ெ', shiftChar: 'எ' },
      { char: 'ம', shiftChar: 'ண' },
      { char: 'ந', shiftChar: 'ன' },
      { char: 'வ', shiftChar: 'வ' },
      { char: 'ல', shiftChar: 'ழ' },
      { char: 'ஸ', shiftChar: 'ஷ' },
      { char: 'ய', shiftChar: 'க்ஷ' },
      { char: 'ள', shiftChar: 'ஃ' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'ta',
    wiktionaryLang: 'ta',
    lexilogosUrl: 'https://www.lexilogos.com/clavier/tamoul.htm'
  },
  seoKeywords: ['tamil keyboard', 'தமிழ் விசைப்பலகை', 'clavier tamoul', 'tamil typing online']
};
