import React, { useState } from 'react';
import { Search, Star, Layers, Globe, ArrowRight, X, Sparkles } from 'lucide-react';
import { KeyboardCategory, KeyboardLayout } from '../types';
import { ALL_KEYBOARDS, CATEGORIES_CONFIG, searchKeyboards } from '../data/keyboards';
import { ParrotLogo } from './ParrotLogo';

interface KeyboardCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectKeyboard: (kb: KeyboardLayout) => void;
  currentKeyboardId: string;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const KeyboardCatalog: React.FC<KeyboardCatalogProps> = ({
  isOpen,
  onClose,
  onSelectKeyboard,
  currentKeyboardId,
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<KeyboardCategory | 'all'>('all');

  if (!isOpen) return null;

  const filteredKeyboards = searchKeyboards(searchQuery).filter(kb => {
    if (selectedCategory === 'all') return true;
    return kb.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Catalog Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ParrotLogo size={36} />
            <div>
              <h2 className="font-bold text-lg text-white">
                World Multilingual Keyboard Library
              </h2>
              <p className="text-xs text-slate-400">
                Explore standard layouts, historical scripts, phonetic keyboards & linguistic writing systems
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 space-y-3">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search across all world keyboards (e.g. Arabic, Cyrillic, Greek, Hindi, Runes, Braille, Hieroglyphs)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin pb-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
              }`}
            >
              All Keyboards ({ALL_KEYBOARDS.length})
            </button>

            {CATEGORIES_CONFIG.map(cat => {
              const count = ALL_KEYBOARDS.filter(k => k.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  <span className="text-[10px] opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50/50">
          {filteredKeyboards.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No keyboards matched your criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredKeyboards.map(kb => {
                const isCurrent = kb.id === currentKeyboardId;
                const isFavorite = favorites.includes(kb.id);

                return (
                  <div
                    key={kb.id}
                    className={`relative group bg-white rounded-2xl p-4 border transition-all hover:shadow-md flex flex-col justify-between ${
                      isCurrent
                        ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-xs'
                        : 'border-slate-200 hover:border-indigo-300'
                    }`}
                  >
                    <div>
                      {/* Top info */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{kb.flag || '🌐'}</span>
                          <div>
                            <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                              {kb.name}
                            </h3>
                            <span className="text-xs text-slate-500 font-medium">{kb.nativeName}</span>
                          </div>
                        </div>

                        {/* Favorite star */}
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            onToggleFavorite(kb.id);
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isFavorite
                              ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                              : 'text-slate-300 hover:text-amber-500 hover:bg-slate-100'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
                        </button>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 mb-3">
                        {kb.description}
                      </p>
                    </div>

                    {/* Footer / Launch */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                        {kb.region}
                      </span>

                      <button
                        id={`catalog-select-${kb.id}`}
                        onClick={() => {
                          onSelectKeyboard(kb);
                          onClose();
                        }}
                        className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                          isCurrent
                            ? 'bg-indigo-600 text-white'
                            : 'bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white'
                        }`}
                      >
                        <span>{isCurrent ? 'Active' : 'Open Keyboard'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 px-6">
          <span>Showing {filteredKeyboards.length} of {ALL_KEYBOARDS.length} world keyboards</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
