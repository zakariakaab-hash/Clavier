import React, { useState } from 'react';
import { 
  ArrowLeftRight, Sparkles, Play, Square, Copy, Check 
} from 'lucide-react';
import { KeyboardLayout } from '../types';
import { transliterateText } from '../utils/transliterate';
import { playMorseTone } from '../utils/audio';
import { SupportedLocale, getTranslation } from '../utils/i18n';

interface TransliterationPanelProps {
  currentKeyboard: KeyboardLayout;
  editorText: string;
  onApplyToEditor: (text: string) => void;
  currentLocale?: SupportedLocale;
}

export const TransliterationPanel: React.FC<TransliterationPanelProps> = ({
  currentKeyboard,
  editorText,
  onApplyToEditor,
  currentLocale = 'en',
}) => {
  const t = getTranslation(currentLocale);
  const [latinInput, setLatinInput] = useState('');
  const [activeToolTab, setActiveToolTab] = useState<'transliterate' | 'morse'>('transliterate');
  const [copiedTranslit, setCopiedTranslit] = useState(false);
  const [isPlayingMorse, setIsPlayingMorse] = useState(false);

  // Live transliterate latin input
  const convertedScript = transliterateText(latinInput, currentKeyboard.id);

  // Play Morse Code Audio
  const handlePlayMorse = () => {
    if (!editorText) return;
    setIsPlayingMorse(true);
    let delay = 0;
    const unitTime = 100; // ms

    const chars = Array.from(editorText);
    chars.forEach((c: string) => {
      if (c === '.') {
        setTimeout(() => playMorseTone(80, false), delay);
        delay += unitTime + 80;
      } else if (c === '-') {
        setTimeout(() => playMorseTone(80, true), delay);
        delay += (unitTime * 3) + 80;
      } else if (c === ' ') {
        delay += unitTime * 3;
      } else if (c === '/') {
        delay += unitTime * 7;
      }
    });

    setTimeout(() => {
      setIsPlayingMorse(false);
    }, delay + 200);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xs border border-slate-200/90 overflow-hidden">
      
      {/* Tool Header / Navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1 text-xs font-semibold">
        <button
          onClick={() => setActiveToolTab('transliterate')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
            activeToolTab === 'transliterate'
              ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>{t.quickTranslit || 'Quick Transliteration'} Latin ⇄ {currentKeyboard.name}</span>
        </button>

        {currentKeyboard.id === 'morse' && (
          <button
            onClick={() => setActiveToolTab('morse')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
              activeToolTab === 'morse'
                ? 'bg-white text-emerald-700 shadow-2xs border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.morseAudioTitle || 'Morse Audio Synthesizer'}</span>
          </button>
        )}
      </div>

      {/* Tab 1: Latin to Script Live Transliteration */}
      {activeToolTab === 'transliterate' && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              {t.quickTranslit || 'Phonetic Conversion'} ({currentKeyboard.name})
            </span>
            <button
              onClick={() => setLatinInput('')}
              className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {t.clearText || 'Clear'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Input Latin */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                {t.typeInLatin || 'Type in Latin / phonetic alphabet :'}
              </label>
              <textarea
                value={latinInput}
                onChange={e => setLatinInput(e.target.value)}
                placeholder={`Type in Latin letters (e.g. 'salam', 'privet', 'namaste', 'arigato')...`}
                className="w-full h-20 p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Converted Output */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-600">
                  {t.targetOutput || 'Converted Result'} ({currentKeyboard.name}) :
                </label>
                {convertedScript && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onApplyToEditor(convertedScript)}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 cursor-pointer"
                    >
                      {t.insertToEditor || 'Insert in Editor'}
                    </button>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(convertedScript);
                        setCopiedTranslit(true);
                        setTimeout(() => setCopiedTranslit(false), 2000);
                      }}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 cursor-pointer flex items-center gap-1"
                    >
                      {copiedTranslit ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedTranslit ? (t.copied || 'Copied!') : (t.copyText || 'Copy')}</span>
                    </button>
                  </div>
                )}
              </div>
              <div 
                dir={currentKeyboard.direction}
                className={`w-full h-20 p-2.5 text-base bg-emerald-50/40 border border-emerald-100 rounded-xl text-slate-900 overflow-y-auto ${
                  currentKeyboard.fontFamilyClass || ''
                }`}
              >
                {convertedScript || <span className="text-slate-400 text-xs italic">Converted text appears here instantly...</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Morse Code Audio */}
      {activeToolTab === 'morse' && currentKeyboard.id === 'morse' && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              {t.morseAudioTitle || 'Morse Audio Synthesizer (700Hz CW Tone)'}
            </span>
            <button
              onClick={handlePlayMorse}
              disabled={isPlayingMorse || !editorText}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-all cursor-pointer ${
                isPlayingMorse 
                  ? 'bg-amber-500 animate-pulse' 
                  : 'bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40'
              }`}
            >
              {isPlayingMorse ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingMorse ? (t.morsePlaying || 'Playing beeps...') : (t.morsePlay || 'Play Morse Code')}</span>
            </button>
          </div>
          <p className="text-xs text-slate-500">
            {t.morseDesc || 'Click "Play Morse Code" to synthesize the audio beeps (. = 1 unit, - = 3 units, 700Hz) of the dots and dashes in the editor.'}
          </p>
        </div>
      )}
    </div>
  );
};
