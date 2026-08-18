import React from 'react';
import { SupportedLocale } from '../utils/i18n';
import { KeyboardLayout } from '../types';
import { POPULAR_KEYBOARDS } from '../data/keyboards';
import { getLocalizedPath } from '../utils/routes';
import { ArrowLeft, Home, Search, Compass, AlertCircle } from 'lucide-react';
import { ParrotLogo } from './ParrotLogo';

interface NotFoundViewProps {
  locale: SupportedLocale;
  theme: 'dark' | 'light';
  onNavigateHome: () => void;
  onSelectKeyboard: (kb: KeyboardLayout) => void;
  onOpenCatalog: () => void;
}

const NOT_FOUND_TEXTS = {
  en: {
    title: 'Page Not Found (404)',
    subtitle: 'The keyboard layout or page you are looking for does not exist or has been moved.',
    homeBtn: 'Back to Homepage',
    browseBtn: 'Browse All 30+ Keyboards',
    popularTitle: 'Popular Online Keyboards',
    description: 'Explore our comprehensive collection of free virtual keyboards with phonetic transliteration and full diacritic support.'
  },
  fr: {
    title: 'Page Introuvable (404)',
    subtitle: 'La disposition de clavier ou la page demandée n’existe pas ou a été déplacée.',
    homeBtn: 'Retour à l’Accueil',
    browseBtn: 'Explorer les 30+ Claviers',
    popularTitle: 'Claviers Populaires',
    description: 'Découvrez notre collection complète de claviers virtuels gratuits avec translittération phonétique et gestion des accents.'
  },
  es: {
    title: 'Página No Encontrada (404)',
    subtitle: 'El teclado o la página solicitada no existe o ha cambiado de dirección.',
    homeBtn: 'Volver al Inicio',
    browseBtn: 'Ver Todos los 30+ Teclados',
    popularTitle: 'Teclados Populares',
    description: 'Explore nuestra colección completa de teclados virtuales gratuitos con transliteración fonética y soporte de diacríticos.'
  },
  ar: {
    title: 'الصفحة غير موجودة (404)',
    subtitle: 'لوحة المفاتيح أو الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.',
    homeBtn: 'العودة للصفحة الرئيسية',
    browseBtn: 'استعراض أكثر من 30 لوحة مفاتيح',
    popularTitle: 'لوحات المفاتيح الشائعة',
    description: 'استكشف مجموعتنا الشاملة من لوحات المفاتيح الافتراضية المجانية مع دعم الكتابة الصوتية والتشكيل الكامل.'
  }
};

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  locale,
  theme,
  onNavigateHome,
  onSelectKeyboard,
  onOpenCatalog,
}) => {
  const isDarkMode = theme === 'dark';
  const t = NOT_FOUND_TEXTS[locale] || NOT_FOUND_TEXTS.en;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
      {/* 404 Error Card */}
      <div className={`p-8 sm:p-12 rounded-3xl border shadow-sm transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-3xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <AlertCircle className="w-12 h-12" />
          </div>
        </div>

        <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 inline-block mb-3">
          Error 404
        </span>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
          {t.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto mb-8 leading-relaxed">
          {t.subtitle}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            id="404-home-btn"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>{t.homeBtn}</span>
          </button>

          <button
            id="404-browse-btn"
            onClick={onOpenCatalog}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-colors cursor-pointer ${
              isDarkMode 
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-500" />
            <span>{t.browseBtn}</span>
          </button>
        </div>

        {/* Popular Keyboards Quick Grid */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-left">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 text-center">
            {t.popularTitle}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {POPULAR_KEYBOARDS.slice(0, 8).map(kb => {
              const href = getLocalizedPath(kb.id, locale);
              return (
                <a
                  key={`404-kb-${kb.id}`}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectKeyboard(kb);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all hover:scale-102 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-slate-800/60 border-slate-700 hover:border-emerald-500 text-slate-200' 
                      : 'bg-slate-50 border-slate-200 hover:border-emerald-400 text-slate-800'
                  }`}
                >
                  <span className="text-lg shrink-0">{kb.flag || '🌐'}</span>
                  <div className="truncate">
                    <div className="truncate">{kb.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal truncate">{kb.nativeName}</div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
