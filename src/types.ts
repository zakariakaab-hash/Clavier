export type ScriptDirection = 'ltr' | 'rtl';

export type KeyboardCategory =
  | 'middle-eastern'
  | 'cyrillic'
  | 'greek'
  | 'european'
  | 'south-asian'
  | 'east-asian'
  | 'caucasian-african'
  | 'phonetic-ipa'
  | 'ancient-historical'
  | 'math-symbols';

export interface KeyCap {
  char: string;
  shiftChar?: string;
  altChar?: string;
  latinGuide?: string; // Original keyboard letter / Latin guide above the key (e.g. s', s, z, r, d', d)
  displayChar?: string; // Custom visual display (e.g. dotted circle diacritic ◌َ)
  label?: string; // friendly label like "Space", "Enter", "Tab"
  width?: 'normal' | 'wide' | 'wider' | 'extra-wide' | 'space';
  code?: string; // Physical KeyCode match e.g. "KeyQ", "Digit1"
  subText?: string;
  isSpecial?: boolean;
}

export type KeyDefinition = KeyCap;

export interface KeyboardLayout {
  id: string;
  name: string;
  nativeName: string;
  category: KeyboardCategory;
  region: string;
  direction: ScriptDirection;
  isoCode: string;
  flag?: string;
  description: string;
  fontFamilyClass?: string;
  defaultFontSize?: number;
  sampleText: string;
  hasPhoneticMode?: boolean;
  phoneticDescription?: string;
  instructions?: string;
  lexilogosRows?: KeyCap[][]; // Lexilogos classic layout with original keyboard letters above keys
  rows: KeyCap[][];
  shiftRows?: KeyCap[][];
  altGrRows?: KeyCap[][];
  diacritics?: string[];
  specialCharGroups?: { title: string; chars: string[] }[];
  alphabetGuide?: { char: string; name: string; ipa: string; translit: string }[];
  externalLinks?: {
    wikipediaLang?: string;
    wiktionaryLang?: string;
    lexilogosUrl?: string;
  };
  seoKeywords: string[];
}

export interface AIAnalysisResult {
  convertedText?: string;
  ipa?: string;
  romanization?: string;
  translation?: string;
  breakdown?: {
    token: string;
    pronunciation?: string;
    meaning?: string;
    notes?: string;
  }[];
  linguisticNotes?: string;
}

export interface AIEtymologyResult {
  word: string;
  script?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  meanings?: string[];
  etymology?: string;
  variants?: string[];
  historicalEvolution?: string;
}
