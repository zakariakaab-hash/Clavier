import React, { useState } from 'react';
import { 
  Sparkles, X, BookOpen, Globe, ArrowRight, Loader2, 
  Copy, Check, FileText, Bookmark, Share2, HelpCircle 
} from 'lucide-react';
import { KeyboardLayout } from '../types';
import { ParrotLogo } from './ParrotLogo';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentKeyboard: KeyboardLayout;
  initialText: string;
  onApplyToEditor: (text: string) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  currentKeyboard,
  initialText,
  onApplyToEditor,
}) => {
  const [inputText, setInputText] = useState(initialText || currentKeyboard.sampleText || '');
  const [activeTab, setActiveTab] = useState<'transliterate' | 'etymology'>('transliterate');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRunAI = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      let res: Response;
      if (activeTab === 'transliterate') {
        res = await fetch('/api/ai/transliterate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: inputText,
            targetLanguage: currentKeyboard.name,
            sourceLanguage: currentKeyboard.name,
            sourceScript: currentKeyboard.nativeName || currentKeyboard.name,
          }),
        });
      } else {
        res = await fetch('/api/ai/etymology', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            word: inputText,
            language: currentKeyboard.name,
          }),
        });
      }

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const textError = await res.text();
        throw new Error(
          res.status === 503 || res.status === 404
            ? 'The AI linguistic service is currently starting or unavailable. Please try again in a few seconds.'
            : (textError.slice(0, 100) || `Server error (${res.status})`)
        );
      }

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
      }

      setResult(data);
    } catch (err: any) {
      console.error('AI request error:', err);
      setError(err.message || 'AI request failed. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ParrotLogo size={34} />
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                KeypadKing AI Linguistic Engine
                <span className="text-[10px] font-semibold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  Gemini Flash
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Advanced philological analysis, IPA phonetics & historical etymology
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 gap-2 text-xs font-semibold">
          <button
            onClick={() => {
              setActiveTab('transliterate');
              setResult(null);
            }}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'transliterate'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Phonetic & Semantic Analysis</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('etymology');
              setResult(null);
            }}
            className={`flex items-center gap-1.5 pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'etymology'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Lexilogos Etymology & Cognates</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          
          {/* Query Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {activeTab === 'transliterate' ? `Text to analyze in ${currentKeyboard.name}:` : `Word to look up in ${currentKeyboard.name}:`}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                dir={currentKeyboard.direction}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={currentKeyboard.sampleText || `Enter word or phrase...`}
                className={`flex-1 p-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden text-slate-900 ${
                  currentKeyboard.fontFamilyClass || ''
                }`}
              />
              <button
                id="run-ai-analysis-btn"
                onClick={handleRunAI}
                disabled={loading || !inputText.trim()}
                className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-xs rounded-xl shadow-xs shadow-indigo-200 transition-all shrink-0"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-amber-300" />}
                <span>{loading ? 'Analyzing...' : 'Analyze'}</span>
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
              {error}
            </div>
          )}

          {/* Results Output */}
          {result && activeTab === 'transliterate' && (
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-indigo-900 uppercase">Analysis Results</span>
                <div className="flex items-center gap-2">
                  {result.convertedText && (
                    <button
                      onClick={() => onApplyToEditor(result.convertedText)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded border border-indigo-200 transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>Insert in Editor</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleCopy(JSON.stringify(result, null, 2))}
                    className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Target Script / Converted</span>
                  <span className="text-base font-bold text-indigo-900">{result.convertedText || result.transliteration || 'N/A'}</span>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">IPA Phonetic Transcription</span>
                  <span className="text-sm font-mono text-indigo-700">{result.ipa ? `/${result.ipa}/` : 'N/A'}</span>
                </div>
              </div>

              {result.romanization && (
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Romanization / Latin Reading</span>
                  <span className="text-sm font-medium text-slate-800">{result.romanization}</span>
                </div>
              )}

              {result.translation && (
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">English Meaning</span>
                  <p className="text-sm text-slate-800">{result.translation}</p>
                </div>
              )}

              {(result.linguisticNotes || result.notes) && (
                <div className="p-2.5 bg-indigo-50/50 rounded-lg border border-indigo-100">
                  <span className="text-[10px] font-bold text-indigo-700 block uppercase">Linguistic & Grammatical Notes</span>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">{result.linguisticNotes || result.notes}</p>
                </div>
              )}

              {result.breakdown && Array.isArray(result.breakdown) && result.breakdown.length > 0 && (
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase mb-2">Character-by-Character Breakdown</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {result.breakdown.map((item: any, idx: number) => (
                      <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-100 text-xs">
                        <div className="font-bold text-slate-900 text-sm">{item.token}</div>
                        <div className="text-[11px] text-indigo-600 font-mono">{item.pronunciation}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{item.meaning || item.unicode}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {result && activeTab === 'etymology' && (
            <div className="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold text-indigo-900 uppercase">Lexilogos Philological Profile</span>
                <span className="text-xs font-bold text-indigo-700">{result.language || currentKeyboard.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Word</span>
                  <span className="text-sm font-bold text-slate-900">{result.word || inputText}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Part of Speech / Script</span>
                  <span className="text-xs font-semibold text-indigo-600">{result.partOfSpeech || result.script || 'N/A'}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">IPA</span>
                  <span className="text-sm font-mono text-slate-700">{result.pronunciation || result.ipa || 'N/A'}</span>
                </div>
              </div>

              {result.meanings && Array.isArray(result.meanings) && result.meanings.length > 0 && (
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1.5">Meanings & Usage</span>
                  <div className="space-y-1.5">
                    {result.meanings.map((m: any, idx: number) => (
                      <div key={idx} className="text-xs text-slate-700">
                        <span className="font-semibold text-slate-900">{idx + 1}. </span>
                        <span>{typeof m === 'string' ? m : m.definition}</span>
                        {typeof m === 'object' && m.example && (
                          <div className="text-[11px] text-slate-500 italic mt-0.5">"{m.example}"</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.etymology && (
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1">Historical Origin & Etymology</span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {typeof result.etymology === 'string'
                      ? result.etymology
                      : `${result.etymology.immediateOrigin || ''} ${result.etymology.classicalOrigin || ''} ${result.etymology.protoIndoEuropeanRoot || ''} ${result.etymology.semanticDevelopment || ''}`}
                  </p>
                </div>
              )}

              {result.variants && Array.isArray(result.variants) && result.variants.length > 0 && (
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1.5">Spelling & Dialectal Variants</span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.variants.map((v: string, idx: number) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-mono">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-300 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
