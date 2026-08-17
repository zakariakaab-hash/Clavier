// Universal Phonetic and Script Transliteration Engine for Real-Time Multilingual Typing

export interface TransliterationEngine {
  id: string;
  name: string;
  rules: [string, string][]; // [latin_pattern, script_char]
}

// Arabic transliteration rules (Arabizi / Buckwalter / Phonetic)
const ARABIC_RULES: [string, string][] = [
  ["s'", 'ش'], ['sh', 'ش'], ['SH', 'ش'],
  ["H'", 'خ'], ["h'", 'خ'], ['kh', 'خ'], ['KH', 'خ'],
  ["t'", 'ث'], ['th', 'ث'], ['TH', 'ث'],
  ["g'", 'غ'], ['gh', 'غ'], ['GH', 'غ'],
  ["d'", 'ذ'], ['dh', 'ذ'], ['DH', 'ذ'],
  ['aa', 'آ'], ['a=', 'آ'],
  ['a>', 'أ'], ['i=', 'إ'], ['u=', 'ؤ'], ['y=', 'ئ'], ['t=', 'ة'], ['a_', 'ى'],
  ['ee', 'ي'], ['oo', 'و'], ['ou', 'و'],
  ['a', 'ا'], ['b', 'ب'], ['t', 'ت'], ['j', 'ج'], ['H', 'ح'], ['Ḥ', 'ح'], ['7', 'ح'],
  ['d', 'د'], ['r', 'ر'], ['z', 'ز'], ['s', 'س'], ['S', 'ص'],
  ['D', 'ض'], ['T', 'ط'], ['Z', 'ظ'], ['3', 'ع'], ['E', 'ع'], ['g', 'ع'],
  ['f', 'ف'], ['q', 'ق'], ['k', 'ك'], ['l', 'ل'], ['m', 'م'],
  ['n', 'ن'], ['h', 'ه'], ['w', 'و'], ['y', 'ي'], ['p', 'پ'],
  ['v', 'ڤ'], ['2', 'ء'],
  ['?', '؟'], [',', '،'], [';', '؛']
];

// Persian / Farsi Phonetic rules (Distinct from Arabic: پ, چ, ژ, گ, ی, ک)
const PERSIAN_RULES: [string, string][] = [
  ['kh', 'خ'], ['KH', 'خ'], ['gh', 'غ'], ['GH', 'غ'],
  ['sh', 'ش'], ['SH', 'ش'], ['zh', 'ژ'], ['ZH', 'ژ'],
  ['ch', 'چ'], ['CH', 'چ'], ['aa', 'آ'], ['a=', 'آ'],
  ['a', 'ا'], ['b', 'ب'], ['p', 'پ'], ['t', 'ت'], ['s', 'س'],
  ['j', 'ج'], ['c', 'چ'], ['h', 'ه'], ['H', 'ح'], ['d', 'د'],
  ['z', 'ز'], ['r', 'ر'], ['S', 'ص'], ['D', 'ض'], ['T', 'ط'],
  ['Z', 'ظ'], ['3', 'ع'], ['f', 'ف'], ['q', 'ق'], ['k', 'ک'],
  ['g', 'گ'], ['l', 'ل'], ['m', 'م'], ['n', 'ن'], ['v', 'و'],
  ['w', 'و'], ['u', 'و'], ['o', 'و'], ['y', 'ی'], ['i', 'ی'],
  ['e', 'ه'], ['2', 'ء'], ['?', '؟'], [',', '،'], [';', '؛']
];

// Urdu Phonetic rules (Distinct with retroflex characters ٹ, ڈ, ڑ, noon ghunna ں, do-chashmi he ھ)
const URDU_RULES: [string, string][] = [
  ['kh', 'خ'], ['KH', 'خ'], ['gh', 'غ'], ['GH', 'غ'],
  ['sh', 'ش'], ['SH', 'ش'], ['zh', 'ژ'], ['ZH', 'ژ'],
  ['ch', 'چ'], ['CH', 'چ'], ['jh', 'جھ'], ['th', 'تھ'],
  ['TH', 'ٹ'], ['Th', 'ٹ'], ["t'", 'ٹ'], ['T', 'ٹ'],
  ['Dh', 'ڈ'], ["d'", 'ڈ'], ['D', 'ڈ'], ['dh', 'دھ'],
  ['Rh', 'ڑ'], ["r'", 'ڑ'], ['R', 'ڑ'], ['rh', 'ڑھ'],
  ['bh', 'بھ'], ['ph', 'پھ'], ['kh', 'کھ'], ['gh', 'گھ'],
  ['aa', 'آ'], ['a=', 'آ'], ['ee', 'ی'], ['oo', 'و'],
  ['N', 'ں'], ['n~', 'ں'], ['h_', 'ھ'],
  ['a', 'ا'], ['b', 'ب'], ['p', 'پ'], ['t', 'ت'], ['s', 'س'],
  ['j', 'ج'], ['c', 'چ'], ['H', 'ح'], ['h', 'ہ'], ['d', 'د'],
  ['z', 'ز'], ['r', 'ر'], ['S', 'ص'], ['D', 'ض'], ['T', 'ط'],
  ['Z', 'ظ'], ['3', 'ع'], ['f', 'ف'], ['q', 'ق'], ['k', 'ک'],
  ['g', 'گ'], ['l', 'ل'], ['m', 'م'], ['n', 'ن'], ['w', 'و'],
  ['v', 'و'], ['y', 'ی'], ['Y', 'ے'], ['e', 'ے'], ['2', 'ء'],
  ['?', '؟'], [',', '،'], [';', '؛'], ['.', '۔']
];

// Esperanto X-system & H-system rules
const ESPERANTO_RULES: [string, string][] = [
  ['cx', 'ĉ'], ['CX', 'Ĉ'], ['Cx', 'Ĉ'], ['ch', 'ĉ'], ['CH', 'Ĉ'], ['Ch', 'Ĉ'],
  ['gx', 'ĝ'], ['GX', 'Ĝ'], ['Gx', 'Ĝ'], ['gh', 'ĝ'], ['GH', 'Ĝ'], ['Gh', 'Ĝ'],
  ['hx', 'ĥ'], ['HX', 'Ĥ'], ['Hx', 'Ĥ'], ['hh', 'ĥ'], ['HH', 'Ĥ'], ['Hh', 'Ĥ'],
  ['jx', 'ĵ'], ['JX', 'Ĵ'], ['Jx', 'Ĵ'], ['jh', 'ĵ'], ['JH', 'Ĵ'], ['Jh', 'Ĵ'],
  ['sx', 'ŝ'], ['SX', 'Ŝ'], ['Sx', 'Ŝ'], ['sh', 'ŝ'], ['SH', 'Ŝ'], ['Sh', 'Ŝ'],
  ['ux', 'ŭ'], ['UX', 'Ŭ'], ['Ux', 'Ŭ'], ['u~', 'ŭ'], ['U~', 'Ŭ']
];

// Russian / Cyrillic Phonetic rules
const RUSSIAN_RULES: [string, string][] = [
  ['shch', 'щ'], ['SHCH', 'Щ'],
  ['yo', 'ё'], ['YO', 'Ё'], ['Yo', 'Ё'],
  ['zh', 'ж'], ['ZH', 'Ж'], ['Zh', 'Ж'],
  ['ch', 'ч'], ['CH', 'Ч'], ['Ch', 'Ч'],
  ['sh', 'ш'], ['SH', 'Ш'], ['Sh', 'Ш'],
  ['yu', 'ю'], ['YU', 'Ю'], ['Yu', 'Ю'],
  ['ya', 'я'], ['YA', 'Я'], ['Ya', 'Я'],
  ['kh', 'х'], ['KH', 'Х'], ['Kh', 'Х'],
  ['ts', 'ц'], ['TS', 'Ц'], ['Ts', 'Ц'],
  ['je', 'э'], ['JE', 'Э'], ['Je', 'Э'],
  ['a', 'а'], ['A', 'А'], ['b', 'б'], ['B', 'Б'], ['v', 'в'], ['V', 'В'],
  ['w', 'в'], ['W', 'В'], ['g', 'г'], ['G', 'Г'], ['d', 'д'], ['D', 'Д'],
  ['e', 'е'], ['E', 'Е'], ['z', 'з'], ['Z', 'З'], ['i', 'и'], ['I', 'И'],
  ['j', 'й'], ['J', 'Й'], ['k', 'к'], ['K', 'К'], ['l', 'л'], ['L', 'Л'],
  ['m', 'м'], ['M', 'М'], ['n', 'н'], ['N', 'Н'], ['o', 'о'], ['O', 'О'],
  ['p', 'п'], ['P', 'П'], ['r', 'р'], ['R', 'Р'], ['s', 'с'], ['S', 'С'],
  ['t', 'т'], ['T', 'Т'], ['u', 'у'], ['U', 'У'], ['f', 'ф'], ['F', 'Ф'],
  ['h', 'х'], ['H', 'Х'], ['c', 'ц'], ['C', 'Ц'], ['y', 'ы'], ['Y', 'Ы'],
  ['#', 'ъ'], ["'", 'ь']
];

// Greek Classical / Modern phonetic rules
const GREEK_RULES: [string, string][] = [
  ['th', 'θ'], ['TH', 'Θ'], ['Th', 'Θ'],
  ['ph', 'φ'], ['PH', 'Φ'], ['Ph', 'Φ'],
  ['ch', 'χ'], ['CH', 'Χ'], ['Ch', 'Χ'],
  ['ps', 'ψ'], ['PS', 'Ψ'], ['Ps', 'Ψ'],
  ['a', 'α'], ['A', 'Α'], ['b', 'β'], ['B', 'Β'], ['g', 'γ'], ['G', 'Γ'],
  ['d', 'δ'], ['D', 'Δ'], ['e', 'ε'], ['E', 'Ε'], ['z', 'ζ'], ['Z', 'Ζ'],
  ['h', 'η'], ['H', 'Η'], ['i', 'ι'], ['I', 'Ι'], ['k', 'κ'], ['K', 'Κ'],
  ['l', 'λ'], ['L', 'Λ'], ['m', 'μ'], ['M', 'Μ'], ['n', 'ν'], ['N', 'Ν'],
  ['x', 'ξ'], ['X', 'Ξ'], ['o', 'ο'], ['O', 'Ο'], ['p', 'π'], ['P', 'Π'],
  ['r', 'ρ'], ['R', 'Ρ'], ['s', 'σ'], ['S', 'Σ'], ['t', 'τ'], ['T', 'Τ'],
  ['u', 'υ'], ['U', 'Υ'], ['y', 'υ'], ['Y', 'Υ'], ['f', 'φ'], ['F', 'Φ'],
  ['w', 'ω'], ['W', 'Ω'], ['q', 'θ'], ['Q', 'Θ'],
  ['?', ';'], [';', '·']
];

// Hebrew phonetic rules
const HEBREW_RULES: [string, string][] = [
  ['sh', 'ש'], ['SH', 'ש'], ['kh', 'ח'], ['KH', 'ח'],
  ['ts', 'צ'], ['TS', 'צ'], ['ch', 'ח'], ['CH', 'ח'],
  ['th', 'ת'], ['TH', 'ת'],
  ['a', 'א'], ['b', 'ב'], ['v', 'ב'], ['g', 'ג'], ['d', 'ד'],
  ['h', 'ה'], ['w', 'ו'], ['u', 'ו'], ['o', 'ו'], ['z', 'ז'],
  ['x', 'ח'], ['H', 'ח'], ['t', 'ת'], ['y', 'י'], ['i', 'י'],
  ['k', 'כ'], ['l', 'ל'], ['m', 'מ'], ['n', 'נ'], ['s', 'ס'],
  ['e', 'ע'], ['p', 'פ'], ['f', 'פ'], ['c', 'צ'], ['q', 'ק'],
  ['r', 'ר']
];

// Hindi / Devanagari ITRANS phonetic rules (Handles syllables, conjuncts like 'namaste', and letters)
const HINDI_RULES: [string, string][] = [
  // Full common phrases & multi-consonants
  ['namaste', 'नमस्ते'], ['namaskar', 'नमस्कार'], ['dhanyavaad', 'धन्यवाद'],
  ['ksha', 'क्ष'], ['gya', 'ज्ञ'], ['tra', 'त्र'], ['shra', 'श्र'],
  ['ksh', 'क्ष्'], ['gy', 'ज्ञ्'], ['tr', 'त्र्'], ['shr', 'श्र्'],
  ['chh', 'छ'], ['Chh', 'छ'],
  ['kh', 'ख'], ['gh', 'घ'], ['ch', 'च'], ['jh', 'झ'],
  ['th', 'थ'], ['dh', 'ध'], ['ph', 'फ'], ['bh', 'भ'],
  ['sh', 'श'], ['Sh', 'ष'], ['shh', 'ष'],
  ['Th', 'ठ'], ['Dh', 'ढ'], ['Rh', 'ढ़'],
  ['aa', 'आ'], ['ee', 'ई'], ['ii', 'ई'], ['oo', 'ऊ'], ['uu', 'ऊ'],
  ['ai', 'ऐ'], ['au', 'औ'], ['ri', 'ऋ'],
  ['a', 'अ'], ['i', 'इ'], ['u', 'उ'], ['e', 'ए'], ['o', 'ओ'],
  ['k', 'क'], ['g', 'ग'], ['c', 'च'], ['j', 'ज'], ['t', 'त'],
  ['d', 'द'], ['n', 'न'], ['p', 'प'], ['b', 'ब'], ['m', 'म'],
  ['y', 'य'], ['r', 'र'], ['l', 'ल'], ['v', 'व'], ['w', 'व'],
  ['s', 'स'], ['h', 'ह'], ['T', 'ट'], ['D', 'ड'], ['N', 'ण'],
  ['.', '।'], ['..', '॥']
];

// Japanese Romaji to Hiragana rules
const HIRAGANA_RULES: [string, string][] = [
  ['kya', 'きゃ'], ['kyu', 'きゅ'], ['kyo', 'きょ'],
  ['sha', 'しゃ'], ['shu', 'しゅ'], ['sho', 'しょ'], ['sya', 'しゃ'], ['syu', 'しゅ'], ['syo', 'しょ'],
  ['cha', 'ちゃ'], ['chu', 'ちゅ'], ['cho', 'ちょ'], ['tya', 'ちゃ'], ['tyu', 'ちゅ'], ['tyo', 'ちょ'], ['cya', 'ちゃ'], ['cyu', 'ちゅ'], ['cyo', 'ちょ'],
  ['nya', 'にゃ'], ['nyu', 'にゅ'], ['nyo', 'にょ'],
  ['hya', 'ひゃ'], ['hyu', 'ひゅ'], ['hyo', 'ひょ'],
  ['mya', 'みゃ'], ['myu', 'みゅ'], ['myo', 'みょ'],
  ['rya', 'りゃ'], ['ryu', 'りゅ'], ['ryo', 'りょ'],
  ['gya', 'ぎゃ'], ['gyu', 'ぎゅ'], ['gyo', 'ぎょ'],
  ['jya', 'じゃ'], ['jyu', 'じゅ'], ['jyo', 'じょ'], ['ja', 'じゃ'], ['ju', 'じゅ'], ['jo', 'じょ'],
  ['zya', 'じゃ'], ['zyu', 'じゅ'], ['zyo', 'じょ'],
  ['bya', 'びゃ'], ['byu', 'びゅ'], ['byo', 'びょ'],
  ['pya', 'ぴゃ'], ['pyu', 'ぴゅ'], ['pyo', 'ぴょ'],
  ['ka', 'か'], ['ki', 'き'], ['ku', 'く'], ['ke', 'け'], ['ko', 'こ'],
  ['sa', 'さ'], ['shi', 'し'], ['si', 'し'], ['su', 'す'], ['se', 'せ'], ['so', 'そ'],
  ['ta', 'た'], ['chi', 'ち'], ['ti', 'ち'], ['tsu', 'つ'], ['tu', 'つ'], ['te', 'て'], ['to', 'と'],
  ['na', 'な'], ['ni', 'に'], ['nu', 'ぬ'], ['ne', 'ね'], ['no', 'の'],
  ['ha', 'は'], ['hi', 'ひ'], ['fu', 'ふ'], ['hu', 'ふ'], ['he', 'へ'], ['ho', 'ほ'],
  ['ma', 'ま'], ['mi', 'み'], ['mu', 'む'], ['me', 'め'], ['mo', 'も'],
  ['ya', 'や'], ['yu', 'ゆ'], ['yo', 'よ'],
  ['ra', 'ら'], ['ri', 'り'], ['ru', 'る'], ['re', 'れ'], ['ro', 'ろ'],
  ['wa', 'わ'], ['wo', 'を'], ['nn', 'ん'],
  ['ga', 'が'], ['gi', 'ぎ'], ['gu', 'ぐ'], ['ge', 'げ'], ['go', 'ご'],
  ['za', 'ざ'], ['ji', 'じ'], ['zi', 'じ'], ['zu', 'ず'], ['ze', 'ぜ'], ['zo', 'ぞ'],
  ['da', 'だ'], ['di', 'ぢ'], ['du', 'づ'], ['de', 'で'], ['do', 'ど'],
  ['ba', 'ば'], ['bi', 'び'], ['bu', 'ぶ'], ['be', 'べ'], ['bo', 'ぼ'],
  ['pa', 'ぱ'], ['pi', 'ぴ'], ['pu', 'ぷ'], ['pe', 'ぺ'], ['po', 'ぽ'],
  ['fa', 'ふぁ'], ['fi', 'ふぃ'], ['fe', 'ふぇ'], ['fo', 'ふぉ'],
  ['a', 'あ'], ['i', 'い'], ['u', 'う'], ['e', 'え'], ['o', 'お'],
  ['.', '。'], [',', '、'], ['-', 'ー'], ['?', '？'], ['!', '！']
];

// Georgian Mkhedruli rules
const GEORGIAN_RULES: [string, string][] = [
  ['zh', 'ჟ'], ['ZH', 'ჟ'], ['t\'', 'ტ'], ['p\'', 'ფ'], ['k\'', 'ქ'],
  ['gh', 'ღ'], ['GH', 'ღ'], ['sh', 'შ'], ['SH', 'შ'], ['ch', 'ჩ'],
  ['CH', 'ჩ'], ['ch\'', 'ჭ'], ['ts', 'ც'], ['TS', 'ც'], ['ts\'', 'წ'],
  ['dz', 'ძ'], ['DZ', 'ძ'], ['kh', 'ხ'], ['KH', 'ხ'],
  ['a', 'ა'], ['b', 'ბ'], ['g', 'გ'], ['d', 'დ'], ['e', 'ე'], ['v', 'ვ'],
  ['z', 'ზ'], ['t', 'თ'], ['T', 'ტ'], ['i', 'ი'], ['k', 'კ'], ['K', 'ქ'],
  ['l', 'ლ'], ['m', 'მ'], ['n', 'ნ'], ['o', 'ო'], ['p', 'პ'], ['P', 'ფ'],
  ['Z', 'ჟ'], ['r', 'რ'], ['s', 'ს'], ['S', 'შ'], ['u', 'უ'], ['G', 'ღ'],
  ['q', 'ყ'], ['Q', 'ყ'], ['C', 'ჩ'], ['W', 'ჭ'], ['c', 'ც'], ['w', 'წ'],
  ['j', 'ჯ'], ['J', 'ჯ'], ['h', 'ჰ'], ['H', 'ჰ'], ['x', 'ხ']
];

// Armenian rules
const ARMENIAN_RULES: [string, string][] = [
  ["e'", 'է'], ["E'", 'Է'], ["t'", 'թ'], ["T'", 'Թ'], ['zh', 'ժ'], ['ZH', 'Ժ'],
  ['kh', 'խ'], ['KH', 'Խ'], ['ts', 'ծ'], ['TS', 'Ծ'], ['dz', 'ձ'], ['DZ', 'Ձ'],
  ['gh', 'ղ'], ['GH', 'Ղ'], ['ch', 'ճ'], ['CH', 'Ճ'], ['sh', 'շ'], ['SH', 'Շ'],
  ["ch'", 'չ'], ["CH'", 'Չ'], ['ch`', 'չ'], ['ts`', 'ց'], ["ts'", 'ց'],
  ["p'", 'փ'], ["P'", 'Փ'], ["k'", 'ք'], ["K'", 'Ք'], ["o'", 'օ'], ["O'", 'Օ'],
  ['a', 'ա'], ['A', 'Ա'], ['b', 'բ'], ['B', 'Բ'], ['g', 'գ'], ['G', 'Գ'],
  ['d', 'դ'], ['D', 'Դ'], ['e', 'ե'], ['E', 'Ե'], ['z', 'զ'], ['Z', 'Զ'],
  ['y', 'ը'], ['Y', 'Ը'], ['i', 'ի'], ['I', 'Ի'], ['l', 'լ'], ['L', 'Լ'],
  ['k', 'կ'], ['K', 'Կ'], ['h', 'հ'], ['H', 'Հ'], ['m', 'մ'], ['M', 'Մ'],
  ['n', 'ն'], ['N', 'Ն'], ['o', 'ո'], ['O', 'Ո'], ['p', 'պ'], ['P', 'Պ'],
  ['r', 'ռ'], ['R', 'Ռ'], ['s', 'ս'], ['S', 'Ս'], ['v', 'վ'], ['V', 'Վ'],
  ['t', 'տ'], ['T', 'Տ'], ['u', 'ւ'], ['U', 'Ւ'], ['f', 'ֆ'], ['F', 'Ֆ']
];

// Tifinagh rules
const TIFINAGH_RULES: [string, string][] = [
  ['gh', 'ⵖ'], ['GH', 'ⵖ'], ['kh', 'ⵅ'], ['KH', 'ⵅ'],
  ['sh', 'ⵛ'], ['SH', 'ⵛ'], ['ch', 'ⵛ'], ['zh', 'ⵣ'],
  ['a', 'ⴰ'], ['b', 'ⴱ'], ['g', 'ⴳ'], ['d', 'ⴷ'], ['D', 'ⴹ'],
  ['e', 'ⴻ'], ['f', 'ⴼ'], ['k', 'ⴽ'], ['h', 'ⵀ'], ['H', 'ⵃ'],
  ['c', 'ⵛ'], ['x', 'ⵅ'], ['q', 'ⵇ'], ['i', 'ⵉ'], ['j', 'ⵊ'],
  ['l', 'ⵍ'], ['m', 'ⵎ'], ['n', 'ⵏ'], ['u', 'ⵓ'], ['w', 'ⵡ'],
  ['r', 'ⵔ'], ['R', 'ⵕ'], ['s', 'ⵙ'], ['S', 'ⵚ'], ['t', 'ⵜ'],
  ['T', 'ⵟ'], ['y', 'ⵢ'], ['z', 'ⵣ'], ['Z', 'ⵥ']
];

// Vietnamese Telex rules
export function convertVietnameseTelex(text: string): string {
  let res = text;
  // Base letter modifications
  res = res.replace(/aa/g, 'â').replace(/AA/g, 'Â')
           .replace(/aw/g, 'ă').replace(/AW/g, 'Ă')
           .replace(/ee/g, 'ê').replace(/EE/g, 'Ê')
           .replace(/oo/g, 'ô').replace(/OO/g, 'Ô')
           .replace(/ow/g, 'ơ').replace(/OW/g, 'Ơ')
           .replace(/uw/g, 'ư').replace(/UW/g, 'Ư')
           .replace(/dd/g, 'đ').replace(/DD/g, 'Đ');
  return res;
}

// Morse Code Dictionary
export const MORSE_CODE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  ' ': '/', '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--'
};

export const REVERSE_MORSE_MAP: Record<string, string> = Object.entries(MORSE_CODE_MAP).reduce(
  (acc, [char, morse]) => ({ ...acc, [morse]: char }),
  {}
);

// Braille Map (Grade 1 Standard)
export const BRAILLE_MAP: Record<string, string> = {
  'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓',
  'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏',
  'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
  'y': '⠽', 'z': '⠵', ' ': ' ',
  '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠉', '5': '⠼⠑',
  '6': '⠼⠋', '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚',
  ',': '⠂', ';': '⠆', ':': '⠒', '.': '⠲', '!': '⠖', '?': '⠦', '(': '⠶', ')': '⠶', '-': '⠤'
};

// Elder Futhark Runic transliteration
export const RUNES_MAP: Record<string, string> = {
  'th': 'ᚦ', 'ng': 'ᛜ',
  'f': 'ᚠ', 'u': 'ᚢ', 'v': 'ᚢ', 'a': 'ᚨ', 'r': 'ᚱ', 'k': 'ᚲ', 'c': 'ᚲ',
  'g': 'ᚷ', 'w': 'ᚹ', 'h': 'ᚺ', 'n': 'ᚾ', 'i': 'ᛁ', 'j': 'ᛃ', 'y': 'ᛃ',
  'p': 'ᛈ', 'z': 'ᛉ', 's': 'ᛊ', 't': 'ᛏ', 'b': 'ᛒ', 'e': 'ᛖ', 'm': 'ᛗ',
  'l': 'ᛚ', 'd': 'ᛞ', 'o': 'ᛟ', ' ': '᛫'
};

// Egyptian Hieroglyph uniliterals
export const HIEROGLYPH_MAP: Record<string, string> = {
  'kh': '𓐍', 'sh': '𓈙', 'th': '𓍿', 'dj': '𓆓',
  'a': '𓄿', 'i': '𓇋', 'y': '𓇌', 'u': '𓅱', 'w': '𓅱', 'b': '𓃀', 'p': '𓊪',
  'f': '𓆑', 'm': '𓅓', 'n': '𓈖', 'r': '𓂋', 'h': '𓉔', 'H': '𓎛',
  's': '𓋴', 'q': '𓈎', 'k': '𓎡', 'g': '𓎼', 't': '𓏏',
  'd': '𓂧', ' ': '  '
};

/**
 * Transliterate Latin buffer to target script rules
 */
export function transliterateText(input: string, keyboardId: string): string {
  if (!input) return '';

  let rules: [string, string][] = [];

  if (keyboardId.includes('arabic')) {
    rules = ARABIC_RULES;
  } else if (keyboardId === 'persian') {
    rules = PERSIAN_RULES;
  } else if (keyboardId === 'urdu') {
    rules = URDU_RULES;
  } else if (keyboardId === 'esperanto') {
    rules = ESPERANTO_RULES;
  } else if (keyboardId.includes('russian') || keyboardId.includes('cyrillic') || keyboardId === 'ukrainian' || keyboardId === 'serbian' || keyboardId === 'old-church-slavonic') {
    rules = RUSSIAN_RULES;
  } else if (keyboardId.includes('greek') || keyboardId === 'coptic') {
    rules = GREEK_RULES;
  } else if (keyboardId.includes('hebrew') || keyboardId === 'yiddish') {
    rules = HEBREW_RULES;
  } else if (keyboardId.includes('hindi') || keyboardId === 'sanskrit' || keyboardId === 'devanagari') {
    rules = HINDI_RULES;
  } else if (keyboardId.includes('japanese') || keyboardId === 'hiragana') {
    rules = HIRAGANA_RULES;
  } else if (keyboardId === 'georgian') {
    rules = GEORGIAN_RULES;
  } else if (keyboardId === 'armenian') {
    rules = ARMENIAN_RULES;
  } else if (keyboardId === 'tifinagh') {
    rules = TIFINAGH_RULES;
  } else if (keyboardId === 'vietnamese') {
    return convertVietnameseTelex(input);
  } else if (keyboardId === 'runes') {
    let out = input.toLowerCase();
    for (const [k, v] of Object.entries(RUNES_MAP).sort((a, b) => b[0].length - a[0].length)) {
      out = out.split(k).join(v);
    }
    return out;
  } else if (keyboardId === 'hieroglyphs') {
    let out = input;
    for (const [k, v] of Object.entries(HIEROGLYPH_MAP).sort((a, b) => b[0].length - a[0].length)) {
      out = out.split(k).join(v);
    }
    return out;
  } else if (keyboardId === 'morse') {
    return input.toUpperCase().split('').map(c => MORSE_CODE_MAP[c] || c).join(' ');
  } else if (keyboardId === 'braille') {
    return input.toLowerCase().split('').map(c => BRAILLE_MAP[c] || c).join('');
  }

  if (rules.length === 0) return input;

  // Apply multi-character rules first, then single-character rules
  const sortedRules = [...rules].sort((a, b) => b[0].length - a[0].length);
  let res = input;
  for (const [latin, script] of sortedRules) {
    res = res.split(latin).join(script);
  }
  return res;
}

/**
 * Strips all diacritics / combining marks from a string (NFD normalization)
 */
export function stripDiacritics(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export const removeDiacritics = stripDiacritics;

/**
 * Generates Unicode Code Points inspector data (U+XXXX, Hex, UTF-8, HTML Entity)
 */
export function inspectUnicode(str: string) {
  return Array.from(str).map(char => {
    const codePoint = char.codePointAt(0) || 0;
    const hex = codePoint.toString(16).toUpperCase().padStart(4, '0');
    return {
      char,
      codePoint: `U+${hex}`,
      decimal: codePoint,
      htmlEntity: `&#${codePoint};`,
      hexEntity: `&#x${hex};`,
      utf8Bytes: new TextEncoder().encode(char)
    };
  });
}
