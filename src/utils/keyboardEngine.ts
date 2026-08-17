// Comprehensive Real-Time Physical Keyboard & Transliteration Engine
import { KeyboardLayout, KeyDefinition, PhysicalLayout } from '../types';
import { transliterateText } from './transliterate';

// Hangul Jamo tables for 2-Bolsik composition
const HANGUL_INITIALS = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

const HANGUL_MEDIALS = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 
  'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
];

const HANGUL_FINALS = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// Korean 2-Bolsik physical key mapping
const KOREAN_2BOLSIK_MAP: Record<string, string> = {
  'q': 'ㅂ', 'Q': 'ㅃ', 'w': 'ㅈ', 'W': 'ㅉ', 'e': 'ㄷ', 'E': 'ㄸ',
  'r': 'ㄱ', 'R': 'ㄲ', 't': 'ㅅ', 'T': 'ㅆ', 'y': 'ㅛ', 'Y': 'ㅛ',
  'u': 'ㅕ', 'U': 'ㅕ', 'i': 'ㅑ', 'I': 'ㅑ', 'o': 'ㅐ', 'O': 'ㅒ',
  'p': 'ㅔ', 'P': 'ㅖ', 'a': 'ㅁ', 'A': 'ㅁ', 's': 'ㄴ', 'S': 'ㄴ',
  'd': 'ㅇ', 'D': 'ㅇ', 'f': 'ㄹ', 'F': 'ㄹ', 'g': 'ㅎ', 'G': 'ㅎ',
  'h': 'ㅗ', 'H': 'ㅗ', 'j': 'ㅓ', 'J': 'ㅓ', 'k': 'ㅏ', 'K': 'ㅏ',
  'l': 'ㅣ', 'L': 'ㅣ', 'z': 'ㅋ', 'Z': 'ㅋ', 'x': 'ㅌ', 'X': 'ㅌ',
  'c': 'ㅊ', 'C': 'ㅊ', 'v': 'ㅍ', 'V': 'ㅍ', 'b': 'ㅠ', 'B': 'ㅠ',
  'n': 'ㅜ', 'N': 'ㅜ', 'm': 'ㅡ', 'M': 'ㅡ'
};

// Compose Hangul Jamo into syllables if possible
export function composeHangul(prevChar: string, newJamo: string): string {
  // If previous is initial and new is medial
  const initIdx = HANGUL_INITIALS.indexOf(prevChar);
  const medIdx = HANGUL_MEDIALS.indexOf(newJamo);
  if (initIdx !== -1 && medIdx !== -1) {
    const code = 0xAC00 + (initIdx * 21 + medIdx) * 28;
    return String.fromCharCode(code);
  }

  // If previous is already a syllable (initial + medial)
  const prevCode = prevChar.charCodeAt(0);
  if (prevCode >= 0xAC00 && prevCode <= 0xD7A3) {
    const syllableIndex = prevCode - 0xAC00;
    const existingFinal = syllableIndex % 28;
    const existingMedial = Math.floor((syllableIndex / 28) % 21);
    const existingInitial = Math.floor(syllableIndex / 28 / 21);

    // If no final consonant yet and new is consonant
    if (existingFinal === 0) {
      const finalIdx = HANGUL_FINALS.indexOf(newJamo);
      if (finalIdx > 0) {
        return String.fromCharCode(0xAC00 + (existingInitial * 21 + existingMedial) * 28 + finalIdx);
      }
    }
  }

  return prevChar + newJamo;
}

// Physical Key code to visual label map for QWERTY, AZERTY, QWERTZ
export const PHYSICAL_KEY_LABELS: Record<'qwerty' | 'azerty' | 'qwertz', Record<string, string>> = {
  qwerty: {
    KeyQ: 'Q', KeyW: 'W', KeyE: 'E', KeyR: 'R', KeyT: 'T', KeyY: 'Y', KeyU: 'U', KeyI: 'I', KeyO: 'O', KeyP: 'P',
    KeyA: 'A', KeyS: 'S', KeyD: 'D', KeyF: 'F', KeyG: 'G', KeyH: 'H', KeyJ: 'J', KeyK: 'K', KeyL: 'L',
    KeyZ: 'Z', KeyX: 'X', KeyC: 'C', KeyV: 'V', KeyB: 'B', KeyN: 'N', KeyM: 'M',
    Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0',
    Minus: '-', Equal: '=', BracketLeft: '[', BracketRight: ']', Backslash: '\\', Semicolon: ';', Quote: "'",
    Backquote: '`', Comma: ',', Period: '.', Slash: '/', IntlBackslash: '\\'
  },
  azerty: {
    KeyQ: 'A', KeyW: 'Z', KeyE: 'E', KeyR: 'R', KeyT: 'T', KeyY: 'Y', KeyU: 'U', KeyI: 'I', KeyO: 'O', KeyP: 'P',
    KeyA: 'Q', KeyS: 'S', KeyD: 'D', KeyF: 'F', KeyG: 'G', KeyH: 'H', KeyJ: 'J', KeyK: 'K', KeyL: 'L',
    KeyZ: 'W', KeyX: 'X', KeyC: 'C', KeyV: 'V', KeyB: 'B', KeyN: 'N', KeyM: ',',
    Digit1: '&', Digit2: 'é', Digit3: '"', Digit4: "'", Digit5: '(', Digit6: '-', Digit7: 'è', Digit8: '_', Digit9: 'ç', Digit0: 'à',
    Minus: ')', Equal: '=', BracketLeft: '^', BracketRight: '$', Backslash: '*', Semicolon: 'M', Quote: 'ù',
    Backquote: '²', Comma: ';', Period: ':', Slash: '!', IntlBackslash: '<'
  },
  qwertz: {
    KeyQ: 'Q', KeyW: 'W', KeyE: 'E', KeyR: 'R', KeyT: 'T', KeyY: 'Z', KeyU: 'U', KeyI: 'I', KeyO: 'O', KeyP: 'P',
    KeyA: 'A', KeyS: 'S', KeyD: 'D', KeyF: 'F', KeyG: 'G', KeyH: 'H', KeyJ: 'J', KeyK: 'K', KeyL: 'L',
    KeyZ: 'Y', KeyX: 'X', KeyC: 'C', KeyV: 'V', KeyB: 'B', KeyN: 'N', KeyM: 'M',
    Digit1: '1', Digit2: '2', Digit3: '3', Digit4: '4', Digit5: '5', Digit6: '6', Digit7: '7', Digit8: '8', Digit9: '9', Digit0: '0',
    Minus: 'ß', Equal: '´', BracketLeft: 'Ü', BracketRight: '+', Backslash: '#', Semicolon: 'Ö', Quote: 'Ä',
    Backquote: '^', Comma: ',', Period: '.', Slash: '-', IntlBackslash: '<'
  }
};

/**
 * Get the displayed physical-key hint for any key definition according to active layout
 */
export function getPhysicalKeyHint(
  keyDef: KeyDefinition,
  layout: 'qwerty' | 'azerty' | 'qwertz'
): string | null {
  if (keyDef.code && PHYSICAL_KEY_LABELS[layout]?.[keyDef.code]) {
    return PHYSICAL_KEY_LABELS[layout][keyDef.code];
  }
  if (keyDef.latinGuide) {
    // If latinGuide is a single letter, adjust for layout if needed
    const upper = keyDef.latinGuide.toUpperCase();
    if (layout === 'azerty') {
      if (upper === 'Q') return 'A';
      if (upper === 'A') return 'Q';
      if (upper === 'W') return 'Z';
      if (upper === 'Z') return 'W';
    } else if (layout === 'qwertz') {
      if (upper === 'Y') return 'Z';
      if (upper === 'Z') return 'Y';
    }
    return keyDef.latinGuide;
  }
  return null;
}

/**
 * Automatic Browser Keyboard Layout Detection
 * Uses navigator.keyboard.getLayoutMap() where available with silent fallback to QWERTY
 */
export async function detectBrowserPhysicalLayout(): Promise<'qwerty' | 'azerty' | 'qwertz'> {
  try {
    if (typeof navigator !== 'undefined' && 'keyboard' in navigator && (navigator as any).keyboard?.getLayoutMap) {
      const layoutMap = await (navigator as any).keyboard.getLayoutMap();
      const qKey = layoutMap.get('KeyQ');
      const wKey = layoutMap.get('KeyW');
      const zKey = layoutMap.get('KeyZ');
      const yKey = layoutMap.get('KeyY');

      if (qKey === 'a' || wKey === 'z') {
        return 'azerty';
      }
      if (zKey === 'y' || yKey === 'z') {
        return 'qwertz';
      }
      if (qKey === 'q') {
        return 'qwerty';
      }
    }
  } catch {
    // Silently continue with default
  }
  return 'qwerty';
}

/**
 * Real-time keystroke inference of user physical layout
 */
export function inferPhysicalLayoutFromKeystroke(
  code: string,
  key: string
): 'qwerty' | 'azerty' | 'qwertz' | null {
  if (!code || !key) return null;
  const lowerKey = key.toLowerCase();

  if (code === 'KeyQ' && lowerKey === 'a') return 'azerty';
  if (code === 'KeyA' && lowerKey === 'q') return 'azerty';
  if (code === 'KeyW' && lowerKey === 'z') return 'azerty';
  if (code === 'KeyZ' && lowerKey === 'w') return 'azerty';
  if (code === 'KeyZ' && lowerKey === 'y') return 'qwertz';
  if (code === 'KeyY' && lowerKey === 'z') return 'qwertz';
  if (code === 'KeyQ' && lowerKey === 'q') return 'qwerty';

  return null;
}

// Arabic transliteration lookup table (Reverse mappings & multi-key lookups)
const ARABIC_KEY_MAP: Record<string, string> = {
  'a': 'ا', 'A': 'آ', 'b': 'ب', 'B': 'ب', 't': 'ت', 'T': 'ط',
  'j': 'ج', 'J': 'چ', 'h': 'ه', 'H': 'ح', '7': 'ح', 'x': 'خ', 'X': 'خ',
  'd': 'د', 'D': 'ض', 'r': 'ر', 'R': 'ر', 'z': 'ز', 'Z': 'ظ',
  's': 'س', 'S': 'ص', 'c': 'ش', 'C': 'ث', 'v': 'ظ', 'V': 'ذ',
  'g': 'غ', 'G': 'غ', '3': 'ع', 'e': 'ع', 'E': 'ع', 'f': 'ف', 'F': 'ف',
  'q': 'ق', 'Q': 'ق', 'k': 'ك', 'K': 'ك', 'l': 'ل', 'L': 'ل',
  'm': 'م', 'M': 'م', 'n': 'ن', 'N': 'ن', 'w': 'و', 'W': 'ؤ',
  'y': 'ي', 'Y': 'ى', 'p': 'پ', 'P': 'ڤ', 'o': 'ة', 'O': 'ة',
  'u': 'ء', 'U': 'ئ', 'i': 'إ', 'I': 'أ', '2': 'ء', '-': 'ء',
  '?': '؟', ',': '،', ';': '؛', '%': '٪'
};

const ARABIC_MULTI_COMBOS: Record<string, string> = {
  "s'": 'ش', 'sh': 'ش', 'SH': 'ش', "س'": 'ش',
  "H'": 'خ', "h'": 'خ', 'kh': 'خ', 'KH': 'خ', "ح'": 'خ',
  "t'": 'ث', 'th': 'ث', 'TH': 'ث', "ت'": 'ث',
  "g'": 'غ', 'gh': 'غ', 'GH': 'غ', "ع'": 'غ',
  "d'": 'ذ', 'dh': 'ذ', 'DH': 'ذ', "د'": 'ذ',
  'aa': 'آ', 'a=': 'آ', 'اا': 'آ', "ا'": 'آ',
  'a>': 'أ', 'i=': 'إ', 'u=': 'ؤ', 'y=': 'ئ', 't=': 'ة', 'a_': 'ى',
  'ee': 'ي', 'oo': 'و', 'ou': 'و'
};

// Persian / Farsi multi combos
const PERSIAN_MULTI_COMBOS: Record<string, string> = {
  'kh': 'خ', 'KH': 'خ', 'gh': 'غ', 'GH': 'غ',
  'sh': 'ش', 'SH': 'ش', 'zh': 'ژ', 'ZH': 'ژ',
  'ch': 'چ', 'CH': 'چ', 'aa': 'آ'
};

// Urdu multi combos
const URDU_MULTI_COMBOS: Record<string, string> = {
  'kh': 'خ', 'KH': 'خ', 'gh': 'غ', 'GH': 'غ',
  'sh': 'ش', 'SH': 'ش', 'zh': 'ژ', 'ZH': 'ژ',
  'ch': 'چ', 'CH': 'چ', 'jh': 'جھ', 'th': 'تھ',
  'dh': 'دھ', 'bh': 'بھ', 'ph': 'پھ', 'rh': 'ڑھ',
  'Th': 'ٹ', 'Dh': 'ڈ', 'Rh': 'ڑ', 'aa': 'آ'
};

// Russian phonetic typing table
const RUSSIAN_KEY_MAP: Record<string, string> = {
  'a': 'а', 'A': 'А', 'b': 'б', 'B': 'Б', 'v': 'в', 'V': 'В',
  'w': 'в', 'W': 'В', 'g': 'г', 'G': 'Г', 'd': 'д', 'D': 'Д',
  'e': 'е', 'E': 'Е', 'z': 'з', 'Z': 'З', 'i': 'и', 'I': 'И',
  'j': 'й', 'J': 'Й', 'k': 'к', 'K': 'К', 'l': 'л', 'L': 'Л',
  'm': 'м', 'M': 'М', 'n': 'н', 'N': 'Н', 'o': 'о', 'O': 'О',
  'p': 'п', 'P': 'П', 'r': 'р', 'R': 'Р', 's': 'с', 'S': 'С',
  't': 'т', 'T': 'Т', 'u': 'у', 'U': 'У', 'f': 'ф', 'F': 'Ф',
  'h': 'х', 'H': 'Х', 'c': 'ц', 'C': 'Ц', 'y': 'ы', 'Y': 'Ы',
  '#': 'ъ', "'": 'ь'
};

const RUSSIAN_MULTI_COMBOS: Record<string, string> = {
  'yo': 'ё', 'YO': 'Ё', 'Yo': 'Ё', 'ео': 'ё',
  'zh': 'ж', 'ZH': 'Ж', 'Zh': 'Ж', 'зh': 'ж',
  'ch': 'ч', 'CH': 'Ч', 'Ch': 'Ч', 'цh': 'ч',
  'sh': 'ш', 'SH': 'Ш', 'Sh': 'Ш', 'сh': 'ш',
  'shch': 'щ', 'SHCH': 'Щ', 'шch': 'щ', 'шч': 'щ',
  'yu': 'ю', 'YU': 'Ю', 'Yu': 'Ю', 'ыu': 'ю',
  'ya': 'я', 'YA': 'Я', 'Ya': 'Я', 'ыa': 'я',
  'kh': 'х', 'KH': 'Х', 'Kh': 'Х', 'кh': 'х',
  'ts': 'ц', 'TS': 'Ц', 'Ts': 'Ц', 'тs': 'ц',
  'je': 'э', 'JE': 'Э', 'Je': 'Э', "е'": 'э'
};

// Greek phonetic typing table
const GREEK_KEY_MAP: Record<string, string> = {
  'a': 'α', 'A': 'Α', 'b': 'β', 'B': 'Β', 'g': 'γ', 'G': 'Γ',
  'd': 'δ', 'D': 'Δ', 'e': 'ε', 'E': 'Ε', 'z': 'ζ', 'Z': 'Ζ',
  'h': 'η', 'H': 'Η', 'i': 'ι', 'I': 'Ι', 'k': 'κ', 'K': 'Κ',
  'l': 'λ', 'L': 'Λ', 'm': 'μ', 'M': 'Μ', 'n': 'ν', 'N': 'Ν',
  'x': 'ξ', 'X': 'Ξ', 'o': 'ο', 'O': 'Ο', 'p': 'π', 'P': 'Π',
  'r': 'ρ', 'R': 'Ρ', 's': 'σ', 'S': 'Σ', 't': 'τ', 'T': 'Τ',
  'u': 'υ', 'U': 'Υ', 'y': 'υ', 'Y': 'Υ', 'f': 'φ', 'F': 'Φ',
  'w': 'ω', 'W': 'Ω', 'q': 'θ', 'Q': 'Θ',
  '?': ';', ';': '·'
};

const GREEK_MULTI_COMBOS: Record<string, string> = {
  'th': 'θ', 'TH': 'Θ', 'Th': 'Θ', 'τh': 'θ',
  'ph': 'φ', 'PH': 'Φ', 'Ph': 'Φ', 'πh': 'φ',
  'ch': 'χ', 'CH': 'Χ', 'Ch': 'Χ', 'κh': 'χ',
  'ps': 'ψ', 'PS': 'Ψ', 'Ps': 'Ψ', 'πs': 'ψ',
  "s'": 'ς', "σ'": 'ς'
};

// Hebrew phonetic typing table
const HEBREW_KEY_MAP: Record<string, string> = {
  'a': 'א', 'b': 'ב', 'v': 'ב', 'g': 'ג', 'd': 'ד', 'h': 'ה',
  'w': 'ו', 'u': 'ו', 'o': 'ו', 'z': 'ז', 'H': 'ח', 'x': 'ח',
  't': 'ט', 'y': 'י', 'i': 'י', 'k': 'כ', 'l': 'ל', 'm': 'מ',
  'n': 'נ', 's': 'ס', 'e': 'ע', 'p': 'פ', 'f': 'פ', 'c': 'צ',
  'q': 'ק', 'r': 'ר'
};

const HEBREW_MULTI_COMBOS: Record<string, string> = {
  'sh': 'ש', 'SH': 'ש', 'kh': 'ח', 'KH': 'ח',
  'ts': 'צ', 'TS': 'צ', 'ch': 'ח', 'CH': 'ח',
  "t'": 'ת', 'th': 'ת'
};

// Georgian Mkhedruli typing table
const GEORGIAN_KEY_MAP: Record<string, string> = {
  'a': 'ა', 'b': 'ბ', 'g': 'გ', 'd': 'დ', 'e': 'ე', 'v': 'ვ',
  'z': 'ზ', 't': 'თ', 'T': 'ტ', 'i': 'ი', 'k': 'კ', 'K': 'ქ',
  'l': 'ლ', 'm': 'მ', 'n': 'ნ', 'o': 'ო', 'p': 'პ', 'P': 'ფ',
  'Z': 'ჟ', 'r': 'რ', 's': 'ს', 'S': 'შ', 'u': 'უ', 'G': 'ღ',
  'q': 'ყ', 'Q': 'ყ', 'C': 'ჩ', 'W': 'ჭ', 'c': 'ც', 'w': 'წ',
  'j': 'ჯ', 'J': 'ჯ', 'h': 'ჰ', 'H': 'ჰ', 'x': 'ხ'
};

const GEORGIAN_MULTI_COMBOS: Record<string, string> = {
  'zh': 'ჟ', 't\'': 'ტ', 'p\'': 'ფ', 'k\'': 'ქ', 'gh': 'ღ',
  'sh': 'შ', 'ch': 'ჩ', 'ch\'': 'ჭ', 'ts': 'ც', 'ts\'': 'წ',
  'dz': 'ძ', 'kh': 'ხ'
};

// Armenian typing table
const ARMENIAN_KEY_MAP: Record<string, string> = {
  'a': 'ա', 'A': 'Ա', 'b': 'բ', 'B': 'Բ', 'g': 'գ', 'G': 'Գ',
  'd': 'դ', 'D': 'Դ', 'e': 'ե', 'E': 'Ե', 'z': 'զ', 'Z': 'Զ',
  'y': 'ը', 'Y': 'Ը', 'i': 'ի', 'I': 'Ի', 'l': 'լ', 'L': 'Լ',
  'k': 'կ', 'K': 'Կ', 'h': 'հ', 'H': 'Հ', 'm': 'մ', 'M': 'Մ',
  'n': 'ն', 'N': 'Ն', 'o': 'ո', 'O': 'Ո', 'p': 'պ', 'P': 'Պ',
  'r': 'ռ', 'R': 'Ռ', 's': 'ս', 'S': 'Ս', 'v': 'վ', 'V': 'Վ',
  't': 'տ', 'T': 'Տ', 'u': 'ւ', 'U': 'Ւ', 'f': 'ֆ', 'F': 'Ֆ'
};

const ARMENIAN_MULTI_COMBOS: Record<string, string> = {
  "e'": 'է', "E'": 'Է', "t'": 'թ', "T'": 'Թ', 'zh': 'ժ', 'ZH': 'Ժ',
  'kh': 'խ', 'KH': 'Խ', 'ts': 'ծ', 'TS': 'Ծ', 'dz': 'ձ', 'DZ': 'Ձ',
  'gh': 'ղ', 'GH': 'Ղ', 'ch': 'ճ', 'CH': 'Ճ', 'sh': 'շ', 'SH': 'Շ',
  "ch'": 'չ', "CH'": 'Չ', 'ch`': 'չ', 'ts`': 'ց', "ts'": 'ց',
  "p'": 'փ', "P'": 'Փ', "k'": 'ք', "K'": 'Ք', "o'": 'օ', "O'": 'Օ'
};

// Japanese Dakuten and Handakuten lookup
const JAPANESE_DAKUTEN_MAP: Record<string, string> = {
  'か': 'が', 'き': 'ぎ', 'く': 'ぐ', 'け': 'げ', 'こ': 'ご',
  'さ': 'ざ', 'し': 'じ', 'す': 'ず', 'せ': 'ぜ', 'そ': 'ぞ',
  'た': 'だ', 'ち': 'ぢ', 'つ': 'づ', 'て': 'で', 'と': 'ど',
  'は': 'ば', 'ひ': 'び', 'ふ': 'ぶ', 'へ': 'べ', 'ほ': 'ぼ',
  'カ': 'ガ', 'キ': 'ギ', 'ク': 'グ', 'ケ': 'ゲ', 'コ': 'ゴ',
  'サ': 'ザ', 'シ': 'ジ', 'ス': 'ズ', 'セ': 'ゼ', 'ソ': 'ゾ',
  'タ': 'ダ', 'チ': 'ヂ', 'ツ': 'ヅ', 'テ': 'デ', 'ト': 'ド',
  'ハ': 'バ', 'ヒ': 'ビ', 'フ': 'ブ', 'ヘ': 'ベ', 'ホ': 'ボ',
  'ウ': 'ヴ', 'う': 'ゔ'
};

const JAPANESE_HANDAKUTEN_MAP: Record<string, string> = {
  'は': 'ぱ', 'ひ': 'ぴ', 'ふ': 'ぷ', 'へ': 'ぺ', 'ほ': 'ぽ',
  'ハ': 'パ', 'ヒ': 'ピ', 'フ': 'プ', 'ヘ': 'ペ', 'ホ': 'ポ'
};

/**
 * Main Keystroke Processing Function
 * Resolves physical keystroke taking into account physical keyboard layout (QWERTY, AZERTY, QWERTZ),
 * phonetic mode multi-character context, and Hangul syllable composition.
 */
export function processPhysicalKeyStroke(
  key: string,
  code: string,
  isShift: boolean,
  isAltGr: boolean,
  text: string,
  cursorStart: number,
  cursorEnd: number,
  keyboard: KeyboardLayout,
  phoneticMode: boolean,
  physicalLayout: 'qwerty' | 'azerty' | 'qwertz' = 'qwerty'
): {
  newText: string;
  newCursor: number;
  handled: boolean;
  insertedChar: string;
} {
  // If control / navigation keys, let browser handle
  if (key === 'Backspace' || key === 'Delete' || key === 'Tab' || key === 'Enter' || key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown' || key === 'Home' || key === 'End') {
    return { newText: text, newCursor: cursorStart, handled: false, insertedChar: '' };
  }

  // Handle Space
  if (key === ' ') {
    if (keyboard.id === 'morse') {
      const inserted = ' / ';
      const newText = text.substring(0, cursorStart) + inserted + text.substring(cursorEnd);
      return { newText, newCursor: cursorStart + inserted.length, handled: true, insertedChar: inserted };
    }
    const newText = text.substring(0, cursorStart) + ' ' + text.substring(cursorEnd);
    return { newText, newCursor: cursorStart + 1, handled: true, insertedChar: ' ' };
  }

  // Handle Korean Hangul specifically (2-Bolsik composition)
  if (keyboard.id === 'korean-hangul') {
    let effectiveKey = key;
    // Adapt for physical layout (e.g. on AZERTY, 'a' key corresponds to 'q' in 2-Bolsik)
    if (physicalLayout === 'azerty') {
      if (code === 'KeyQ') effectiveKey = isShift ? 'A' : 'a';
      else if (code === 'KeyA') effectiveKey = isShift ? 'Q' : 'q';
      else if (code === 'KeyW') effectiveKey = isShift ? 'Z' : 'z';
      else if (code === 'KeyZ') effectiveKey = isShift ? 'W' : 'w';
    }
    const rawJamo = KOREAN_2BOLSIK_MAP[effectiveKey] || KOREAN_2BOLSIK_MAP[effectiveKey.toLowerCase()];
    if (rawJamo) {
      if (cursorStart === cursorEnd && cursorStart > 0) {
        const prevChar = text[cursorStart - 1];
        const composed = composeHangul(prevChar, rawJamo);
        if (composed.length === 1 && composed !== prevChar) {
          const newText = text.substring(0, cursorStart - 1) + composed + text.substring(cursorEnd);
          return { newText, newCursor: cursorStart, handled: true, insertedChar: composed };
        }
      }
      const newText = text.substring(0, cursorStart) + rawJamo + text.substring(cursorEnd);
      return { newText, newCursor: cursorStart + rawJamo.length, handled: true, insertedChar: rawJamo };
    }
  }

  // Handle Japanese Romaji Phonetic Engine specifically
  if ((keyboard.id.includes('japanese') || keyboard.id === 'hiragana') && phoneticMode) {
    const isDakutenKey = key === '"' || key === '゛' || key === "'";
    const isHandakutenKey = key === '°' || key === '゜' || key === '*';

    if (cursorStart === cursorEnd && cursorStart > 0) {
      const prevChar = text.substring(cursorStart - 1, cursorStart);
      const twoCharsBefore = text.substring(Math.max(0, cursorStart - 2), cursorStart);
      const threeCharsBefore = text.substring(Math.max(0, cursorStart - 3), cursorStart);

      // Dakuten / Handakuten modifier
      if (isDakutenKey && JAPANESE_DAKUTEN_MAP[prevChar]) {
        const voiced = JAPANESE_DAKUTEN_MAP[prevChar];
        const newText = text.substring(0, cursorStart - 1) + voiced + text.substring(cursorEnd);
        return { newText, newCursor: cursorStart, handled: true, insertedChar: voiced };
      }
      if (isHandakutenKey && JAPANESE_HANDAKUTEN_MAP[prevChar]) {
        const semivoiced = JAPANESE_HANDAKUTEN_MAP[prevChar];
        const newText = text.substring(0, cursorStart - 1) + semivoiced + text.substring(cursorEnd);
        return { newText, newCursor: cursorStart, handled: true, insertedChar: semivoiced };
      }

      // 1. 3-char Romaji prefix + key (e.g. shya -> しゃ, chyu -> ちゅ, etc.)
      if (threeCharsBefore.length === 3) {
        const test4 = (threeCharsBefore + key).toLowerCase();
        const converted4 = transliterateText(test4, 'japanese-hiragana');
        if (converted4 && converted4 !== test4) {
          const newText = text.substring(0, cursorStart - 3) + converted4 + text.substring(cursorEnd);
          return { newText, newCursor: cursorStart - 3 + converted4.length, handled: true, insertedChar: converted4 };
        }
      }

      // 2. 2-char Romaji prefix + key (e.g. kya -> きゃ, sho -> しょ, tsu -> つ, etc.)
      if (twoCharsBefore.length === 2) {
        const test3 = (twoCharsBefore + key).toLowerCase();
        const converted3 = transliterateText(test3, 'japanese-hiragana');
        if (converted3 && converted3 !== test3) {
          const newText = text.substring(0, cursorStart - 2) + converted3 + text.substring(cursorEnd);
          return { newText, newCursor: cursorStart - 2 + converted3.length, handled: true, insertedChar: converted3 };
        }
      }

      // 3. 1-char Romaji prefix + key (e.g. ka -> か, sa -> さ, etc.)
      const test2 = (prevChar + key).toLowerCase();
      const converted2 = transliterateText(test2, 'japanese-hiragana');
      if (converted2 && converted2 !== test2) {
        const newText = text.substring(0, cursorStart - 1) + converted2 + text.substring(cursorEnd);
        return { newText, newCursor: cursorStart - 1 + converted2.length, handled: true, insertedChar: converted2 };
      }

      // 4. Double consonant -> Sokuon っ (e.g. kk -> っk, tt -> っt, ss -> っs, pp -> っp)
      if (
        prevChar.toLowerCase() === key.toLowerCase() &&
        'bcdfghjklmpqrstvwxyz'.includes(key.toLowerCase()) &&
        key.toLowerCase() !== 'n'
      ) {
        const sokuonReplacement = 'っ' + key.toLowerCase();
        const newText = text.substring(0, cursorStart - 1) + sokuonReplacement + text.substring(cursorEnd);
        return { newText, newCursor: cursorStart - 1 + sokuonReplacement.length, handled: true, insertedChar: sokuonReplacement };
      }

      // 5. 'n' before another consonant -> ん + consonant (e.g. n + k -> んk)
      if (
        prevChar.toLowerCase() === 'n' &&
        'bcdfghjklmpqrstvwxyz'.includes(key.toLowerCase())
      ) {
        const nReplacement = 'ん' + key.toLowerCase();
        const newText = text.substring(0, cursorStart - 1) + nReplacement + text.substring(cursorEnd);
        return { newText, newCursor: cursorStart - 1 + nReplacement.length, handled: true, insertedChar: nReplacement };
      }
    }

    // Direct single vowel or symbol conversion in Japanese
    const singleTranslit = transliterateText(key.toLowerCase(), 'japanese-hiragana');
    if (singleTranslit && singleTranslit !== key.toLowerCase()) {
      const newText = text.substring(0, cursorStart) + singleTranslit + text.substring(cursorEnd);
      return { newText, newCursor: cursorStart + singleTranslit.length, handled: true, insertedChar: singleTranslit };
    }

    // If consonant was typed, insert it as Latin char so next keystroke completes syllable
    if ('bcdfghjklmnpqrstvwxyz'.includes(key.toLowerCase())) {
      const lowerKey = key.toLowerCase();
      const newText = text.substring(0, cursorStart) + lowerKey + text.substring(cursorEnd);
      return { newText, newCursor: cursorStart + lowerKey.length, handled: true, insertedChar: lowerKey };
    }
  }

  // Multi-character contextual combinations check (e.g. s' -> ش, kh -> خ, th -> θ, zh -> ж, etc.)
  if (phoneticMode && keyboard.hasPhoneticMode && cursorStart === cursorEnd && cursorStart > 0) {
    const prevChar = text.substring(cursorStart - 1, cursorStart);
    const twoCharsBefore = text.substring(Math.max(0, cursorStart - 2), cursorStart);
    const threeCharsBefore = text.substring(Math.max(0, cursorStart - 3), cursorStart);

    // 1. Check 3-char prefix + key (e.g. shch -> щ)
    if (threeCharsBefore.length === 3) {
      const test4 = threeCharsBefore + key;
      const converted4 = transliterateText(test4, keyboard.id);
      if (converted4 && converted4 !== test4) {
        const newText = text.substring(0, cursorStart - 3) + converted4 + text.substring(cursorEnd);
        return { newText, newCursor: cursorStart - 3 + converted4.length, handled: true, insertedChar: converted4 };
      }
    }

    // 2. Check 2-char prefix + key
    if (twoCharsBefore.length === 2) {
      const test3 = twoCharsBefore + key;
      const converted3 = transliterateText(test3, keyboard.id);
      if (converted3 && converted3 !== test3) {
        const newText = text.substring(0, cursorStart - 2) + converted3 + text.substring(cursorEnd);
        return { newText, newCursor: cursorStart - 2 + converted3.length, handled: true, insertedChar: converted3 };
      }
    }

    // 3. Check 1-char prefix + key (e.g. s + ' -> ش, H + ' -> خ, z + h -> ж, t + h -> θ)
    const test2 = prevChar + key;
    let comboMatch: string | undefined;

    if (keyboard.id.includes('arabic')) {
      comboMatch = ARABIC_MULTI_COMBOS[test2];
    } else if (keyboard.id === 'persian') {
      comboMatch = PERSIAN_MULTI_COMBOS[test2];
    } else if (keyboard.id === 'urdu') {
      comboMatch = URDU_MULTI_COMBOS[test2];
    } else if (keyboard.id.includes('russian') || keyboard.id.includes('cyrillic') || keyboard.id === 'ukrainian' || keyboard.id === 'serbian') {
      comboMatch = RUSSIAN_MULTI_COMBOS[test2];
    } else if (keyboard.id.includes('greek')) {
      comboMatch = GREEK_MULTI_COMBOS[test2];
    } else if (keyboard.id.includes('hebrew')) {
      comboMatch = HEBREW_MULTI_COMBOS[test2];
    } else if (keyboard.id === 'georgian') {
      comboMatch = GEORGIAN_MULTI_COMBOS[test2];
    } else if (keyboard.id === 'armenian') {
      comboMatch = ARMENIAN_MULTI_COMBOS[test2];
    }

    if (!comboMatch) {
      const converted2 = transliterateText(test2, keyboard.id);
      if (converted2 && converted2 !== test2) {
        comboMatch = converted2;
      }
    }

    if (comboMatch) {
      const newText = text.substring(0, cursorStart - 1) + comboMatch + text.substring(cursorEnd);
      return { newText, newCursor: cursorStart - 1 + comboMatch.length, handled: true, insertedChar: comboMatch };
    }
  }

  // Single-key lookup resolution
  let mappedChar: string | null = null;

  // --- 1. HARDWARE KEYBOARD MODE (Default when phoneticMode is false) ---
  if (!phoneticMode) {
    // A. Direct Hardware KeyCode matching in target keyboard layout rows (Single Source of Truth)
    if (keyboard.rows) {
      for (const row of keyboard.rows) {
        for (const item of row) {
          if (item.code === code) {
            if (isAltGr && item.altChar) {
              mappedChar = item.altChar;
            } else if (isShift && item.shiftChar) {
              mappedChar = item.shiftChar;
            } else {
              mappedChar = item.char;
            }
            break;
          }
        }
        if (mappedChar) break;
      }
    }

    // B. Fallback search through rows by char or latinGuide
    if (!mappedChar && keyboard.rows) {
      for (const row of keyboard.rows) {
        for (const item of row) {
          if (item.latinGuide === key || item.char === key) {
            mappedChar = isShift && item.shiftChar ? item.shiftChar : item.char;
            break;
          }
        }
        if (mappedChar) break;
      }
    }
  } else {
    // --- 2. PHONETIC TRANSLITERATION MODE ---
    // A. Language-specific dedicated phonetic dictionary
    if (keyboard.hasPhoneticMode) {
      if (keyboard.id.includes('arabic') && ARABIC_KEY_MAP[key]) {
        mappedChar = ARABIC_KEY_MAP[key];
      } else if ((keyboard.id.includes('russian') || keyboard.id.includes('cyrillic') || keyboard.id === 'ukrainian') && RUSSIAN_KEY_MAP[key]) {
        mappedChar = RUSSIAN_KEY_MAP[key];
      } else if (keyboard.id.includes('greek') && GREEK_KEY_MAP[key]) {
        mappedChar = GREEK_KEY_MAP[key];
      } else if (keyboard.id.includes('hebrew') && HEBREW_KEY_MAP[key]) {
        mappedChar = HEBREW_KEY_MAP[key];
      } else if (keyboard.id === 'georgian' && GEORGIAN_KEY_MAP[key]) {
        mappedChar = GEORGIAN_KEY_MAP[key];
      } else if (keyboard.id === 'armenian' && ARMENIAN_KEY_MAP[key]) {
        mappedChar = ARMENIAN_KEY_MAP[key];
      } else {
        const translit = transliterateText(key, keyboard.id);
        if (translit && translit !== key) {
          mappedChar = translit;
        }
      }
    }

    // B. Fallback search through rows by Latin Guide or key
    if (!mappedChar && keyboard.rows) {
      for (const row of keyboard.rows) {
        for (const item of row) {
          if (item.latinGuide === key || (item.latinGuide && item.latinGuide.toLowerCase() === key.toLowerCase())) {
            mappedChar = isShift && item.shiftChar ? item.shiftChar : item.char;
            break;
          }
        }
        if (mappedChar) break;
      }
    }
  }

  // If a mapping was found for the chosen language
  if (mappedChar) {
    const newText = text.substring(0, cursorStart) + mappedChar + text.substring(cursorEnd);
    return {
      newText,
      newCursor: cursorStart + mappedChar.length,
      handled: true,
      insertedChar: mappedChar
    };
  }

  // If no mapping found, pass key
  return {
    newText: text.substring(0, cursorStart) + key + text.substring(cursorEnd),
    newCursor: cursorStart + key.length,
    handled: true,
    insertedChar: key
  };
}
