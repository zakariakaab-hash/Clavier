import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, Star, Volume2, VolumeX, Sparkles, BookOpen, Layers, X, Command } from 'lucide-react';
import { KeyboardLayout } from '../types';
import { ALL_KEYBOARDS, searchKeyboards } from '../data/keyboards';

interface NavbarProps {
  currentKeyboard: KeyboardLayout;
  onSelectKeyboard: (kb: KeyboardLayout) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAI: () => void;
  onOpenCatalog: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentKeyboard,
  onSelectKeyboard,
  favorites,
  onToggleFavorite,
  soundEnabled,
  onToggleSound,
  onOpenAI,
  onOpenCatalog,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const searchResults = searchKeyboards(searchQuery);

  // Keyboard shortcut Ctrl+K to open search
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
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const favoriteKeyboards = ALL_KEYBOARDS.filter(k => favorites.includes(k.id));

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shrink-0 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCatalog}
              id="brand-logo-btn"
              className="flex items-center gap-3 text-left group transition-transform active:scale-95 cursor-pointer"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-indigo-100 shrink-0">
                <span className="font-serif">Ω</span>
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                  LEXIKEY
                </h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-0.5">
                  Universal Keyboard Network
                </p>
              </div>
            </button>
          </div>

          {/* Search Trigger Bar */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4 relative">
            <button
              id="global-search-trigger"
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 50);
              }}
              className="w-full flex items-center justify-between pl-10 pr-4 py-2 bg-slate-100 border border-slate-200/80 rounded-full text-sm text-slate-500 hover:bg-slate-200/60 focus:bg-white focus:border-indigo-500 transition-all outline-hidden cursor-pointer"
            >
              <div className="absolute left-3.5 top-2.5 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-slate-600 truncate text-xs sm:text-sm">
                Search 100+ languages (e.g. Arabic, Sanskrit, Greek...)
              </span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-medium bg-white text-slate-500 px-1.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                <Command className="w-2.5 h-2.5" /> K
              </kbd>
            </button>

            {/* Quick Search Modal / Dropdown */}
            {isSearchOpen && (
              <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-xs">
                <div 
                  className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="p-3.5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
                    <Search className="w-5 h-5 text-indigo-600" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Type a language (e.g., Arabic, Russian, Greek, Hindi, Runes, IPA)..."
                      className="w-full text-slate-800 placeholder-slate-400 text-sm sm:text-base focus:outline-hidden bg-transparent"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-2.5 py-1 bg-white border border-slate-200 rounded-md shadow-2xs"
                    >
                      ESC
                    </button>
                  </div>

                  <div className="max-h-96 overflow-y-auto p-2 divide-y divide-slate-100">
                    {searchResults.length === 0 ? (
                      <div className="p-8 text-center text-slate-500">
                        No keyboards found for "{searchQuery}".
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
                          className={`w-full flex items-center justify-between p-3 rounded-xl text-left hover:bg-slate-100 transition-colors group ${
                            kb.id === currentKeyboard.id ? 'bg-indigo-50/70 border border-indigo-200' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{kb.flag || '🌐'}</span>
                            <div>
                              <div className="font-semibold text-slate-900 flex items-center gap-2 text-sm">
                                {kb.name}
                                <span className="text-xs font-normal text-slate-500">({kb.nativeName})</span>
                              </div>
                              <p className="text-xs text-slate-500 line-clamp-1">{kb.description}</p>
                            </div>
                          </div>
                          <span className="text-xs font-medium text-indigo-600 bg-white border border-indigo-200/70 px-2 py-1 rounded-lg shadow-2xs">
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
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Catalog Button */}
            <button
              id="catalog-nav-btn"
              onClick={onOpenCatalog}
              title="Browse all 100+ World Keyboards"
              className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Library</span>
            </button>

            {/* AI Assistant Button */}
            <button
              id="ai-assistant-btn"
              onClick={onOpenAI}
              title="AI Transliteration & Linguistic Etymology"
              className="flex items-center gap-1.5 bg-indigo-600 text-white px-3.5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden sm:inline">AI Linguist</span>
            </button>

            {/* Favorites Dropdown */}
            <div className="relative">
              <button
                id="favorites-menu-btn"
                onClick={() => setFavoritesOpen(!favoritesOpen)}
                title="Favorite keyboards"
                className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                  favorites.length > 0
                    ? 'text-amber-500 bg-amber-50/70 border-amber-200 hover:bg-amber-100/70'
                    : 'text-slate-500 bg-slate-100/80 border-slate-200 hover:bg-slate-200/70'
                }`}
              >
                <Star className={`w-4 h-4 ${favorites.length > 0 ? 'fill-amber-400' : ''}`} />
              </button>

              {favoritesOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50">
                  <div className="text-xs font-bold text-slate-500 px-2 py-1 uppercase tracking-wider">
                    Favorite Keyboards ({favoriteKeyboards.length})
                  </div>
                  {favoriteKeyboards.length === 0 ? (
                    <div className="p-3 text-xs text-slate-400 text-center">
                      Click the star icon on any keyboard to pin it here.
                    </div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {favoriteKeyboards.map(kb => (
                        <button
                          key={kb.id}
                          onClick={() => {
                            onSelectKeyboard(kb);
                            setFavoritesOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-2 rounded-lg text-xs hover:bg-indigo-50 text-slate-800"
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

            {/* Tactile Sound Feedback Toggle */}
            <button
              id="sound-toggle-btn"
              onClick={onToggleSound}
              title={soundEnabled ? 'Key click sounds ON' : 'Key click sounds MUTED'}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'text-indigo-600 bg-indigo-50/80 border-indigo-200'
                  : 'text-slate-400 bg-slate-100 border-slate-200'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
