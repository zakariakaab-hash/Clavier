import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, Star, Sparkles, X, Check, Command, Sun, Moon } from 'lucide-react';
import { KeyboardLayout } from '../types';
import { ALL_KEYBOARDS, searchKeyboards, getKeyboardById } from '../data/keyboards';
import { SupportedLocale, TRANSLATIONS, TranslationDict, detectUserSystemLanguageAndLocation } from '../utils/i18n';
import { ParrotLogo } from './ParrotLogo';

interface NavbarProps {
  currentKeyboard: KeyboardLayout;
  onSelectKeyboard: (kb: KeyboardLayout) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCatalog: () => void;
  currentLocale: SupportedLocale;
  onChangeLocale: (locale: SupportedLocale) => void;
  detectedLocationLabel: string;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

const LOCALE_NAMES: Record<SupportedLocale, { name: string; native: string; flag: string }> = {
  en: { name: 'English', native: 'English', flag: '🇬🇧' },
  fr: { name: 'French', native: 'Français', flag: '🇫🇷' },
  es: { name: 'Spanish', native: 'Español', flag: '🇪🇸' },
  ar: { name: 'Arabic', native: 'العربية', flag: '🇸🇦' },
};

export const Navbar: React.FC<NavbarProps> = ({
  currentKeyboard,
  onSelectKeyboard,
  favorites,
  onToggleFavorite,
  soundEnabled,
  onToggleSound,
  onOpenCatalog,
  currentLocale,
  onChangeLocale,
  detectedLocationLabel,
  theme,
  onToggleTheme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const favoritesRef = useRef<HTMLDivElement>(null);

  const t: TranslationDict = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;
  const isDarkMode = theme === 'dark';

  const searchResults = searchKeyboards(searchQuery);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setFavoritesOpen(false);
        setLangMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setLangMenuOpen(false);
      }
      if (favoritesRef.current && !favoritesRef.current.contains(target)) {
        setFavoritesOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const favoriteKeyboards = ALL_KEYBOARDS.filter(k => favorites.includes(k.id));

  return (
    <header className={`sticky top-0 z-40 shrink-0 border-b transition-colors w-full ${
      isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 sm:h-16 md:h-16 landscape:h-11 md:landscape:h-16 gap-1.5 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`/${currentLocale}/`}
              onClick={(e) => {
                e.preventDefault();
                setIsSearchOpen(false);
                setFavoritesOpen(false);
                setLangMenuOpen(false);
                window.history.pushState({}, '', `/${currentLocale}/`);
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
              id="brand-logo-btn"
              aria-label={t.appName}
              className="flex items-center gap-2 text-left group transition-transform active:scale-95 cursor-pointer touch-manipulation text-inherit no-underline"
            >
              <ParrotLogo size={32} />
              <div>
                <span className={`font-extrabold text-base sm:text-lg leading-none tracking-tight group-hover:text-emerald-500 transition-colors block ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {t.appName}
                </span>
              </div>
            </a>
          </div>

          {/* Search Trigger Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <button
              id="global-search-trigger"
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
              className={`w-full flex items-center justify-between pl-8 sm:pl-10 pr-2.5 sm:pr-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-all outline-hidden cursor-pointer border touch-manipulation min-h-[36px] sm:min-h-[40px] ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/80 focus:bg-slate-900' 
                  : 'bg-slate-100 border-slate-200/80 text-slate-500 hover:bg-slate-200/60 focus:bg-white'
              }`}
            >
              <div className="absolute left-2.5 sm:left-3 top-2 sm:top-2.5 text-slate-400">
                <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className={`truncate text-xs sm:text-sm ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {t.searchPlaceholder}
              </span>
              <kbd className={`hidden md:inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full border shadow-2xs ${
                isDarkMode ? 'bg-slate-700 text-slate-300 border-slate-600' : 'bg-white text-slate-500 border-slate-200'
              }`}>
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Quick Search Modal / Dropdown */}
            {isSearchOpen && (
              <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-xs">
                <div 
                  className={`rounded-2xl shadow-2xl border w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
                    isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                  onClick={e => e.stopPropagation()}
                >
                  <div className={`p-3 sm:p-3.5 border-b flex items-center gap-2.5 sm:gap-3 shrink-0 ${
                    isDarkMode ? 'border-slate-800 bg-slate-800/60' : 'border-slate-200 bg-slate-50/50'
                  }`}>
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder={t.searchModalPlaceholder}
                      className={`w-full text-xs sm:text-base font-medium focus:outline-hidden bg-transparent ${
                        isDarkMode ? 'text-white placeholder-slate-400' : 'text-slate-800 placeholder-slate-400'
                      }`}
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer touch-manipulation">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className={`text-xs font-semibold px-2.5 py-1.5 rounded-md border shadow-2xs cursor-pointer touch-manipulation active:scale-95 ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      ESC
                    </button>
                  </div>

                  <div className={`overflow-y-auto p-2 divide-y scrollbar-touch ${isDarkMode ? 'divide-slate-800' : 'divide-slate-100'}`}>
                    {searchResults.length === 0 ? (
                      <div className="p-8 text-center text-xs sm:text-sm text-slate-400">
                        {currentLocale === 'fr' ? 'Aucun clavier trouvé pour' : 'No keyboards found for'} "{searchQuery}"
                      </div>
                    ) : (
                      searchResults.map(kb => (
                        <button
                          key={kb.id}
                          id={`search-kb-${kb.id}`}
                          onClick={() => {
                            onSelectKeyboard(kb);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl text-left transition-colors cursor-pointer group touch-manipulation active:scale-98 ${
                            kb.id === currentKeyboard.id 
                              ? (isDarkMode ? 'bg-emerald-950/50 border border-emerald-800' : 'bg-emerald-50/70 border border-emerald-200') 
                              : (isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100')
                          }`}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3">
                            <span className="text-xl sm:text-2xl">{kb.flag || '🌐'}</span>
                            <div>
                              <div className="font-semibold text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2">
                                <span>{kb.name}</span>
                                <span className={`text-[11px] sm:text-xs font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>({kb.nativeName})</span>
                              </div>
                              <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-1">{kb.description}</p>
                            </div>
                          </div>
                          <span className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 sm:py-1 rounded-lg border shadow-2xs shrink-0 ${
                            isDarkMode ? 'text-emerald-400 bg-slate-800 border-slate-700' : 'text-emerald-600 bg-white border-emerald-200/70'
                          }`}>
                            {kb.region}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">

            {/* Language & Geolocation Detection Menu */}
            <div className="relative" ref={langMenuRef}>
              <button
                id="language-switcher-btn"
                onClick={() => {
                  setLangMenuOpen(!langMenuOpen);
                  setFavoritesOpen(false);
                }}
                title={`${t.switchUiLanguage}: ${LOCALE_NAMES[currentLocale]?.native || 'Auto'}`}
                className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer shadow-2xs touch-manipulation active:scale-95 min-h-[36px] ${
                  isDarkMode 
                    ? 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200' 
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="hidden md:inline">{LOCALE_NAMES[currentLocale]?.flag} {LOCALE_NAMES[currentLocale]?.native}</span>
                <span className="md:hidden uppercase font-mono">{currentLocale}</span>
              </button>

              {langMenuOpen && (
                <div className={`absolute right-0 mt-2 w-64 sm:w-72 rounded-xl shadow-xl border p-2 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <div className={`flex items-center justify-between pb-2 mb-2 border-b px-2 ${
                    isDarkMode ? 'border-slate-800' : 'border-slate-100'
                  }`}>
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-500" />
                      {t.switchUiLanguage}
                    </span>
                    <span className="text-[10px] text-emerald-500 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                      {detectedLocationLabel}
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1 scrollbar-touch">
                    {/* Auto System Detection Option */}
                    <button
                      id="lang-auto-detect-btn"
                      onClick={() => {
                        const detected = detectUserSystemLanguageAndLocation();
                        onChangeLocale(detected.locale);
                        localStorage.removeItem('kp_user_locale_manual');
                        setLangMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors text-left cursor-pointer mb-1.5 touch-manipulation active:scale-98 ${
                        isDarkMode 
                          ? 'bg-slate-800/80 border-emerald-500/30 text-emerald-400 hover:bg-slate-750' 
                          : 'bg-emerald-50/80 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Auto ({detectedLocationLabel.split(' ')[0]})</span>
                      </span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                        Auto
                      </span>
                    </button>

                    {(Object.keys(LOCALE_NAMES) as SupportedLocale[]).map(loc => {
                      const item = LOCALE_NAMES[loc];
                      const isSelected = loc === currentLocale;
                      return (
                        <button
                          key={loc}
                          id={`lang-select-${loc}`}
                          onClick={() => {
                            onChangeLocale(loc);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer touch-manipulation active:scale-98 ${
                            isSelected 
                              ? 'bg-emerald-600 text-white font-bold' 
                              : (isDarkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-800')
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{item.flag}</span>
                            <span>{item.native}</span>
                            <span className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>({item.name})</span>
                          </span>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Favorites Dropdown */}
            <div className="relative" ref={favoritesRef}>
              <button
                id="favorites-menu-btn"
                onClick={() => {
                  setFavoritesOpen(!favoritesOpen);
                  setLangMenuOpen(false);
                }}
                title={t.favorites}
                className={`p-2 rounded-lg border transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  favorites.length > 0
                    ? (isDarkMode ? 'text-amber-400 bg-amber-950/40 border-amber-800' : 'text-amber-500 bg-amber-50/70 border-amber-200 hover:bg-amber-100/70')
                    : (isDarkMode ? 'text-slate-400 bg-slate-800 border-slate-700 hover:bg-slate-700' : 'text-slate-500 bg-slate-100/80 border-slate-200 hover:bg-slate-200/70')
                }`}
              >
                <Star className={`w-4 h-4 ${favorites.length > 0 ? 'fill-amber-400' : ''}`} />
              </button>

              {favoritesOpen && (
                <div className={`absolute right-0 mt-2 w-64 rounded-xl shadow-xl border p-2 z-50 ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                  <div className="text-xs font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    {t.favoriteKeyboardsTitle} ({favoriteKeyboards.length})
                  </div>
                  {favoriteKeyboards.length === 0 ? (
                    <div className="p-3 text-xs text-slate-400 text-center">
                      {t.noFavorites}
                    </div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto space-y-1 scrollbar-touch">
                      {favoriteKeyboards.map(kb => (
                        <button
                          key={kb.id}
                          onClick={() => {
                            onSelectKeyboard(kb);
                            setFavoritesOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer touch-manipulation active:scale-98 ${
                            isDarkMode ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-emerald-50 text-slate-800'
                          }`}
                        >
                          <span className="flex items-center gap-2 font-medium">
                            <span>{kb.flag || '🌐'}</span>
                            {kb.name}
                          </span>
                          <span className="text-[10px] text-slate-400">{kb.nativeName}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bright Mode / Night Mode Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleTheme}
              title={isDarkMode ? (t.lightMode || 'Bright Mode') : (t.darkMode || 'Night Mode')}
              aria-label={isDarkMode ? 'Switch to Bright Mode' : 'Switch to Night Mode'}
              className={`p-2 rounded-lg border transition-all active:scale-95 cursor-pointer touch-manipulation min-h-[36px] min-w-[36px] flex items-center justify-center ${
                isDarkMode 
                  ? 'text-amber-400 bg-slate-800 border-slate-700 hover:bg-slate-700 hover:text-amber-300' 
                  : 'text-slate-600 bg-slate-100 border-slate-200 hover:bg-slate-200/80 hover:text-slate-900 shadow-2xs'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};

