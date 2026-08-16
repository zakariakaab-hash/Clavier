import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, X, Sparkles, Command } from 'lucide-react';
import { KeyboardLayout } from '../types';
import { ALL_KEYBOARDS, searchKeyboards } from '../data/keyboards';
import { SupportedLocale, TRANSLATIONS, TranslationDict } from '../utils/i18n';

interface MobileFloatingSearchProps {
  currentKeyboard: KeyboardLayout;
  onSelectKeyboard: (kb: KeyboardLayout) => void;
  currentLocale: SupportedLocale;
  theme: 'dark' | 'light';
}

export const MobileFloatingSearch: React.FC<MobileFloatingSearchProps> = ({
  currentKeyboard,
  onSelectKeyboard,
  currentLocale,
  theme,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isDarkMode = theme === 'dark';

  const t: TranslationDict = TRANSLATIONS[currentLocale] || TRANSLATIONS.en;
  const searchResults = searchKeyboards(searchQuery);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Floating Language Switcher - Strictly Mobile Only (Hidden on md: 768px+), Top-Right under Header */}
      <div 
        className="md:hidden fixed z-35"
        style={{
          right: 'max(8px, env(safe-area-inset-right))',
          top: 'calc(56px + 6px)',
        }}
      >
        <button
          id="mobile-floating-search-btn"
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Search languages"
          title="Search languages"
          className={`flex items-center gap-1 px-2 py-1 rounded-full font-semibold text-xs shadow-md border backdrop-blur-md active:scale-95 transition-all duration-150 cursor-pointer touch-manipulation min-h-[32px] focus:outline-hidden focus:ring-2 focus:ring-emerald-400 ${
            isDarkMode 
              ? 'bg-slate-900/90 text-white border-slate-700/80 hover:bg-slate-800 ring-1 ring-slate-700/50' 
              : 'bg-white/95 text-slate-800 border-slate-200/90 hover:bg-slate-50 ring-1 ring-slate-200/50 shadow-slate-900/5'
          }`}
        >
          <span className="text-xs leading-none shrink-0">{currentKeyboard.flag || '🌐'}</span>
          <span className="text-[11px] font-bold tracking-tight truncate max-w-[85px]">
            {currentKeyboard.name.split(' ')[0]}
          </span>
          <Search className="w-3 h-3 text-emerald-500 shrink-0" />
        </button>
      </div>

      {/* Mobile Search Bottom Sheet / Modal Panel */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Search languages"
        >
          <div 
            className={`w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl border transition-all duration-200 animate-in slide-in-from-bottom-6 sm:zoom-in-95 ${
              isDarkMode 
                ? 'bg-slate-900 border-slate-700 text-white' 
                : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={e => e.stopPropagation()}
            style={{
              paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
            }}
          >
            {/* Header & Search Input */}
            <div className={`p-3.5 border-b flex items-center gap-2.5 shrink-0 ${
              isDarkMode ? 'border-slate-800 bg-slate-800/80' : 'border-slate-200 bg-slate-50'
            }`}>
              <Search className="w-5 h-5 text-emerald-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.searchModalPlaceholder || 'Search 100+ languages...'}
                className={`w-full text-sm font-medium focus:outline-hidden bg-transparent ${
                  isDarkMode ? 'text-white placeholder-slate-400' : 'text-slate-900 placeholder-slate-400'
                }`}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="p-1.5 text-slate-400 hover:text-slate-200 cursor-pointer touch-manipulation active:scale-95"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close search"
                className={`p-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[36px] min-w-[36px] flex items-center justify-center ${
                  isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' 
                    : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-2xs'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Keyboards List Results */}
            <div className={`overflow-y-auto p-2 divide-y scrollbar-touch max-h-[60vh] ${
              isDarkMode ? 'divide-slate-800' : 'divide-slate-100'
            }`}>
              {searchResults.length === 0 ? (
                <div className="py-10 px-4 text-center">
                  <p className="text-sm font-semibold text-slate-400">
                    {currentLocale === 'fr' ? 'Aucun clavier trouvé pour' : 'No keyboards found for'} "{searchQuery}"
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try searching by language name, country, or script (e.g. Arabic, Cyrillic, Greek, Hebrew).
                  </p>
                </div>
              ) : (
                searchResults.map(kb => {
                  const isCurrent = kb.id === currentKeyboard.id;
                  return (
                    <button
                      key={kb.id}
                      id={`mobile-search-kb-${kb.id}`}
                      onClick={() => {
                        onSelectKeyboard(kb);
                        setIsOpen(false);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer touch-manipulation active:scale-98 ${
                        isCurrent 
                          ? (isDarkMode ? 'bg-emerald-950/60 border border-emerald-700' : 'bg-emerald-50 border border-emerald-300') 
                          : (isDarkMode ? 'hover:bg-slate-800 active:bg-slate-800' : 'hover:bg-slate-50 active:bg-slate-100')
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl shrink-0">{kb.flag || '🌐'}</span>
                        <div>
                          <div className="font-semibold text-xs sm:text-sm flex items-center gap-1.5">
                            <span className={isCurrent ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
                              {kb.name}
                            </span>
                            <span className={`text-[11px] font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                              ({kb.nativeName})
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{kb.description}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg border shadow-2xs shrink-0 ${
                        isDarkMode ? 'text-emerald-400 bg-slate-800 border-slate-700' : 'text-emerald-700 bg-white border-emerald-200'
                      }`}>
                        {kb.region}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
