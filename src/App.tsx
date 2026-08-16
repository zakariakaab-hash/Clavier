import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { EditorPad } from './components/EditorPad';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { KeyboardCatalog } from './components/KeyboardCatalog';
import { AIAssistantModal } from './components/AIAssistantModal';
import { ParrotLogo } from './components/ParrotLogo';
import { KeyboardLayout } from './types';
import { ALL_KEYBOARDS, getKeyboardById } from './data/keyboards';
import { transliterateText } from './utils/transliterate';
import { processPhysicalKeyStroke } from './utils/keyboardEngine';
import { playKeyClickSound, playSpacebarSound } from './utils/audio';
import { SupportedLocale, TRANSLATIONS, getTranslation, detectUserSystemLanguageAndLocation } from './utils/i18n';
import { Globe, Sparkles, Star, Layers, ShieldCheck, Heart, BookOpen } from 'lucide-react';

export function App() {
  // 1. User system language detection & persistence
  const [detectedInfo] = useState(() => detectUserSystemLanguageAndLocation());
  const [locale, setLocale] = useState<SupportedLocale>(() => {
    const saved = localStorage.getItem('lexi_user_locale');
    if (saved && TRANSLATIONS[saved as SupportedLocale]) {
      return saved as SupportedLocale;
    }
    const detected = detectUserSystemLanguageAndLocation();
    return detected.locale;
  });

  const t = getTranslation(locale);

  // 2. Initial states with local storage caching
  const [currentKeyboard, setCurrentKeyboard] = useState<KeyboardLayout>(() => {
    const params = new URLSearchParams(window.location.search);
    const kbParam = params.get('kb');
    if (kbParam) {
      const found = ALL_KEYBOARDS.find(k => k.id === kbParam);
      if (found) return found;
    }
    const saved = localStorage.getItem('lexi_current_kb');
    if (saved) {
      const found = ALL_KEYBOARDS.find(k => k.id === saved);
      if (found) return found;
    }
    const detected = detectUserSystemLanguageAndLocation();
    if (detected.matchedKeyboard) {
      return detected.matchedKeyboard;
    }
    return ALL_KEYBOARDS[0]; // Default to Arabic
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('lexi_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const [editorText, setEditorText] = useState<string>('');
  const [activeFontSize, setActiveFontSize] = useState<number>(currentKeyboard.defaultFontSize || 24);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    return localStorage.getItem('lexi_sound_enabled') !== 'false';
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lexi_favorites');
      return saved ? JSON.parse(saved) : ['arabic', 'russian', 'greek', 'ipa-phonetic', 'hieroglyphs'];
    } catch {
      return ['arabic', 'russian', 'greek'];
    }
  });

  const [phoneticMode, setPhoneticMode] = useState<boolean>(true);
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Dynamic SEO Title, Description, and Social Tags Sync
  useEffect(() => {
    localStorage.setItem('lexi_current_kb', currentKeyboard.id);
    
    // Dynamic High-Impact SEO Title & Description
    const isRtl = locale === 'ar' || locale === 'he' || locale === 'fa';
    const seoTitle = `${currentKeyboard.name} (${currentKeyboard.nativeName}) — Clavier Virtuel en Ligne & Translittération | KeypadKing`;
    const seoDesc = `Tapez en ligne en ${currentKeyboard.name} (${currentKeyboard.nativeName}) avec clavier virtuel KeypadKing, mode phonétique sur clavier d'ordinateur, diacritiques, translittération instantanée et synthèse sonore.`;
    
    document.title = seoTitle;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoDesc);

    // Update OpenGraph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seoTitle);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seoDesc);

    // Update Twitter Tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seoTitle);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', seoDesc);

    const url = new URL(window.location.href);
    url.searchParams.set('kb', currentKeyboard.id);
    window.history.replaceState({}, '', url.toString());

    if (currentKeyboard.defaultFontSize) {
      setActiveFontSize(currentKeyboard.defaultFontSize);
    }
  }, [currentKeyboard, locale]);

  // Sync document language and text direction (RTL for Arabic/Hebrew/Persian, LTR for others)
  useEffect(() => {
    document.documentElement.lang = locale;
    const isRtl = locale === 'ar' || locale === 'he' || locale === 'fa';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    localStorage.setItem('lexi_user_locale', locale);
  }, [locale]);

  // Listen to browser system language changes dynamically
  useEffect(() => {
    const handleSystemLanguageChange = () => {
      const isManual = localStorage.getItem('lexi_user_locale_manual');
      if (!isManual) {
        const detected = detectUserSystemLanguageAndLocation();
        setLocale(detected.locale);
        if (detected.matchedKeyboard && !localStorage.getItem('lexi_current_kb_manual')) {
          setCurrentKeyboard(detected.matchedKeyboard);
        }
      }
    };

    window.addEventListener('languagechange', handleSystemLanguageChange);
    return () => window.removeEventListener('languagechange', handleSystemLanguageChange);
  }, []);
  useEffect(() => {
    localStorage.setItem('lexi_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('lexi_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Global physical keyboard listener when user types outside input fields
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if inside an input, other textarea, or if modal is open
      const activeEl = document.activeElement as HTMLElement | null;
      if (
        activeEl && 
        (activeEl.tagName === 'INPUT' || 
         activeEl.tagName === 'SELECT' || 
         (activeEl.tagName === 'TEXTAREA' && activeEl.id === 'lexi-editor-textarea'))
      ) {
        return;
      }
      if (isAIModalOpen || isCatalogOpen) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key !== 'AltGraph') {
        return;
      }
      if (e.altKey && !e.ctrlKey && e.key !== 'AltGraph') {
        return;
      }
      if (e.key === 'Tab' || e.key === 'Escape' || e.key.startsWith('F') && e.key.length > 1) {
        return;
      }

      // If printable key or space
      if (e.key.length === 1 || e.key === 'Backspace') {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.focus();
        if (e.key === 'Backspace') {
          handleBackspace();
          return;
        }

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const result = processPhysicalKeyStroke(
          e.key,
          e.code,
          e.shiftKey,
          e.getModifierState('AltGraph'),
          textarea.value,
          start,
          end,
          currentKeyboard,
          phoneticMode
        );

        if (result.handled) {
          e.preventDefault();
          setEditorText(result.newText);
          if (soundEnabled) {
            if (e.key === ' ') playSpacebarSound();
            else playKeyClickSound();
          }
          setTimeout(() => {
            textarea.setSelectionRange(result.newCursor, result.newCursor);
          }, 0);
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [currentKeyboard, phoneticMode, soundEnabled, isAIModalOpen, isCatalogOpen]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Cursor-aware text insertion
  const handleInsertChar = (charToInsert: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setEditorText(prev => prev + charToInsert);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const prevText = textarea.value;

    let finalChar = charToInsert;

    // If phonetic transliteration mode is enabled
    if (phoneticMode && currentKeyboard.hasPhoneticMode && charToInsert.length === 1 && /[a-zA-Z0-9']/.test(charToInsert)) {
      // Check last typed characters for multi-letter combinations (e.g. s' -> ش, H' -> خ)
      const context = prevText.slice(Math.max(0, start - 2), start) + charToInsert;
      const converted = transliterateText(context, currentKeyboard.id);
      if (converted && converted !== context) {
        const contextLen = Math.min(2, start);
        const newText = prevText.substring(0, start - contextLen) + converted + prevText.substring(end);
        setEditorText(newText);
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start - contextLen + converted.length, start - contextLen + converted.length);
        }, 0);
        return;
      }
    }

    const newText = prevText.substring(0, start) + finalChar + prevText.substring(end);
    setEditorText(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + finalChar.length, start + finalChar.length);
    }, 0);
  };

  const handleBackspace = () => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setEditorText(prev => prev.slice(0, -1));
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const prevText = textarea.value;

    if (start === end && start > 0) {
      const beforeCursor = Array.from(prevText.substring(0, start));
      beforeCursor.pop();
      const newBefore = beforeCursor.join('');
      const afterCursor = prevText.substring(end);
      const newText = newBefore + afterCursor;
      setEditorText(newText);

      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(newBefore.length, newBefore.length);
      }, 0);
    } else if (start !== end) {
      const newText = prevText.substring(0, start) + prevText.substring(end);
      setEditorText(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start);
      }, 0);
    }
  };

  const handleSelectKeyboard = (kb: KeyboardLayout) => {
    localStorage.setItem('lexi_current_kb_manual', 'true');
    setCurrentKeyboard(kb);
  };

  const handleChangeLocale = (loc: SupportedLocale) => {
    localStorage.setItem('lexi_user_locale_manual', 'true');
    setLocale(loc);
  };

  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen w-full flex flex-col font-sans transition-colors duration-200 overflow-x-hidden ${
      isDarkMode 
        ? 'bg-[#0b1120] text-slate-100 selection:bg-emerald-600 selection:text-white' 
        : 'bg-[#F1F5F9] text-slate-800 selection:bg-emerald-600 selection:text-white'
    }`}>
      {/* Header / Navbar */}
      <Navbar
        currentKeyboard={currentKeyboard}
        onSelectKeyboard={handleSelectKeyboard}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenAI={() => setIsAIModalOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
        currentLocale={locale}
        onChangeLocale={handleChangeLocale}
        detectedLocationLabel={detectedInfo.locationLabel}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Sleek Quick Popular Keyboards Strip */}
      <div className={`border-b transition-colors ${
        isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pr-1 shrink-0">
              {t.popularKeyboards} :
            </span>
            {ALL_KEYBOARDS.slice(0, 14).map(kb => (
              <button
                key={`quick-${kb.id}`}
                id={`quick-kb-${kb.id}`}
                onClick={() => handleSelectKeyboard(kb)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                  kb.id === currentKeyboard.id
                    ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs'
                    : (isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs')
                }`}
              >
                <span>{kb.flag || '🌐'}</span>
                <span>{kb.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main App Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Editor Writing Area */}
        <section aria-label="Multilingual Text Editor">
          <EditorPad
            text={editorText}
            onChangeText={setEditorText}
            currentKeyboard={currentKeyboard}
            onSelectKeyboard={setCurrentKeyboard}
            onOpenAIModal={() => setIsAIModalOpen(true)}
            activeFontSize={activeFontSize}
            onChangeFontSize={setActiveFontSize}
            textareaRef={textareaRef}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onInsertSpace={() => handleInsertChar(' ')}
            soundEnabled={soundEnabled}
            phoneticMode={phoneticMode}
            onTogglePhoneticMode={() => setPhoneticMode(!phoneticMode)}
            currentLocale={locale}
          />
        </section>

        {/* Interactive Virtual Keyboard with Original Keyboard Letters */}
        <section aria-label="Virtual Keyboard">
          <VirtualKeyboard
            currentKeyboard={currentKeyboard}
            onInsertChar={handleInsertChar}
            onBackspace={handleBackspace}
            onClear={() => setEditorText('')}
            soundEnabled={soundEnabled}
            phoneticMode={phoneticMode}
            onTogglePhoneticMode={() => setPhoneticMode(!phoneticMode)}
            theme={theme}
            currentLocale={locale}
          />
        </section>

      </main>

      {/* Modern SEO-friendly Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-12 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
            
            {/* Column 1: Brand & Mission */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <ParrotLogo size={34} />
                <span className="font-bold text-base text-white tracking-tight">{t.appName}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.footerDesc || t.tagline}
              </p>
            </div>

            {/* Column 2: Popular Keyboards */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">{t.popularKeyboardsFooter || 'Popular Keyboards'}</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('arabic'))} className="hover:text-emerald-400 cursor-pointer">Arabic (العربية)</button></li>
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('russian'))} className="hover:text-emerald-400 cursor-pointer">Russian (Русский)</button></li>
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('polytonic-greek'))} className="hover:text-emerald-400 cursor-pointer">Greek (Ἑλληνική)</button></li>
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('hindi'))} className="hover:text-emerald-400 cursor-pointer">Hindi Devanagari (हिन्दी)</button></li>
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('japanese-hiragana'))} className="hover:text-emerald-400 cursor-pointer">Japanese Hiragana (日本語)</button></li>
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('hebrew'))} className="hover:text-emerald-400 cursor-pointer">Hebrew (עברית)</button></li>
              </ul>
            </div>

            {/* Column 3: Ancient & STEM */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">{t.ancientAndStemFooter || 'Ancient Scripts & STEM'}</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('ipa-phonetic'))} className="hover:text-emerald-400 cursor-pointer">International Phonetic Alphabet (IPA)</button></li>
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('hieroglyphs'))} className="hover:text-emerald-400 cursor-pointer">Egyptian Hieroglyphs</button></li>
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('runes'))} className="hover:text-emerald-400 cursor-pointer">Runic Futhark (ᚠᚢᚦᚨᚱᚲ)</button></li>
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('math-symbols'))} className="hover:text-emerald-400 cursor-pointer">Mathematical & Logic Symbols</button></li>
                <li><button onClick={() => handleSelectKeyboard(getKeyboardById('braille'))} className="hover:text-emerald-400 cursor-pointer">Braille (⠃⠗⠁⠊⠇⠇⠑)</button></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} {t.appName} • {t.tagline}</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Unicode 15.1 Compatible</span>
              </span>
              <span>•</span>
              <span>100% Client-side & Fast</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Full Catalog Modal */}
      <KeyboardCatalog
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectKeyboard={(kb) => handleSelectKeyboard(kb)}
        currentKeyboardId={currentKeyboard.id}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* AI Linguistic Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        currentKeyboard={currentKeyboard}
        initialText={editorText}
        onApplyToEditor={(val) => setEditorText(editorText ? `${editorText} ${val}` : val)}
      />

    </div>
  );
}

export default App;
