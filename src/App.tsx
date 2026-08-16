import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { EditorPad } from './components/EditorPad';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { KeyboardCatalog } from './components/KeyboardCatalog';
import { FAQSection } from './components/FAQSection';
import { ParrotLogo } from './components/ParrotLogo';
import { KeyboardLayout } from './types';
import { ALL_KEYBOARDS, POPULAR_KEYBOARDS, getKeyboardById } from './data/keyboards';
import { transliterateText } from './utils/transliterate';
import { processPhysicalKeyStroke } from './utils/keyboardEngine';
import { playKeyClickSound, playSpacebarSound } from './utils/audio';
import { SupportedLocale, TRANSLATIONS, getTranslation, detectUserSystemLanguageAndLocation } from './utils/i18n';
import { getLocalizedPath, parseCurrentPath } from './utils/routes';
import { getPageSeoMetadata } from './utils/seo';
import { Globe, Star, Layers, ShieldCheck, Heart, BookOpen } from 'lucide-react';

export function App() {
  // 1. Initial URL Path Parsing (e.g. /en/arabic-keyboard, /fr/clavier-arabe, /ar/, /)
  const [initialRoute] = useState(() => parseCurrentPath(window.location.pathname, window.location.search));
  const [detectedInfo] = useState(() => detectUserSystemLanguageAndLocation());
  const [isHomepage, setIsHomepage] = useState<boolean>(() => Boolean(initialRoute.isHomepage));

  const [locale, setLocale] = useState<SupportedLocale>(() => {
    // 1. URL path or query parameter has highest priority
    if (initialRoute.locale && TRANSLATIONS[initialRoute.locale]) {
      return initialRoute.locale;
    }
    const saved = localStorage.getItem('lexi_user_locale');
    if (saved && TRANSLATIONS[saved as SupportedLocale]) {
      return saved as SupportedLocale;
    }
    return detectedInfo.locale;
  });

  const t = getTranslation(locale);

  // 2. Initial keyboard layout resolution
  const [currentKeyboard, setCurrentKeyboard] = useState<KeyboardLayout>(() => {
    // 1. URL slug has highest priority (e.g. /fr/clavier-arabe -> arabic)
    if (initialRoute.keyboardId) {
      const found = ALL_KEYBOARDS.find(k => k.id === initialRoute.keyboardId);
      if (found) return found;
    }
    const saved = localStorage.getItem('lexi_current_kb');
    if (saved) {
      const found = ALL_KEYBOARDS.find(k => k.id === saved);
      if (found) return found;
    }
    if (detectedInfo.matchedKeyboard) {
      return detectedInfo.matchedKeyboard;
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
      return saved ? JSON.parse(saved) : ['arabic', 'persian', 'urdu', 'russian', 'polytonic-greek'];
    } catch {
      return ['arabic', 'persian', 'urdu', 'russian'];
    }
  });

  const [phoneticMode, setPhoneticMode] = useState<boolean>(true);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Dynamic SEO Title, Description, Canonical URL and Clean Path Synchronization
  useEffect(() => {
    localStorage.setItem('lexi_current_kb', currentKeyboard.id);
    
    // Accurate Dynamic SEO Title, Description & H1 (Check if homepage or specific keyboard page)
    const seoMeta = getPageSeoMetadata(currentKeyboard, locale, isHomepage);
    
    document.title = seoMeta.title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', seoMeta.description);

    // Update OpenGraph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seoMeta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seoMeta.description);

    // Update Twitter Tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seoMeta.title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', seoMeta.description);

    // Clean SEO URL Path Sync
    // Homepage routes: / (or /en/, /fr/, /es/, /ar/)
    // Keyboard routes: /fr/clavier-arabe, /en/arabic-keyboard, /ar/clavier-arabe, /es/teclado-arabe
    let targetPath = '';
    if (isHomepage) {
      // If root path '/' and locale is detected/default, keep '/' or localized home '/fr/', '/ar/', etc.
      const currentPathClean = window.location.pathname.replace(/\/+$/, '');
      if (currentPathClean === '' || currentPathClean === '/') {
        targetPath = '/';
      } else {
        targetPath = `/${locale}/`;
      }
    } else {
      targetPath = getLocalizedPath(currentKeyboard.id, locale);
    }

    if (window.location.pathname !== targetPath) {
      window.history.replaceState({ kbId: isHomepage ? undefined : currentKeyboard.id, locale, isHomepage }, '', targetPath);
    }

    // Update canonical link (Self-referencing for EVERY page)
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    const fullCanonicalUrl = `https://keypadking.com${targetPath}`;
    canonical.setAttribute('href', fullCanonicalUrl);

    // Update OpenGraph URL
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', fullCanonicalUrl);
    }

    // Update page-specific hreflang alternates (en, fr, es, ar, x-default)
    const activeLocales: SupportedLocale[] = ['en', 'fr', 'es', 'ar'];
    activeLocales.forEach((loc) => {
      let locPath = '';
      if (isHomepage) {
        locPath = `/${loc}/`;
      } else {
        locPath = getLocalizedPath(currentKeyboard.id, loc);
      }
      
      let link = document.querySelector(`link[rel="alternate"][hreflang="${loc}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', loc);
        document.head.appendChild(link);
      }
      link.setAttribute('href', `https://keypadking.com${locPath}`);
    });

    let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
    if (!xDefault) {
      xDefault = document.createElement('link');
      xDefault.setAttribute('rel', 'alternate');
      xDefault.setAttribute('hreflang', 'x-default');
      document.head.appendChild(xDefault);
    }
    const xDefaultHref = isHomepage ? 'https://keypadking.com/' : `https://keypadking.com${getLocalizedPath(currentKeyboard.id, 'en')}`;
    xDefault.setAttribute('href', xDefaultHref);

    if (currentKeyboard.defaultFontSize) {
      setActiveFontSize(currentKeyboard.defaultFontSize);
    }
  }, [currentKeyboard, locale, isHomepage]);

  // Handle Browser Back / Forward navigation (PopState)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseCurrentPath(window.location.pathname, window.location.search);
      setIsHomepage(Boolean(parsed.isHomepage));
      if (parsed.locale && TRANSLATIONS[parsed.locale]) {
        setLocale(parsed.locale);
      }
      if (parsed.keyboardId) {
        const found = ALL_KEYBOARDS.find(k => k.id === parsed.keyboardId);
        if (found) setCurrentKeyboard(found);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
      if (!isManual && !initialRoute.locale) {
        const detected = detectUserSystemLanguageAndLocation();
        setLocale(detected.locale);
        if (detected.matchedKeyboard && !localStorage.getItem('lexi_current_kb_manual') && !initialRoute.keyboardId) {
          setCurrentKeyboard(detected.matchedKeyboard);
        }
      }
    };

    window.addEventListener('languagechange', handleSystemLanguageChange);
    return () => window.removeEventListener('languagechange', handleSystemLanguageChange);
  }, [initialRoute]);
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
      if (isCatalogOpen) {
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
  }, [currentKeyboard, phoneticMode, soundEnabled, isCatalogOpen]);

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
    setIsHomepage(false);
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
        onOpenCatalog={() => setIsCatalogOpen(true)}
        currentLocale={locale}
        onChangeLocale={handleChangeLocale}
        detectedLocationLabel={detectedInfo.locationLabel}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Popular Keyboards Navbar (Desktop / Web version only) */}
      <div className={`hidden md:block border-b transition-colors w-full overflow-hidden ${
        isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-touch scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pr-1 shrink-0">
              {t.popularKeyboards} :
            </span>
            {POPULAR_KEYBOARDS.slice(0, 16).map(kb => {
              const localizedHref = getLocalizedPath(kb.id, locale);
              return (
                <a
                  key={`quick-${kb.id}`}
                  id={`quick-kb-${kb.id}`}
                  href={localizedHref}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectKeyboard(kb);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border touch-manipulation active:scale-95 ${
                    kb.id === currentKeyboard.id
                      ? 'bg-emerald-600 text-white font-bold border-emerald-600 shadow-xs'
                      : (isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700 active:bg-slate-650' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-2xs active:bg-slate-100')
                  }`}
                >
                  <span>{kb.flag || '🌐'}</span>
                  <span>{kb.name.split(' ')[0]}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main App Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-3 sm:py-4 space-y-3 sm:space-y-4">
        
        {/* Semantic SEO H1 & Page Context */}
        <section aria-label="Page Title" className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b pb-2 sm:pb-3 border-slate-200/80 dark:border-slate-800/80">
          <div>
            <h1 className={`text-lg sm:text-2xl font-bold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {getPageSeoMetadata(currentKeyboard, locale, isHomepage).h1}
            </h1>
            <p className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {getPageSeoMetadata(currentKeyboard, locale, isHomepage).description}
            </p>
          </div>
          {currentKeyboard.flag && (
            <span className="text-xl sm:text-2xl shrink-0 self-start sm:self-center" aria-hidden="true">
              {currentKeyboard.flag}
            </span>
          )}
        </section>

        {/* Editor Writing Area */}
        <section aria-label="Multilingual Text Editor">
          <EditorPad
            text={editorText}
            onChangeText={setEditorText}
            currentKeyboard={currentKeyboard}
            onSelectKeyboard={setCurrentKeyboard}
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

        {/* Informative & Concise Dynamic FAQ Section */}
        <FAQSection
          currentLocale={locale}
          isDarkMode={isDarkMode}
          currentKeyboard={currentKeyboard}
          keyboardName={currentKeyboard.name}
        />

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
                {[
                  { id: 'arabic', label: 'Arabic (العربية)' },
                  { id: 'persian', label: 'Persian Farsi (فارسی)' },
                  { id: 'urdu', label: 'Urdu (اردو)' },
                  { id: 'russian', label: 'Russian (Русский)' },
                  { id: 'polytonic-greek', label: 'Greek (Ἑλληνική)' },
                  { id: 'hindi', label: 'Hindi Devanagari (हिन्दी)' },
                  { id: 'japanese-hiragana', label: 'Japanese Hiragana (日本語)' },
                  { id: 'french', label: 'French (Français AZERTY)' },
                ].map((item) => {
                  const kb = getKeyboardById(item.id);
                  const href = getLocalizedPath(kb.id, locale);
                  return (
                    <li key={item.id}>
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectKeyboard(kb);
                        }}
                        className="hover:text-emerald-400 cursor-pointer transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Ancient & STEM */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">{t.ancientAndStemFooter || 'Ancient Scripts & STEM'}</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {[
                  { id: 'ipa-phonetic', label: 'International Phonetic Alphabet (IPA)' },
                  { id: 'hieroglyphs', label: 'Egyptian Hieroglyphs' },
                  { id: 'runes', label: 'Runic Futhark (ᚠᚢᚦᚨᚱᚲ)' },
                  { id: 'math-symbols', label: 'Mathematical & Logic Symbols' },
                  { id: 'braille', label: 'Braille (⠃⠗⠁⠊⠇⠇⠑)' },
                ].map((item) => {
                  const kb = getKeyboardById(item.id);
                  const href = getLocalizedPath(kb.id, locale);
                  return (
                    <li key={item.id}>
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectKeyboard(kb);
                        }}
                        className="hover:text-emerald-400 cursor-pointer transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} {t.appName} • {t.tagline}</p>
            
            {/* Quick Locale Switcher in Footer */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400 mr-1">{t.switchUiLanguage}:</span>
              {[
                { code: 'en' as const, label: '🇬🇧 English' },
                { code: 'fr' as const, label: '🇫🇷 Français' },
                { code: 'es' as const, label: '🇪🇸 Español' },
                { code: 'ar' as const, label: '🇸🇦 العربية' },
              ].map(item => (
                <button
                  key={`footer-lang-${item.code}`}
                  onClick={() => handleChangeLocale(item.code)}
                  className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer touch-manipulation active:scale-95 ${
                    locale === item.code ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

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

    </div>
  );
}

export default App;
