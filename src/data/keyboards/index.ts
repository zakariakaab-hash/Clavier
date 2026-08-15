import { KeyboardCategory, KeyboardLayout } from '../../types';
import { arabicKeyboard, hebrewKeyboard, persianKeyboard, urduKeyboard } from './middleEastern';
import { russianKeyboard, ukrainianKeyboard, serbianCyrillicKeyboard, oldChurchSlavonicKeyboard } from './cyrillic';
import { greekKeyboard, polytonicGreekKeyboard, copticKeyboard } from './greek';
import { frenchKeyboard, germanKeyboard, spanishKeyboard, polishKeyboard, vietnameseKeyboard, esperantoKeyboard } from './european';
import { hindiDevanagariKeyboard, bengaliKeyboard, tamilKeyboard } from './indic';
import { japaneseHiraganaKeyboard, koreanHangulKeyboard, thaiKeyboard } from './eastAsian';
import { georgianKeyboard, armenianKeyboard, amharicGeezKeyboard, tifinaghKeyboard } from './caucasianAfrican';
import { ipaKeyboard } from './phoneticIpa';
import { hieroglyphsKeyboard, runesKeyboard, oghamKeyboard, brailleKeyboard, mathSymbolsKeyboard } from './ancientSymbols';

export const ALL_KEYBOARDS: KeyboardLayout[] = [
  // Middle Eastern
  arabicKeyboard,
  hebrewKeyboard,
  persianKeyboard,
  urduKeyboard,

  // Cyrillic
  russianKeyboard,
  ukrainianKeyboard,
  serbianCyrillicKeyboard,
  oldChurchSlavonicKeyboard,

  // Greek
  greekKeyboard,
  polytonicGreekKeyboard,
  copticKeyboard,

  // European
  frenchKeyboard,
  germanKeyboard,
  spanishKeyboard,
  polishKeyboard,
  vietnameseKeyboard,
  esperantoKeyboard,

  // Indic
  hindiDevanagariKeyboard,
  bengaliKeyboard,
  tamilKeyboard,

  // East Asian
  japaneseHiraganaKeyboard,
  koreanHangulKeyboard,
  thaiKeyboard,

  // Caucasian & African
  georgianKeyboard,
  armenianKeyboard,
  amharicGeezKeyboard,
  tifinaghKeyboard,

  // IPA & Phonetic
  ipaKeyboard,

  // Ancient & Symbols
  hieroglyphsKeyboard,
  runesKeyboard,
  oghamKeyboard,
  brailleKeyboard,
  mathSymbolsKeyboard
];

export const CATEGORIES_CONFIG: { id: KeyboardCategory; name: string; icon: string; description: string }[] = [
  { id: 'middle-eastern', name: 'Semitic & Middle Eastern', icon: '🌙', description: 'Arabic, Hebrew, Persian, Urdu, Syriac with full vocalization' },
  { id: 'cyrillic', name: 'Cyrillic & Slavic', icon: '❄️', description: 'Russian, Ukrainian, Serbian, Bulgarian, Old Church Slavonic' },
  { id: 'greek', name: 'Greek & Polytonic', icon: '🏛️', description: 'Modern Greek, Polytonic Classical Greek, Coptic' },
  { id: 'european', name: 'European & Latin Extended', icon: '🇪🇺', description: 'French AZERTY, German, Spanish, Polish, Vietnamese, Esperanto' },
  { id: 'south-asian', name: 'South Asian & Indic', icon: '🪷', description: 'Hindi Devanagari, Sanskrit, Bengali, Tamil, Gujarati' },
  { id: 'east-asian', name: 'East & Southeast Asian', icon: '⛩️', description: 'Japanese Kana, Korean Hangul, Thai, Burmese, Khmer' },
  { id: 'caucasian-african', name: 'Caucasian & African', icon: '🌍', description: 'Georgian, Armenian, Amharic Ge\'ez, Tifinagh Berber' },
  { id: 'phonetic-ipa', name: 'Phonetics & IPA', icon: '🗣️', description: 'International Phonetic Alphabet, vowel charts, linguistic diacritics' },
  { id: 'ancient-historical', name: 'Ancient & Historical Scripts', icon: '📜', description: 'Egyptian Hieroglyphs, Runes, Ogham, Cuneiform, Phoenician' },
  { id: 'math-symbols', name: 'Math & Braille Symbols', icon: '∑', description: 'Mathematical logic symbols, calculus operators, Braille dots' },
];

export function getKeyboardById(id: string): KeyboardLayout {
  return ALL_KEYBOARDS.find(k => k.id === id) || arabicKeyboard;
}

export function searchKeyboards(query: string): KeyboardLayout[] {
  if (!query.trim()) return ALL_KEYBOARDS;
  const q = query.toLowerCase().trim();
  return ALL_KEYBOARDS.filter(k => 
    k.name.toLowerCase().includes(q) ||
    k.nativeName.toLowerCase().includes(q) ||
    k.region.toLowerCase().includes(q) ||
    k.isoCode.toLowerCase().includes(q) ||
    k.seoKeywords.some(kw => kw.toLowerCase().includes(q))
  );
}
