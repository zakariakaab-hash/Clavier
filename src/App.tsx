import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { EditorPad } from './components/EditorPad';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { TransliterationPanel } from './components/TransliterationPanel';
import { ScriptInfoCard } from './components/ScriptInfoCard';
import { KeyboardCatalog } from './components/KeyboardCatalog';
import { AIAssistantModal } from './components/AIAssistantModal';
import { KeyboardLayout, KeyboardCategory } from './types';
import { ALL_KEYBOARDS, CATEGORIES_CONFIG, getKeyboardById } from './data/keyboards';
import { transliterateText } from './utils/transliterate';
import { Globe, Sparkles, Star, Layers, ShieldCheck, Heart, ExternalLink, BookOpen } from 'lucide-react';

export function App() {
  // 1. Initial states with local storage caching
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
  const [activeCategory, setActiveCategory] = useState<KeyboardCategory | 'all'>('all');
  const [isAIModalOpen, setIsAIModalOpen] = useState<boolean>(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Sync current keyboard to URL & LocalStorage & SEO Title
  useEffect(() => {
    localStorage.setItem('lexi_current_kb', currentKeyboard.id);
    document.title = `${currentKeyboard.name} (${currentKeyboard.nativeName}) - Clavier en ligne Lexilogos`;
    
    const url = new URL(window.location.href);
    url.searchParams.set('kb', currentKeyboard.id);
    window.history.replaceState({}, '', url.toString());

    if (currentKeyboard.defaultFontSize) {
      setActiveFontSize(currentKeyboard.defaultFontSize);
    }
  }, [currentKeyboard]);

  // Sync theme
  useEffect(() => {
    localStorage.setItem('lexi_theme', theme);
  }, [theme]);

  // Sync sound setting
  useEffect(() => {
    localStorage.setItem('lexi_sound_enabled', String(soundEnabled));
  }, [soundEnabled]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('lexi_favorites', JSON.stringify(favorites));
  }, [favorites]);

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

  // Filtered keyboards for quick pills bar
  const categoryKeyboards = activeCategory === 'all' 
    ? ALL_KEYBOARDS 
    : ALL_KEYBOARDS.filter(k => k.category === activeCategory);

  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode 
        ? 'bg-[#0b1120] text-slate-100 selection:bg-emerald-600 selection:text-white' 
        : 'bg-[#F1F5F9] text-slate-800 selection:bg-emerald-600 selection:text-white'
    }`}>
      
      {/* Header / Navbar */}
      <Navbar
        currentKeyboard={currentKeyboard}
        onSelectKeyboard={setCurrentKeyboard}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onOpenAI={() => setIsAIModalOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />

      {/* Subheader: Category Bar & Quick Switcher */}
      <nav aria-label="Keyboard Categories" className={`border-b transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider pr-2 shrink-0 hidden md:inline">
              Catégories :
            </span>

            <button
              id="cat-all-btn"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : (isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
              }`}
            >
              Tous les claviers
            </button>

            {CATEGORIES_CONFIG.map(cat => (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : (isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Keyboard Selectors */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pr-1 shrink-0">
              Populaires :
            </span>
            {categoryKeyboards.slice(0, 14).map(kb => (
              <button
                key={`quick-${kb.id}`}
                id={`quick-kb-${kb.id}`}
                onClick={() => setCurrentKeyboard(kb)}
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
            {categoryKeyboards.length > 14 && (
              <button
                onClick={() => setIsCatalogOpen(true)}
                className="text-xs font-semibold text-emerald-500 hover:underline px-2 py-1 whitespace-nowrap cursor-pointer"
              >
                + Voir tout ({categoryKeyboards.length})
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main App Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Editor Writing Area */}
        <section aria-label="Éditeur de texte Multilingue">
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
          />
        </section>

        {/* Interactive Virtual Keyboard with Original Keyboard Letters */}
        <section aria-label="Clavier Virtuel avec touches d'origine">
          <VirtualKeyboard
            currentKeyboard={currentKeyboard}
            onInsertChar={handleInsertChar}
            onBackspace={handleBackspace}
            onClear={() => setEditorText('')}
            soundEnabled={soundEnabled}
            phoneticMode={phoneticMode}
            onTogglePhoneticMode={() => setPhoneticMode(!phoneticMode)}
            theme={theme}
          />
        </section>

        {/* Transliteration & Linguistic Tools Panel */}
        <section aria-label="Outils de Translittération et Unicode">
          <TransliterationPanel
            currentKeyboard={currentKeyboard}
            editorText={editorText}
            onApplyToEditor={(newVal) => {
              setEditorText(editorText ? `${editorText} ${newVal}` : newVal);
            }}
          />
        </section>

        {/* Encyclopedic & SEO Linguistic Information Card */}
        <section aria-label="Informations Linguistiques et Historiques">
          <ScriptInfoCard keyboard={currentKeyboard} />
        </section>

      </main>

      {/* Modern SEO-friendly Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-12 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            
            {/* Column 1: Brand & Mission */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold font-serif text-lg shadow-md shadow-emerald-900/50">
                  Ω
                </div>
                <span className="font-bold text-base text-white tracking-tight">LexiKey • Claviers Multilingues</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Portail de claviers virtuels multilingues inspiré de Lexilogos. Écrivez dans toutes les langues du monde avec les touches de votre clavier d'origine ou à la souris.
              </p>
            </div>

            {/* Column 2: Popular Keyboards */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Claviers Populaires</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('arabic'))} className="hover:text-emerald-400 cursor-pointer">Clavier Arabe (العربية)</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('russian'))} className="hover:text-emerald-400 cursor-pointer">Clavier Russe (Русский)</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('polytonic-greek'))} className="hover:text-emerald-400 cursor-pointer">Grec Ancien / Moderne (Ἑλληνική)</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('hindi'))} className="hover:text-emerald-400 cursor-pointer">Clavier Hindi Devanagari (हिन्दी)</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('japanese-hiragana'))} className="hover:text-emerald-400 cursor-pointer">Japonais Hiragana & Katakana (日本語)</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('hebrew'))} className="hover:text-emerald-400 cursor-pointer">Hébreu avec Niqqud (עברית)</button></li>
              </ul>
            </div>

            {/* Column 3: Ancient & STEM */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Écritures Anciennes & STEM</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('ipa-phonetic'))} className="hover:text-emerald-400 cursor-pointer">Alphabet Phonétique International (API / IPA)</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('hieroglyphs'))} className="hover:text-emerald-400 cursor-pointer">Hiéroglyphes Égyptiens (Gardiner)</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('runes'))} className="hover:text-emerald-400 cursor-pointer">Runes Futhark (ᚠᚢᚦᚨᚱᚲ)</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('math-symbols'))} className="hover:text-emerald-400 cursor-pointer">Symboles Mathématiques & Logique</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('morse'))} className="hover:text-emerald-400 cursor-pointer">Code Morse avec Synthétiseur Audio</button></li>
                <li><button onClick={() => setCurrentKeyboard(getKeyboardById('braille'))} className="hover:text-emerald-400 cursor-pointer">Braille Unicode (⠃⠗⠁⠊⠇⠇⠑)</button></li>
              </ul>
            </div>

            {/* Column 4: Linguistic Resources */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Ressources Linguistiques</h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li>
                  <a href="https://www.lexilogos.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-400">
                    <span>Site Officiel Lexilogos</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://unicode.org/charts/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-400">
                    <span>Tables de Caractères Unicode</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
                <li>
                  <a href="https://www.internationalphoneticassociation.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-emerald-400">
                    <span>Association Phonétique Internationale</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} LexiKey • Tous les claviers du monde en ligne • Style Lexilogos.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Unicode 15.1 Compatible</span>
              </span>
              <span>•</span>
              <span>100% Hors-ligne & Rapide</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Full Catalog Modal */}
      <KeyboardCatalog
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        onSelectKeyboard={(kb) => setCurrentKeyboard(kb)}
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
