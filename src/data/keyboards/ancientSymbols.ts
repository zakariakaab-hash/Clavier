import { KeyboardLayout } from '../../types';

export const hieroglyphsKeyboard: KeyboardLayout = {
  id: 'hieroglyphs',
  name: 'Egyptian Hieroglyphs (Gardiner)',
  nativeName: '𓂋𓏤𓈖 𓂓𓅓𓏏𓊖 (Ancient Egyptian)',
  category: 'ancient-historical',
  region: 'Ancient Egypt (Pharaonic)',
  direction: 'ltr',
  isoCode: 'egy',
  flag: '𓂀',
  description: 'Ancient Egyptian Hieroglyphic script with uniliteral phonetic signs (Gardiner classification), determinatives, cartouche enclosures (𓊹, 𓇳, 𓊪, 𓏏...), and sacred symbols.',
  defaultFontSize: 26,
  sampleText: '𓇓𓅱𓏏𓊵𓏙 𓊹𓊹𓊹 𓎟𓇿𓇿 𓋹𓍑𓋴 𓇳𓏤 𓏠𓈖',
  hasPhoneticMode: true,
  phoneticDescription: 'Type in Latin: a=𓄿, i=𓇋, u=𓅱, b=𓃀, p=𓊪, f=𓆑, m=𓅓, n=𓈖, r=𓂋, h=𓉔, kh=𓐍, s=𓋴, sh=𓈙, q=𓈎, k=𓎡, g=𓎼, t=𓏏',
  specialCharGroups: [
    { title: 'Uniliterals (Phonetic Alphabet)', chars: ['𓄿', '𓇋', '𓇌', '𓂝', '𓅱', '𓃀', '𓊪', '𓆑', '𓅓', '𓈖', '𓂋', '𓉔', '𓎛', '𓐍', '𓄡', '𓊃', '𓋴', '𓈙', '𓈎', '𓎡', '𓎼', '𓏏', '𓍿', '𓂧', '𓆓'] },
    { title: 'Royal & Sacred Symbols', chars: ['𓋹' /* Ankh */, '𓍑' /* Djed */, '𓋴' /* Was */, '𓂀' /* Eye of Horus */, '𓊹' /* Neter/God */, '𓇳' /* Ra/Sun */, '𓈖' /* Water */, '𓏠' /* Men */, '𓇓' /* King */, '𓈞' /* Queen */, '𓍹' /* Open Cartouche */, '𓍺' /* Close Cartouche */] },
    { title: 'Deities, Humans & Animals', chars: ['𓀀', '𓀁', '𓁐', '𓃭', '𓅃', '𓆗', '𓆣', '𓆈', '𓅓', '𓃠', '𓃰', '𓃯'] }
  ],
  rows: [
    [
      { char: '𓄿', shiftChar: '𓀀', label: '3 (aleph)' },
      { char: '𓇋', shiftChar: '𓁐', label: 'i (yod)' },
      { char: '𓇌', shiftChar: '𓃭', label: 'y (double yod)' },
      { char: '𓂝', shiftChar: '𓅃', label: 'ꜥ (ayin)' },
      { char: '𓅱', shiftChar: '𓆗', label: 'w (quail chick)' },
      { char: '𓃀', shiftChar: '𓆣', label: 'b (foot)' },
      { char: '𓊪', shiftChar: '𓆈', label: 'p (stool)' },
      { char: '𓆑', shiftChar: '𓅓', label: 'f (horned viper)' },
      { char: '𓅓', shiftChar: '𓃠', label: 'm (owl)' },
      { char: '𓈖', shiftChar: '𓃰', label: 'n (water)' },
      { char: '𓂋', shiftChar: '𓃯', label: 'r (mouth)' },
      { char: '𓉔', shiftChar: '𓊹', label: 'h (courtyard)' },
    ],
    [
      { char: '𓎛', shiftChar: '𓇳', label: 'ḥ (wick)' },
      { char: '𓐍', shiftChar: '𓋹', label: 'ḫ (placenta)' },
      { char: '𓄡', shiftChar: '𓍑', label: 'ẖ (belly)' },
      { char: '𓊃', shiftChar: '𓋴', label: 'z (door bolt)' },
      { char: '𓋴', shiftChar: '𓂀', label: 's (folded cloth)' },
      { char: '𓈙', shiftChar: '𓇓', label: 'š (pool)' },
      { char: '𓈎', shiftChar: '𓈞', label: 'q (hill)' },
      { char: '𓎡', shiftChar: '𓍹', label: 'k (basket)' },
      { char: '𓎼', shiftChar: '𓍺', label: 'g (jar stand)' },
      { char: '𓏏', shiftChar: '𓏤', label: 't (loaf)' },
      { char: '𓍿', shiftChar: '𓏥', label: 'ṯ (tether)' },
      { char: '𓂧', shiftChar: '𓆓', label: 'd (hand)' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en',
    lexilogosUrl: 'https://www.lexilogos.com/clavier/hieroglyphes.htm'
  },
  seoKeywords: ['hieroglyphs keyboard', 'egyptian hieroglyphs online', 'clavier hieroglyphes', 'ancient egyptian typing', 'gardiner signs keyboard']
};

export const runesKeyboard: KeyboardLayout = {
  id: 'runes',
  name: 'Elder Futhark & Anglo-Saxon Runes',
  nativeName: 'ᚠᚢᚦᚨᚱᚲ (Runes)',
  category: 'ancient-historical',
  region: 'Ancient Scandinavia & Germanic Europe',
  direction: 'ltr',
  isoCode: 'non',
  flag: 'ᚱ',
  description: 'Elder Futhark, Younger Futhark, and Anglo-Saxon Futhorc runic alphabets with phonetic English-to-Runes transliteration.',
  defaultFontSize: 24,
  sampleText: 'ᚠᛖᚺᚢ ᚢᚱᚢᛉ ᚦᚢᚱᛁᛋᚨᛉ ᚨᚾᛋᚢᛉ ᚱᚨᛁᛞᛟ ᚲᚨᚢᚾᚨᚾ',
  hasPhoneticMode: true,
  phoneticDescription: 'Type Latin: f=ᚠ, u=ᚢ, th=ᚦ, a=ᚨ, r=ᚱ, k=ᚲ, g=ᚷ, w=ᚹ, h=ᚺ, n=ᚾ, i=ᛁ, j=ᛃ, p=ᛈ, z=ᛉ, s=ᛊ, t=ᛏ, b=ᛒ, e=ᛖ, m=ᛗ, l=ᛚ, ng=ᛜ, d=ᛞ, o=ᛟ',
  specialCharGroups: [
    { title: 'Elder Futhark (24 Runes)', chars: ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ', 'ᛚ', 'ᛜ', 'ᛞ', 'ᛟ'] },
    { title: 'Anglo-Saxon Futhorc Additional Runes', chars: ['ᚪ', 'ᚫ', 'ᚣ', 'ᛠ', 'ᚸ', 'ᛣ', 'ᛤ', 'ᛥ', 'ᚹ'] },
    { title: 'Runic Punctuation', chars: ['᛫', '᛬', '᛭', 'ᛮ', 'ᛯ', 'ᛰ'] }
  ],
  rows: [
    [
      { char: 'ᚠ', shiftChar: 'ᚪ', label: 'f (Fehu)' },
      { char: 'ᚢ', shiftChar: 'ᚫ', label: 'u (Uruz)' },
      { char: 'ᚦ', shiftChar: 'ᚦ', label: 'þ (Thurisaz)' },
      { char: 'ᚨ', shiftChar: 'ᚣ', label: 'a (Ansuz)' },
      { char: 'ᚱ', shiftChar: 'ᛠ', label: 'r (Raidho)' },
      { char: 'ᚲ', shiftChar: 'ᛣ', label: 'k (Kaunan)' },
      { char: 'ᚷ', shiftChar: 'ᚸ', label: 'g (Gebo)' },
      { char: 'ᚹ', shiftChar: 'ᚹ', label: 'w (Wunjo)' },
      { char: 'ᚺ', shiftChar: 'ᚻ', label: 'h (Haglaz)' },
      { char: 'ᚾ', shiftChar: 'ᚾ', label: 'n (Naudiz)' },
      { char: 'ᛁ', shiftChar: 'ᛁ', label: 'i (Isaz)' },
      { char: 'ᛃ', shiftChar: 'ᛄ', label: 'j (Jera)' },
    ],
    [
      { char: 'ᛇ', shiftChar: 'ᛇ', label: 'ï (Eihwaz)' },
      { char: 'ᛈ', shiftChar: 'ᛈ', label: 'p (Pertho)' },
      { char: 'ᛉ', shiftChar: 'ᛉ', label: 'z (Algiz)' },
      { char: 'ᛊ', shiftChar: 'ᛋ', label: 's (Sowilo)' },
      { char: 'ᛏ', shiftChar: 'ᛏ', label: 't (Tiwaz)' },
      { char: 'ᛒ', shiftChar: 'ᛒ', label: 'b (Berkanan)' },
      { char: 'ᛖ', shiftChar: 'ᛖ', label: 'e (Ehwaz)' },
      { char: 'ᛗ', shiftChar: 'ᛗ', label: 'm (Mannaz)' },
      { char: 'ᛚ', shiftChar: 'ᛚ', label: 'l (Laguz)' },
      { char: 'ᛜ', shiftChar: 'ᛝ', label: 'ŋ (Ingwaz)' },
      { char: 'ᛞ', shiftChar: 'ᛞ', label: 'd (Dagaz)' },
      { char: 'ᛟ', shiftChar: 'ᛟ', label: 'o (Othala)' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en',
    lexilogosUrl: 'https://www.lexilogos.com/clavier/runes.htm'
  },
  seoKeywords: ['runes keyboard', 'elder futhark keyboard', 'clavier runique', 'runic alphabet typing', 'viking runes online']
};

export const oghamKeyboard: KeyboardLayout = {
  id: 'ogham',
  name: 'Ogham (Celtic Tree Alphabet)',
  nativeName: 'ᚑᚌᚐᚋ (Ogham)',
  category: 'ancient-historical',
  region: 'Ancient Ireland, Scotland & Wales',
  direction: 'ltr',
  isoCode: 'sga',
  flag: '🍀',
  description: 'Early Medieval Celtic alphabet (Ogham) written along a stem line with feather marks (᚛ ᚜) and named after trees.',
  defaultFontSize: 24,
  sampleText: '᚛ᚁᚂᚃᚄᚅᚆᚇᚈᚉᚊᚋᚌᚍᚎᚏᚐᚑᚒᚓᚔ᚜',
  specialCharGroups: [
    { title: 'Beithe, Luis, Fern (Aicme Beithe)', chars: ['ᚁ', 'ᚂ', 'ᚃ', 'ᚄ', 'ᚅ'] },
    { title: 'Húath, Dair, Tinne (Aicme Húatha)', chars: ['ᚆ', 'ᚇ', 'ᚈ', 'ᚉ', 'ᚊ'] },
    { title: 'Muin, Gort, Gétal (Aicme Muine)', chars: ['ᚋ', 'ᚌ', 'ᚍ', 'ᚎ', 'ᚏ'] },
    { title: 'Ailm, Onn, Úr (Aicme Ailme)', chars: ['ᚐ', 'ᚑ', 'ᚒ', 'ᚓ', 'ᚔ'] },
    { title: 'Forfeda & Enclosures', chars: ['ᚕ', 'ᚖ', 'ᚗ', 'ᚘ', 'ᚙ', 'ᚚ', '᚛' /* start */, '᚜' /* end */, ' ' /* space */] }
  ],
  rows: [
    [
      { char: '᚛', shiftChar: '᚜', label: 'Start / End mark' },
      { char: 'ᚁ', shiftChar: 'ᚁ', label: 'B (Beithe)' },
      { char: 'ᚂ', shiftChar: 'ᚂ', label: 'L (Luis)' },
      { char: 'ᚃ', shiftChar: 'ᚃ', label: 'F (Fern)' },
      { char: 'ᚄ', shiftChar: 'ᚄ', label: 'S (Sail)' },
      { char: 'ᚅ', shiftChar: 'ᚅ', label: 'N (Nin)' },
      { char: 'ᚆ', shiftChar: 'ᚆ', label: 'H (Úath)' },
      { char: 'ᚇ', shiftChar: 'ᚇ', label: 'D (Dair)' },
      { char: 'ᚈ', shiftChar: 'ᚈ', label: 'T (Tinne)' },
      { char: 'ᚉ', shiftChar: 'ᚉ', label: 'C (Coll)' },
      { char: 'ᚊ', shiftChar: 'ᚊ', label: 'Q (Ceirt)' },
    ],
    [
      { char: 'ᚋ', shiftChar: 'ᚋ', label: 'M (Muin)' },
      { char: 'ᚌ', shiftChar: 'ᚌ', label: 'G (Gort)' },
      { char: 'ᚍ', shiftChar: 'ᚍ', label: 'NG (nGéatal)' },
      { char: 'ᚎ', shiftChar: 'ᚎ', label: 'Z (Straif)' },
      { char: 'ᚏ', shiftChar: 'ᚏ', label: 'R (Ruis)' },
      { char: 'ᚐ', shiftChar: 'ᚐ', label: 'A (Ailm)' },
      { char: 'ᚑ', shiftChar: 'ᚑ', label: 'O (Onn)' },
      { char: 'ᚒ', shiftChar: 'ᚒ', label: 'U (Úr)' },
      { char: 'ᚓ', shiftChar: 'ᚓ', label: 'E (Edad)' },
      { char: 'ᚔ', shiftChar: 'ᚔ', label: 'I (Idad)' },
      { char: ' ', shiftChar: ' ', label: 'Space' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en',
    lexilogosUrl: 'https://www.lexilogos.com/clavier/ogham.htm'
  },
  seoKeywords: ['ogham keyboard', 'celtic tree alphabet', 'clavier ogham', 'ogham script online']
};

export const brailleKeyboard: KeyboardLayout = {
  id: 'braille',
  name: 'Braille (6-Dot & 8-Dot)',
  nativeName: '⠃⠗⠁⠊⠇⠇⠑ (Braille)',
  category: 'math-symbols',
  region: 'International Accessibility',
  direction: 'ltr',
  isoCode: 'bra',
  flag: '⠃',
  description: 'Braille tactile alphabet encoding 6-dot and 8-dot Unicode cells with instant Latin-to-Braille conversion.',
  defaultFontSize: 24,
  sampleText: '⠞⠕⠥⠎ ⠇⠑⠎ ⠑⠞⠗⠑⠎ ⠓⠥⠍⠁⠊⠝⠎',
  hasPhoneticMode: true,
  phoneticDescription: 'Type regular Latin letters to convert automatically to Braille cells.',
  specialCharGroups: [
    { title: 'Braille Alphabet (A-Z)', chars: ['⠁', '⠃', '⠉', '⠙', '⠑', '⠋', '⠛', '⠓', '⠊', '⠚', '⠅', '⠇', '⠍', '⠝', '⠕', '⠏', '⠟', '⠗', '⠎', '⠞', '⠥', '⠧', '⠺', '⠭', '⠽', '⠵'] },
    { title: 'Braille Numbers & Signs', chars: ['⠼⠁', '⠼⠃', '⠼⠉', '⠼⠙', '⠼⠑', '⠼⠋', '⠼⠛', '⠼⠓', '⠼⠊', '⠼⠚', '⠼', '⠠', '⠂', '⠆', '⠒', '⠲', '⠖', '⠦'] }
  ],
  rows: [
    [
      { char: '⠁', label: 'a' },
      { char: '⠃', label: 'b' },
      { char: '⠉', label: 'c' },
      { char: '⠙', label: 'd' },
      { char: '⠑', label: 'e' },
      { char: '⠋', label: 'f' },
      { char: '⠛', label: 'g' },
      { char: '⠓', label: 'h' },
      { char: '⠊', label: 'i' },
      { char: '⠚', label: 'j' },
      { char: '⠼', label: 'num' },
      { char: '⠠', label: 'cap' },
    ],
    [
      { char: '⠅', label: 'k' },
      { char: '⠇', label: 'l' },
      { char: '⠍', label: 'm' },
      { char: '⠝', label: 'n' },
      { char: '⠕', label: 'o' },
      { char: '⠏', label: 'p' },
      { char: '⠟', label: 'q' },
      { char: '⠗', label: 'r' },
      { char: '⠎', label: 's' },
      { char: '⠞', label: 't' },
      { char: '⠲', label: '.' },
      { char: '⠂', label: ',' },
    ],
    [
      { char: '⠥', label: 'u' },
      { char: '⠧', label: 'v' },
      { char: '⠺', label: 'w' },
      { char: '⠭', label: 'x' },
      { char: '⠽', label: 'y' },
      { char: '⠵', label: 'z' },
      { char: '⠦', label: '?' },
      { char: '⠖', label: '!' },
      { char: '⠤', label: '-' },
      { char: '⠶', label: '()' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en',
    lexilogosUrl: 'https://www.lexilogos.com/clavier/braille.htm'
  },
  seoKeywords: ['braille keyboard', 'braille translator', 'clavier braille', 'braille generator online']
};

export const mathSymbolsKeyboard: KeyboardLayout = {
  id: 'math-symbols',
  name: 'Mathematical & Logic Symbols',
  nativeName: '∀ x ∈ ℝ (Math & Logic)',
  category: 'math-symbols',
  region: 'Mathematics & STEM',
  direction: 'ltr',
  isoCode: 'und',
  flag: '∑',
  description: 'Comprehensive mathematical symbols, set theory, propositional logic, calculus operators, greek math constants, sub/superscripts, and arrows.',
  defaultFontSize: 22,
  sampleText: '∀ x ∈ ℝ, ∃ y : f(x) = ∫₀^∞ e^(-t) dt ≤ ∑ᵢ aᵢ',
  specialCharGroups: [
    { title: 'Set Theory & Logic', chars: ['∀', '∃', '∄', '∈', '∉', '∋', '⊂', '⊃', '⊆', '⊇', '⊄', '∪', '∩', '∖', '∅', 'ℵ', '∧', '∨', '¬', '⇒', '⇔', '∴', '∵', '∎'] },
    { title: 'Calculus & Operators', chars: ['∑', '∏', '∫', '∬', '∭', '∮', '∂', '∇', '√', '∛', '∜', '∞', '∝', '±', '∓', '×', '÷', '·', '∘', '⊗', '⊕', '⊙'] },
    { title: 'Relations & Approximations', chars: ['=', '≠', '≈', '≡', '≢', '∼', '≃', '≅', '≤', '≥', '≪', '≫', '∝', '⊥', '∥', '∠', '∟'] },
    { title: 'Superscripts & Subscripts', chars: ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁺', '⁻', '⁼', 'ⁿ', '₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '₊', '₋', '₌', 'ᵢ', 'ⱼ', 'ₖ'] },
    { title: 'Arrows & Topology', chars: ['→', '←', '↔', '⇒', '⇐', '⇔', '↦', '↑', '↓', '↗', '↘', '↙', '↖', '↺', '↻'] },
    { title: 'Greek Math Variables', chars: ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'π', 'ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'Γ', 'Δ', 'Θ', 'Λ', 'Ξ', 'Π', 'Σ', 'Φ', 'Ψ', 'Ω'] }
  ],
  rows: [
    [
      { char: '∀', shiftChar: '∃' },
      { char: '∈', shiftChar: '∉' },
      { char: '⊂', shiftChar: '⊆' },
      { char: '∪', shiftChar: '∩' },
      { char: '∑', shiftChar: '∏' },
      { char: '∫', shiftChar: '∮' },
      { char: '√', shiftChar: '∛' },
      { char: '∞', shiftChar: '∂' },
      { char: '∇', shiftChar: '∝' },
      { char: '≈', shiftChar: '≠' },
      { char: '≤', shiftChar: '≥' },
      { char: '±', shiftChar: '∓' },
    ],
    [
      { char: '∧', shiftChar: '∨' },
      { char: '¬', shiftChar: '⇒' },
      { char: '⇔', shiftChar: '↦' },
      { char: '→', shiftChar: '←' },
      { char: '↔', shiftChar: '↑' },
      { char: '↓', shiftChar: '⊗' },
      { char: '⊕', shiftChar: '⊙' },
      { char: '·', shiftChar: '×' },
      { char: '÷', shiftChar: '∘' },
      { char: '∅', shiftChar: 'ℵ' },
      { char: '∴', shiftChar: '∵' },
      { char: '∎', shiftChar: '⊥' },
    ],
    [
      { char: '⁰', shiftChar: '₀' },
      { char: '¹', shiftChar: '₁' },
      { char: '²', shiftChar: '₂' },
      { char: '³', shiftChar: '₃' },
      { char: '⁴', shiftChar: '₄' },
      { char: '⁵', shiftChar: '₅' },
      { char: '⁶', shiftChar: '₆' },
      { char: '⁷', shiftChar: '₇' },
      { char: '⁸', shiftChar: '₈' },
      { char: '⁹', shiftChar: '₉' },
      { char: 'ⁿ', shiftChar: 'ᵢ' },
      { char: '⁺', shiftChar: '⁻' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en',
    lexilogosUrl: 'https://www.lexilogos.com/clavier/symboles_mathematiques.htm'
  },
  seoKeywords: ['math symbols keyboard', 'mathematical keyboard online', 'clavier mathematiques', 'logic symbols keyboard', 'calculus characters keyboard']
};
