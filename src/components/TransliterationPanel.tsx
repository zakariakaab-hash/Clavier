import React, { useState, useEffect } from 'react';
import { 
  ArrowLeftRight, Sparkles, Copy, Check, Play, Square, 
  Code, Info, Type, AlignLeft, RefreshCw 
} from 'lucide-react';
import { KeyboardLayout } from '../types';
import { transliterateText } from '../utils/transliterate';
import { playMorseTone } from '../utils/audio';

interface TransliterationPanelProps {
  currentKeyboard: KeyboardLayout;
  editorText: string;
  onApplyToEditor: (text: string) => void;
}

export const TransliterationPanel: React.FC<TransliterationPanelProps> = ({
  currentKeyboard,
  editorText,
  onApplyToEditor,
}) => {
  const [latinInput, setLatinInput] = useState('');
  const [activeToolTab, setActiveToolTab] = useState<'transliterate' | 'unicode' | 'morse'>('transliterate');
  const [copiedTranslit, setCopiedTranslit] = useState(false);
  const [isPlayingMorse, setIsPlayingMorse] = useState(false);

  // Live transliterate latin input
  const convertedScript = transliterateText(latinInput, currentKeyboard.id);

  // Unicode breakdown of current editor text
  const unicodeDetails = Array.from(editorText).map((char: string) => {
    const codePoint = char.codePointAt(0) || 0;
    const hex = 'U+' + codePoint.toString(16).toUpperCase().padStart(4, '0');
    return { char, codePoint, hex };
  });

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
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 overflow-hidden">
      
      {/* Tool Navigation Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1 text-xs font-semibold">
        <button
          onClick={() => setActiveToolTab('transliterate')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
            activeToolTab === 'transliterate'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>Latin ⇄ Script Transliteration</span>
        </button>

        <button
          onClick={() => setActiveToolTab('unicode')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
            activeToolTab === 'unicode'
              ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80 font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          <span>Unicode Inspector (U+XXXX)</span>
        </button>

        {currentKeyboard.id === 'morse' && (
          <button
            onClick={() => setActiveToolTab('morse')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeToolTab === 'morse'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Play className="w-3.5 h-3.5 text-amber-500" />
            <span>Morse Audio Synthesizer</span>
          </button>
        )}
      </div>

      {/* Tab 1: Latin to Script Live Transliteration */}
      {activeToolTab === 'transliterate' && (
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Live Phonetic / Latin Transliteration for {currentKeyboard.name}
            </span>
            <button
              onClick={() => setLatinInput('')}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Input Latin */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Type in Latin (English alphabet):
              </label>
              <textarea
                value={latinInput}
                onChange={e => setLatinInput(e.target.value)}
                placeholder="Type Latin letters here (e.g. 'salam', 'privet', 'namaste', 'arigato')..."
                className="w-full h-24 p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Converted Output */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-600">
                  Target Output ({currentKeyboard.name}):
                </label>
                {convertedScript && (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onApplyToEditor(convertedScript)}
                      className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200"
                    >
                      Insert to Editor
                    </button>
                    <button
                      onClick={async () => {
                        await navigator.clipboard.writeText(convertedScript);
                        setCopiedTranslit(true);
                        setTimeout(() => setCopiedTranslit(false), 2000);
                      }}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200"
                    >
                      {copiedTranslit ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                )}
              </div>
              <div 
                dir={currentKeyboard.direction}
                className={`w-full h-24 p-2.5 text-base bg-indigo-50/40 border border-indigo-100 rounded-xl text-slate-900 overflow-y-auto ${
                  currentKeyboard.fontFamilyClass || ''
                }`}
              >
                {convertedScript || <span className="text-slate-400 text-xs italic">Converted script appears here in real-time...</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Unicode Code Point Inspector */}
      {activeToolTab === 'unicode' && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-indigo-600" />
              Unicode Code Point & Byte Analysis
            </span>
            <span className="text-xs text-slate-500">
              {unicodeDetails.length} characters in editor
            </span>
          </div>

          {unicodeDetails.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs">
              Type or paste characters into the editor above to inspect their Unicode codes.
            </div>
          ) : (
            <div className="max-h-56 overflow-y-auto scrollbar-thin p-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {unicodeDetails.map((item, idx) => (
                <div 
                  key={`uc-${idx}`}
                  className="p-2 bg-slate-50 rounded-xl border border-slate-200 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all"
                >
                  <span className="text-xl block mb-1 font-normal text-slate-900">
                    {item.char === ' ' ? '␣' : item.char}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-indigo-600 block">
                    {item.hex}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 block">
                    Dec: {item.codePoint}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Morse Code Audio */}
      {activeToolTab === 'morse' && (
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Telegraphic Morse Audio Synthesizer (700Hz CW Tone)
            </span>
            <button
              onClick={handlePlayMorse}
              disabled={isPlayingMorse || !editorText}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white transition-all ${
                isPlayingMorse 
                  ? 'bg-amber-500 animate-pulse' 
                  : 'bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40'
              }`}
            >
              {isPlayingMorse ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlayingMorse ? 'Playing Beeps...' : 'Play Morse Audio'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-500">
            Click "Play Morse Audio" to synthesize standard ITU Morse code beeps (. = 1 unit, - = 3 units, 700Hz tone) for the dots and dashes in your editor text.
          </p>
        </div>
      )}
    </div>
  );
};
