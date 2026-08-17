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
      { char: '𓄿', shiftChar: '𓀀', label: '3 (aleph)', code: 'KeyQ' },
      { char: '𓇋', shiftChar: '𓁐', label: 'i (yod)', code: 'KeyW' },
      { char: '𓇌', shiftChar: '𓃭', label: 'y (double yod)', code: 'KeyE' },
      { char: '𓂝', shiftChar: '𓅃', label: 'ꜥ (ayin)', code: 'KeyR' },
      { char: '𓅱', shiftChar: '𓆗', label: 'w (quail chick)', code: 'KeyT' },
      { char: '𓃀', shiftChar: '𓆣', label: 'b (foot)', code: 'KeyY' },
      { char: '𓊪', shiftChar: '𓆈', label: 'p (stool)', code: 'KeyU' },
      { char: '𓆑', shiftChar: '𓅓', label: 'f (horned viper)', code: 'KeyI' },
      { char: '𓅓', shiftChar: '𓃠', label: 'm (owl)', code: 'KeyO' },
      { char: '𓈖', shiftChar: '𓃰', label: 'n (water)', code: 'KeyP' },
      { char: '𓂋', shiftChar: '𓃯', label: 'r (mouth)', code: 'BracketLeft' },
      { char: '𓉔', shiftChar: '𓊹', label: 'h (courtyard)', code: 'BracketRight' },
    ],
    [
      { char: '𓎛', shiftChar: '𓇳', label: 'ḥ (wick)', code: 'KeyA' },
      { char: '𓐍', shiftChar: '𓋹', label: 'ḫ (placenta)', code: 'KeyS' },
      { char: '𓄡', shiftChar: '𓍑', label: 'ẖ (belly)', code: 'KeyD' },
      { char: '𓊃', shiftChar: '𓋴', label: 'z (door bolt)', code: 'KeyF' },
      { char: '𓋴', shiftChar: '𓂀', label: 's (folded cloth)', code: 'KeyG' },
      { char: '𓈙', shiftChar: '𓇓', label: 'š (pool)', code: 'KeyH' },
      { char: '𓈎', shiftChar: '𓈞', label: 'q (hill)', code: 'KeyJ' },
      { char: '𓎡', shiftChar: '𓍹', label: 'k (basket)', code: 'KeyK' },
      { char: '𓎼', shiftChar: '𓍺', label: 'g (jar stand)', code: 'KeyL' },
      { char: '𓏏', shiftChar: '𓏤', label: 't (loaf)', code: 'Semicolon' },
      { char: '𓍿', shiftChar: '𓏥', label: 'ṯ (tether)', code: 'Quote' },
      { char: '𓂧', shiftChar: '𓆓', label: 'd (hand)', code: 'Slash' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en'
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
      { char: 'ᚠ', shiftChar: 'ᚪ', label: 'f (Fehu)', code: 'KeyQ' },
      { char: 'ᚢ', shiftChar: 'ᚫ', label: 'u (Uruz)', code: 'KeyW' },
      { char: 'ᚦ', shiftChar: 'ᚦ', label: 'þ (Thurisaz)', code: 'KeyE' },
      { char: 'ᚨ', shiftChar: 'ᚣ', label: 'a (Ansuz)', code: 'KeyR' },
      { char: 'ᚱ', shiftChar: 'ᛠ', label: 'r (Raidho)', code: 'KeyT' },
      { char: 'ᚲ', shiftChar: 'ᛣ', label: 'k (Kaunan)', code: 'KeyY' },
      { char: 'ᚷ', shiftChar: 'ᚸ', label: 'g (Gebo)', code: 'KeyU' },
      { char: 'ᚹ', shiftChar: 'ᚹ', label: 'w (Wunjo)', code: 'KeyI' },
      { char: 'ᚺ', shiftChar: 'ᚻ', label: 'h (Haglaz)', code: 'KeyO' },
      { char: 'ᚾ', shiftChar: 'ᚾ', label: 'n (Naudiz)', code: 'KeyP' },
      { char: 'ᛁ', shiftChar: 'ᛁ', label: 'i (Isaz)', code: 'BracketLeft' },
      { char: 'ᛃ', shiftChar: 'ᛄ', label: 'j (Jera)', code: 'BracketRight' },
    ],
    [
      { char: 'ᛇ', shiftChar: 'ᛇ', label: 'ï (Eihwaz)', code: 'KeyA' },
      { char: 'ᛈ', shiftChar: 'ᛈ', label: 'p (Pertho)', code: 'KeyS' },
      { char: 'ᛉ', shiftChar: 'ᛉ', label: 'z (Algiz)', code: 'KeyD' },
      { char: 'ᛊ', shiftChar: 'ᛋ', label: 's (Sowilo)', code: 'KeyF' },
      { char: 'ᛏ', shiftChar: 'ᛏ', label: 't (Tiwaz)', code: 'KeyG' },
      { char: 'ᛒ', shiftChar: 'ᛒ', label: 'b (Berkanan)', code: 'KeyH' },
      { char: 'ᛖ', shiftChar: 'ᛖ', label: 'e (Ehwaz)', code: 'KeyJ' },
      { char: 'ᛗ', shiftChar: 'ᛗ', label: 'm (Mannaz)', code: 'KeyK' },
      { char: 'ᛚ', shiftChar: 'ᛚ', label: 'l (Laguz)', code: 'KeyL' },
      { char: 'ᛜ', shiftChar: 'ᛝ', label: 'ŋ (Ingwaz)', code: 'Semicolon' },
      { char: 'ᛞ', shiftChar: 'ᛞ', label: 'd (Dagaz)', code: 'Quote' },
      { char: 'ᛟ', shiftChar: 'ᛟ', label: 'o (Othala)', code: 'Slash' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en'
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
      { char: '᚛', shiftChar: '᚜', label: 'Start / End mark', code: 'KeyQ' },
      { char: 'ᚁ', shiftChar: 'ᚁ', label: 'B (Beithe)', code: 'KeyW' },
      { char: 'ᚂ', shiftChar: 'ᚂ', label: 'L (Luis)', code: 'KeyE' },
      { char: 'ᚃ', shiftChar: 'ᚃ', label: 'F (Fern)', code: 'KeyR' },
      { char: 'ᚄ', shiftChar: 'ᚄ', label: 'S (Sail)', code: 'KeyT' },
      { char: 'ᚅ', shiftChar: 'ᚅ', label: 'N (Nin)', code: 'KeyY' },
      { char: 'ᚆ', shiftChar: 'ᚆ', label: 'H (Úath)', code: 'KeyU' },
      { char: 'ᚇ', shiftChar: 'ᚇ', label: 'D (Dair)', code: 'KeyI' },
      { char: 'ᚈ', shiftChar: 'ᚈ', label: 'T (Tinne)', code: 'KeyO' },
      { char: 'ᚉ', shiftChar: 'ᚉ', label: 'C (Coll)', code: 'KeyP' },
      { char: 'ᚊ', shiftChar: 'ᚊ', label: 'Q (Ceirt)', code: 'BracketLeft' },
    ],
    [
      { char: 'ᚋ', shiftChar: 'ᚋ', label: 'M (Muin)', code: 'KeyA' },
      { char: 'ᚌ', shiftChar: 'ᚌ', label: 'G (Gort)', code: 'KeyS' },
      { char: 'ᚍ', shiftChar: 'ᚍ', label: 'NG (nGéatal)', code: 'KeyD' },
      { char: 'ᚎ', shiftChar: 'ᚎ', label: 'Z (Straif)', code: 'KeyF' },
      { char: 'ᚏ', shiftChar: 'ᚏ', label: 'R (Ruis)', code: 'KeyG' },
      { char: 'ᚐ', shiftChar: 'ᚐ', label: 'A (Ailm)', code: 'KeyH' },
      { char: 'ᚑ', shiftChar: 'ᚑ', label: 'O (Onn)', code: 'KeyJ' },
      { char: 'ᚒ', shiftChar: 'ᚒ', label: 'U (Úr)', code: 'KeyK' },
      { char: 'ᚓ', shiftChar: 'ᚓ', label: 'E (Edad)', code: 'KeyL' },
      { char: 'ᚔ', shiftChar: 'ᚔ', label: 'I (Idad)', code: 'Semicolon' },
      { char: ' ', shiftChar: ' ', label: 'Space', code: 'Quote' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en'
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
      { char: '⠁', label: 'a', code: 'KeyQ' },
      { char: '⠃', label: 'b', code: 'KeyW' },
      { char: '⠉', label: 'c', code: 'KeyE' },
      { char: '⠙', label: 'd', code: 'KeyR' },
      { char: '⠑', label: 'e', code: 'KeyT' },
      { char: '⠋', label: 'f', code: 'KeyY' },
      { char: '⠛', label: 'g', code: 'KeyU' },
      { char: '⠓', label: 'h', code: 'KeyI' },
      { char: '⠊', label: 'i', code: 'KeyO' },
      { char: '⠚', label: 'j', code: 'KeyP' },
      { char: '⠼', label: 'num', code: 'BracketLeft' },
      { char: '⠠', label: 'cap', code: 'BracketRight' },
    ],
    [
      { char: '⠅', label: 'k', code: 'KeyA' },
      { char: '⠇', label: 'l', code: 'KeyS' },
      { char: '⠍', label: 'm', code: 'KeyD' },
      { char: '⠝', label: 'n', code: 'KeyF' },
      { char: '⠕', label: 'o', code: 'KeyG' },
      { char: '⠏', label: 'p', code: 'KeyH' },
      { char: '⠟', label: 'q', code: 'KeyJ' },
      { char: '⠗', label: 'r', code: 'KeyK' },
      { char: '⠎', label: 's', code: 'KeyL' },
      { char: '⠞', label: 't', code: 'Semicolon' },
      { char: '⠲', label: '.', code: 'Quote' },
      { char: '⠂', label: ',', code: 'Backslash' },
    ],
    [
      { char: '⠥', label: 'u', code: 'KeyZ' },
      { char: '⠧', label: 'v', code: 'KeyX' },
      { char: '⠺', label: 'w', code: 'KeyC' },
      { char: '⠭', label: 'x', code: 'KeyV' },
      { char: '⠽', label: 'y', code: 'KeyB' },
      { char: '⠵', label: 'z', code: 'KeyN' },
      { char: '⠦', label: '?', code: 'KeyM' },
      { char: '⠖', label: '!', code: 'Comma' },
      { char: '⠤', label: '-', code: 'Period' },
      { char: '⠶', label: '()', code: 'Slash' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en'
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
      { char: '∀', shiftChar: '∃', code: 'KeyQ' },
      { char: '∈', shiftChar: '∉', code: 'KeyW' },
      { char: '⊂', shiftChar: '⊆', code: 'KeyE' },
      { char: '∪', shiftChar: '∩', code: 'KeyR' },
      { char: '∑', shiftChar: '∏', code: 'KeyT' },
      { char: '∫', shiftChar: '∮', code: 'KeyY' },
      { char: '√', shiftChar: '∛', code: 'KeyU' },
      { char: '∞', shiftChar: '∂', code: 'KeyI' },
      { char: '∇', shiftChar: '∝', code: 'KeyO' },
      { char: '≈', shiftChar: '≠', code: 'KeyP' },
      { char: '≤', shiftChar: '≥', code: 'BracketLeft' },
      { char: '±', shiftChar: '∓', code: 'BracketRight' },
    ],
    [
      { char: '∧', shiftChar: '∨', code: 'KeyA' },
      { char: '¬', shiftChar: '⇒', code: 'KeyS' },
      { char: '⇔', shiftChar: '↦', code: 'KeyD' },
      { char: '→', shiftChar: '←', code: 'KeyF' },
      { char: '↔', shiftChar: '↑', code: 'KeyG' },
      { char: '↓', shiftChar: '⊗', code: 'KeyH' },
      { char: '⊕', shiftChar: '⊙', code: 'KeyJ' },
      { char: '·', shiftChar: '×', code: 'KeyK' },
      { char: '÷', shiftChar: '∘', code: 'KeyL' },
      { char: '∅', shiftChar: 'ℵ', code: 'Semicolon' },
      { char: '∴', shiftChar: '∵', code: 'Quote' },
      { char: '∎', shiftChar: '⊥', code: 'Backslash' },
    ],
    [
      { char: '⁰', shiftChar: '₀', code: 'KeyZ' },
      { char: '¹', shiftChar: '₁', code: 'KeyX' },
      { char: '²', shiftChar: '₂', code: 'KeyC' },
      { char: '³', shiftChar: '₃', code: 'KeyV' },
      { char: '⁴', shiftChar: '₄', code: 'KeyB' },
      { char: '⁵', shiftChar: '₅', code: 'KeyN' },
      { char: '⁶', shiftChar: '₆', code: 'KeyM' },
      { char: '⁷', shiftChar: '₇', code: 'Comma' },
      { char: '⁸', shiftChar: '₈', code: 'Period' },
      { char: '⁹', shiftChar: '₉', code: 'Slash' },
      { char: 'ⁿ', shiftChar: 'ᵢ', code: 'Minus' },
      { char: '⁺', shiftChar: '⁻', code: 'Equal' },
    ]
  ],
  externalLinks: {
    wikipediaLang: 'en'
  },
  seoKeywords: ['math symbols keyboard', 'mathematical keyboard online', 'clavier mathematiques', 'logic symbols keyboard', 'calculus characters keyboard']
};
