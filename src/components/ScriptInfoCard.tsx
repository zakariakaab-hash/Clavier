import React from 'react';
import { BookOpen, Globe, Info, ExternalLink, Sparkles, Hash, Compass, Award } from 'lucide-react';
import { KeyboardLayout } from '../types';

interface ScriptInfoCardProps {
  keyboard: KeyboardLayout;
  onSelectKeyboard?: (kb: KeyboardLayout) => void;
}

export const ScriptInfoCard: React.FC<ScriptInfoCardProps> = ({ keyboard }) => {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-indigo-50/40 border-b border-slate-200/80">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-white rounded-xl shadow-xs border border-slate-200/70">
              {keyboard.flag || '🌐'}
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                About the {keyboard.name} Script & Keyboard
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Native Name: <span className="font-semibold text-indigo-700">{keyboard.nativeName}</span> • Region: {keyboard.region}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold bg-white text-indigo-800 border border-indigo-200 px-2.5 py-1 rounded-lg">
              ISO: {keyboard.isoCode.toUpperCase()}
            </span>
            <span className="text-xs font-semibold bg-white text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg">
              {keyboard.direction.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 sm:p-6 space-y-5">
        
        {/* Description & Overview */}
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-600" />
            Linguistic Overview & Typographical Heritage
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {keyboard.description}
          </p>
        </div>

        {/* Sample Text Section */}
        {keyboard.sampleText && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Sample Orthographic Text (Universal Declaration of Human Rights, Art. 1)
            </span>
            <blockquote 
              dir={keyboard.direction}
              className={`text-base font-normal text-slate-900 ${keyboard.fontFamilyClass || ''}`}
            >
              « {keyboard.sampleText} »
            </blockquote>
          </div>
        )}

        {/* SEO Keywords Badges */}
        {keyboard.seoKeywords && keyboard.seoKeywords.length > 0 && (
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Related Search Index & Topics:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {keyboard.seoKeywords.map((kw, idx) => (
                <span 
                  key={idx}
                  className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 font-medium"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Encyclopedic & Language External Portals */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
            <span>Official References & Linguistic Guide:</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://en.wikipedia.org/wiki/${encodeURIComponent(keyboard.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
            >
              <span>Wikipedia Linguistic Article</span>
              <ExternalLink className="w-3 h-3 text-indigo-500" />
            </a>
          </div>
        </div>

      </div>
    </article>
  );
};
