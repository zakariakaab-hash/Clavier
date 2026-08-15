import React, { useState } from 'react';
import { 
  Copy, Check, Volume2, Download, Trash2, RotateCcw, 
  ZoomIn, ZoomOut, Search, ExternalLink, Globe, BookOpen, 
  Sparkles, FileText, Share2, Maximize2, Minimize2,
  Sun, Moon, Space, HelpCircle
} from 'lucide-react';
import { KeyboardLayout } from '../types';
import { ALL_KEYBOARDS } from '../data/keyboards';
import { removeDiacritics } from '../utils/transliterate';

interface EditorPadProps {
  text: string;
  onChangeText: (newText: string) => void;
  currentKeyboard: KeyboardLayout;
  onSelectKeyboard: (kb: KeyboardLayout) => void;
  onOpenAIModal: () => void;
  activeFontSize: number;
  onChangeFontSize: (size: number) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onInsertSpace: () => void;
}

export const EditorPad: React.FC<EditorPadProps> = ({
  text,
  onChangeText,
  currentKeyboard,
  onSelectKeyboard,
  onOpenAIModal,
  activeFontSize,
  onChangeFontSize,
  textareaRef,
  theme,
  onToggleTheme,
  onInsertSpace
}) => {
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [history, setHistory] = useState<string[]>([text]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDictMenu, setShowDictMenu] = useState(false);

  const isDarkMode = theme === 'dark';

  // Sync history
  const handleTextChange = (newVal: string) => {
    onChangeText(newVal);
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newVal);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      onChangeText(prev);
    }
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentKeyboard.id}-lexilogos-text.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSpeak = () => {
    if (!text || !('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    if (currentKeyboard.isoCode) {
      utterance.lang = currentKeyboard.isoCode;
    }
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleStripDiacritics = () => {
    if (!text) return;
    const stripped = removeDiacritics(text);
    handleTextChange(stripped);
  };

  const handleInsertSample = () => {
    if (currentKeyboard.sampleText) {
      handleTextChange(text ? `${text} ${currentKeyboard.sampleText}` : currentKeyboard.sampleText);
    }
  };

  // Word count & Unicode stats
  const charCount = Array.from(text).length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const byteSize = new Blob([text]).size;

  // External Dictionary Queries
  const getWikipediaUrl = () => {
    const lang = currentKeyboard.externalLinks?.wikipediaLang || currentKeyboard.isoCode || 'en';
    const query = encodeURIComponent(text.trim() || currentKeyboard.name);
    return `https://${lang}.wikipedia.org/wiki/Special:Search?search=${query}`;
  };

  const getWiktionaryUrl = () => {
    const lang = currentKeyboard.externalLinks?.wiktionaryLang || currentKeyboard.isoCode || 'en';
    const query = encodeURIComponent(text.trim() || currentKeyboard.name);
    return `https://${lang}.wiktionary.org/wiki/Special:Search?search=${query}`;
  };

  const getGoogleTranslateUrl = () => {
    const query = encodeURIComponent(text.trim());
    const srcLang = currentKeyboard.isoCode || 'auto';
    return `https://translate.google.com/?sl=${srcLang}&tl=en&text=${query}&op=translate`;
  };

  const getGoogleSearchUrl = () => {
    const query = encodeURIComponent(text.trim());
    return `https://www.google.com/search?q=${query}`;
  };

  return (
    <div className={`rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col shadow-sm ${
      isDarkMode 
        ? 'bg-[#0f172a] border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-800'
    } ${isExpanded ? 'fixed inset-4 z-50 shadow-2xl' : ''}`}>
      
      {/* Top Header Bar of Editor with Keyboard Switcher & Script Title */}
      <div className={`px-4 py-3 border-b flex flex-wrap items-center justify-between gap-3 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        
        {/* Left: Script Title & Flag */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentKeyboard.flag || '🌐'}</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-emerald-500 font-sans tracking-wide">
                {currentKeyboard.name.toLowerCase()}
              </h2>
              <span className={`text-base font-bold text-emerald-600 ${currentKeyboard.fontFamilyClass || ''}`}>
                {currentKeyboard.nativeName}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">
              {currentKeyboard.direction === 'rtl' ? 'De droite à gauche (RTL)' : 'De gauche à droite (LTR)'} • ISO: {currentKeyboard.isoCode || 'N/A'}
            </span>
          </div>
        </div>

        {/* Center: "changer de clavier" dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="keyboard-quick-select" className="text-xs font-semibold text-slate-400 hidden md:inline">
            Changer de clavier :
          </label>
          <select
            id="keyboard-quick-select"
            value={currentKeyboard.id}
            onChange={(e) => {
              const selected = ALL_KEYBOARDS.find(k => k.id === e.target.value);
              if (selected) onSelectKeyboard(selected);
            }}
            className={`text-xs font-semibold rounded-lg px-3 py-1.5 border transition-all cursor-pointer outline-hidden ${
              isDarkMode 
                ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:border-emerald-500' 
                : 'bg-white text-emerald-800 border-slate-300 hover:border-emerald-600 shadow-2xs'
            }`}
          >
            {ALL_KEYBOARDS.map((kb) => (
              <option key={kb.id} value={kb.id}>
                {kb.flag} {kb.name} ({kb.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Right: Font Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {currentKeyboard.sampleText && (
            <button
              onClick={handleInsertSample}
              title="Insérer un exemple de texte"
              className="text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Exemple
            </button>
          )}

          {/* Zoom controls */}
          <div className={`flex items-center rounded-lg border p-0.5 ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300 shadow-2xs'
          }`}>
            <button
              onClick={() => onChangeFontSize(Math.max(14, activeFontSize - 2))}
              title="Diminuer la taille de police"
              className="p-1 text-slate-400 hover:text-slate-200 rounded cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs px-2 font-mono font-medium min-w-8 text-center">
              {activeFontSize}px
            </span>
            <button
              onClick={() => onChangeFontSize(Math.min(48, activeFontSize + 2))}
              title="Augmenter la taille de police"
              className="p-1 text-slate-400 hover:text-slate-200 rounded cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Undo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Annuler"
            className={`p-1.5 border rounded-lg disabled:opacity-30 cursor-pointer ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-600 shadow-2xs'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Textarea Area */}
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          id="lexi-editor-textarea"
          value={text}
          onChange={e => handleTextChange(e.target.value)}
          dir={currentKeyboard.direction}
          placeholder={`Écrivez ici avec le clavier virtuel ou votre clavier d'ordinateur... (${currentKeyboard.name})`}
          style={{ fontSize: `${activeFontSize}px`, lineHeight: 1.6 }}
          className={`w-full min-h-[140px] sm:min-h-[160px] p-4 rounded-xl border focus:outline-hidden transition-all resize-y font-sans shadow-inner ${
            isDarkMode 
              ? 'bg-[#1e293b] text-white border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500' 
              : 'bg-slate-50/70 text-slate-900 border-slate-300 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400'
          } ${currentKeyboard.fontFamilyClass || ''}`}
        />

        {/* Classic Lexilogos Toolbar Button Row */}
        <div className={`flex items-center justify-between pt-2 border-t flex-wrap gap-2 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          
          {/* Action buttons (copier, enregistrer, fichier, dictionnaire, espace, déployer, mode clair, ❌) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            
            {/* Copier */}
            <button
              id="copy-text-btn"
              onClick={handleCopy}
              disabled={!text}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-xs disabled:opacity-40 active:scale-95 ${
                copied 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : (isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300')
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié !' : 'copier'}</span>
            </button>

            {/* Enregistrer (Download txt) */}
            <button
              onClick={handleDownload}
              disabled={!text}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-xs disabled:opacity-40 ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>enregistrer</span>
            </button>

            {/* Dictionnaire Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDictMenu(!showDictMenu)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                  isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                <span>dictionnaire</span>
              </button>

              {showDictMenu && (
                <div className={`absolute top-full left-0 mt-1 w-56 rounded-xl border shadow-xl p-2 z-50 ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
                }`}>
                  <a
                    href={getWiktionaryUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Wiktionnaire</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                  <a
                    href={getGoogleTranslateUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Google Traduction</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                  <a
                    href={getWikipediaUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-emerald-500/10 hover:text-emerald-500 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Wikipédia</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                  </a>
                </div>
              )}
            </div>

            {/* Espace (Space) */}
            <button
              onClick={onInsertSpace}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <Space className="w-3.5 h-3.5" />
              <span>espace</span>
            </button>

            {/* Déployer (Full Screen / Expand) */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Réduire' : 'Déployer plein écran'}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isExpanded ? 'réduire' : 'déployer'}</span>
            </button>

            {/* Mode clair / Mode sombre toggle */}
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer shadow-xs ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{isDarkMode ? 'mode clair' : 'mode sombre'}</span>
            </button>

            {/* Clear button (❌) */}
            <button
              onClick={() => handleTextChange('')}
              disabled={!text}
              title="Effacer tout le texte"
              className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all cursor-pointer shadow-xs disabled:opacity-30 ${
                isDarkMode ? 'bg-slate-800 hover:bg-rose-950 text-rose-400 border-slate-700' : 'bg-white hover:bg-rose-50 text-rose-600 border-slate-300'
              }`}
            >
              ❌
            </button>
          </div>

          {/* Right Side: AI Assistant & Speech & Character Stats */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* AI Assistant */}
            <button
              onClick={onOpenAIModal}
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>IA Traducteur</span>
            </button>

            {/* Audio Speech */}
            <button
              onClick={handleSpeak}
              disabled={!text}
              title="Écouter la prononciation"
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                speaking
                  ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                  : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700')
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Stats */}
            <span className="text-xs text-slate-400 font-mono hidden sm:inline ml-1">
              {charCount} caractères • {wordCount} mots
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
