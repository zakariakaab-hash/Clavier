import React, { useState } from 'react';
import { 
  Copy, Check, Volume2, Download, Trash2, RotateCcw, 
  ZoomIn, ZoomOut, Search, ExternalLink, Globe, 
  Sparkles, FileText, Share2, Maximize2, Minimize2,
  Sun, Moon, Space, HelpCircle, Keyboard as KeyboardIcon, CheckCircle2
} from 'lucide-react';
import { KeyboardLayout } from '../types';
import { ALL_KEYBOARDS } from '../data/keyboards';
import { removeDiacritics } from '../utils/transliterate';
import { processPhysicalKeyStroke } from '../utils/keyboardEngine';
import { playKeyClickSound, playSpacebarSound, playBackspaceSound } from '../utils/audio';
import { SupportedLocale, TRANSLATIONS, TranslationDict, getTranslation } from '../utils/i18n';

interface EditorPadProps {
  text: string;
  onChangeText: (newText: string) => void;
  currentKeyboard: KeyboardLayout;
  onSelectKeyboard: (kb: KeyboardLayout) => void;
  activeFontSize: number;
  onChangeFontSize: (size: number) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onInsertSpace: () => void;
  soundEnabled?: boolean;
  phoneticMode?: boolean;
  onTogglePhoneticMode?: () => void;
  currentLocale?: SupportedLocale;
}

export const EditorPad: React.FC<EditorPadProps> = ({
  text,
  onChangeText,
  currentKeyboard,
  onSelectKeyboard,
  activeFontSize,
  onChangeFontSize,
  textareaRef,
  theme,
  onToggleTheme,
  onInsertSpace,
  soundEnabled = true,
  phoneticMode = true,
  onTogglePhoneticMode,
  currentLocale = 'en'
}) => {
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [history, setHistory] = useState<string[]>([text]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const t = getTranslation(currentLocale);
  const isDarkMode = theme === 'dark';

  // Sync history
  const handleTextChange = (newVal: string) => {
    onChangeText(newVal);
    const newHist = history.slice(0, historyIndex + 1);
    newHist.push(newVal);
    setHistory(newHist);
    setHistoryIndex(newHist.length - 1);
  };

  // Intercept physical keyboard typing to map directly to the chosen language
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow system combinations (Ctrl+C, Ctrl+V, Ctrl+A, Ctrl+Z, Ctrl+Y, Ctrl+X, Cmd+...)
    if ((e.ctrlKey || e.metaKey) && e.key !== 'AltGraph') {
      return;
    }
    // Allow Alt without Ctrl (system navigation)
    if (e.altKey && !e.ctrlKey && e.key !== 'AltGraph') {
      return;
    }

    if (e.key === 'Backspace') {
      if (soundEnabled) playBackspaceSound();
      return;
    }
    if (e.key === 'Enter') {
      if (soundEnabled) playKeyClickSound();
      return;
    }
    if (e.key === 'Tab' || e.key.startsWith('F') && e.key.length > 1) {
      return;
    }

    // Process all printable keys and space
    if (e.key.length === 1) {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const result = processPhysicalKeyStroke(
        e.key,
        e.code,
        e.shiftKey,
        e.getModifierState('AltGraph'),
        text,
        start,
        end,
        currentKeyboard,
        phoneticMode
      );

      if (result.handled) {
        e.preventDefault();
        handleTextChange(result.newText);

        if (soundEnabled) {
          if (e.key === ' ') playSpacebarSound();
          else playKeyClickSound();
        }

        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(result.newCursor, result.newCursor);
          }
        }, 0);
      }
    }
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
    a.download = `${currentKeyboard.id}-keyboard-text.txt`;
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

  // External Search & Translate Queries
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
    <div className={`rounded-xl sm:rounded-2xl border transition-all duration-200 flex flex-col shadow-sm w-full max-w-full relative flex-1 min-h-0 md:flex-initial ${
      isDarkMode 
        ? 'bg-[#0f172a] border-slate-800 text-slate-100' 
        : 'bg-white border-slate-200 text-slate-800'
    } ${isExpanded ? 'fixed inset-2 sm:inset-4 z-50 shadow-2xl overflow-y-auto' : ''}`}>
      
      {/* Top Header Bar of Editor with Keyboard Switcher & Script Title (Hidden on mobile <768px, visible on md+) */}
      <div className={`hidden md:flex px-2.5 sm:px-3 md:px-4 py-2 md:py-3 border-b flex-wrap items-center justify-between gap-1.5 md:gap-3 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        
        {/* Left: Script Title & Flag */}
        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
          <span className="text-lg sm:text-xl md:text-2xl shrink-0">{currentKeyboard.flag || '🌐'}</span>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
              <h2 className="text-xs sm:text-sm md:text-base font-extrabold text-emerald-500 font-sans tracking-wide">
                {currentKeyboard.name.toLowerCase()}
              </h2>
              <span className={`text-xs sm:text-sm md:text-base font-bold text-emerald-600 ${currentKeyboard.fontFamilyClass || ''}`}>
                {currentKeyboard.nativeName}
              </span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap">
              <span className="text-[10px] md:text-[11px] text-slate-400 font-medium">
                {currentKeyboard.direction === 'rtl' ? 'RTL' : 'LTR'} • ISO: {currentKeyboard.isoCode || 'N/A'}
              </span>
              <span className="inline-flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[9px] md:text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Unicode 15.1 Compatible</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right: Keyboard select & Font Controls */}
        <div className="flex items-center gap-1 md:gap-2 flex-wrap ml-auto">
          {/* Quick Select Dropdown */}
          <select
            id="keyboard-quick-select"
            value={currentKeyboard.id}
            onChange={(e) => {
              const selected = ALL_KEYBOARDS.find(k => k.id === e.target.value);
              if (selected) onSelectKeyboard(selected);
            }}
            className={`text-xs font-semibold rounded-lg px-2 md:px-3 py-1.5 border transition-all cursor-pointer outline-hidden touch-manipulation max-w-[125px] sm:max-w-[170px] md:max-w-[220px] truncate ${
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

          {/* Sample Text Button */}
          {currentKeyboard.sampleText && (
            <button
              onClick={handleInsertSample}
              title="Insert sample text"
              className="text-[11px] md:text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-1.5 md:px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer touch-manipulation active:scale-95"
            >
              Sample
            </button>
          )}

          {/* Zoom controls */}
          <div className={`flex items-center rounded-lg border p-0.5 ${
            isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-300 shadow-2xs'
          }`}>
            <button
              onClick={() => onChangeFontSize(Math.max(14, activeFontSize - 2))}
              title="Zoom Out"
              className="p-1 md:p-1.5 text-slate-400 hover:text-slate-200 rounded cursor-pointer touch-manipulation active:scale-95"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] md:text-xs px-1 md:px-2 font-mono font-medium min-w-5 md:min-w-8 text-center">
              {activeFontSize}px
            </span>
            <button
              onClick={() => onChangeFontSize(Math.min(48, activeFontSize + 2))}
              title="Zoom In"
              className="p-1 md:p-1.5 text-slate-400 hover:text-slate-200 rounded cursor-pointer touch-manipulation active:scale-95"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Undo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo"
            className={`p-1.5 border rounded-lg disabled:opacity-30 cursor-pointer touch-manipulation active:scale-95 ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-600 shadow-2xs'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Textarea Area */}
      <div className="p-1.5 sm:p-3.5 md:p-5 flex flex-col flex-1 min-h-0 gap-1 sm:gap-2.5 md:gap-3">
        <textarea
          ref={textareaRef}
          id="kp-editor-textarea"
          value={text}
          onChange={e => handleTextChange(e.target.value)}
          onKeyDown={handleKeyDown}
          dir={currentKeyboard.direction}
          placeholder={`${t.editorPlaceholder} (${currentKeyboard.name})`}
          className={`w-full flex-1 min-h-[60px] sm:min-h-[110px] md:min-h-[160px] p-2 sm:p-3 md:p-4 rounded-xl border focus:outline-hidden transition-all resize-none md:resize-y font-sans shadow-inner touch-manipulation text-sm sm:text-base md:text-[var(--active-font-size)] ${
            isDarkMode 
              ? 'bg-[#1e293b] text-white border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-500' 
              : 'bg-slate-50/70 text-slate-900 border-slate-300 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent placeholder-slate-400'
          } ${currentKeyboard.fontFamilyClass || ''}`}
          style={{ 
            ['--active-font-size' as any]: `${activeFontSize}px`,
            lineHeight: 1.5 
          }}
        />

        {/* Active Physical Keyboard Mapping Info Bar (Hidden on mobile <768px, visible on md+) */}
        <div className={`hidden md:flex items-center justify-between text-[11px] md:text-xs px-2 md:px-2.5 py-1 md:py-1.5 rounded-lg border gap-1.5 md:gap-2 ${
          isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-emerald-50/70 border-emerald-200/70 text-emerald-900'
        }`}>
          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap">
            <span className="flex items-center gap-1 font-semibold shrink-0">
              <KeyboardIcon className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">{t.physicalTypingLabel}</span>
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-[11px] md:text-xs">
              {t.physicalTypingDesc} <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{currentKeyboard.name}</strong>
            </span>
          </div>

          {currentKeyboard.hasPhoneticMode && onTogglePhoneticMode && (
            <button
              onClick={onTogglePhoneticMode}
              className={`flex items-center gap-1 px-1.5 md:px-2 py-0.5 rounded text-[10px] md:text-[11px] font-bold transition-all cursor-pointer border touch-manipulation active:scale-95 shrink-0 ${
                phoneticMode 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs' 
                  : (isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-slate-600 border-slate-300')
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>{t.phoneticMode} {phoneticMode ? t.phoneticActive : t.phoneticStandard}</span>
            </button>
          )}
        </div>

        {/* Classic Toolbar Button Row (Hidden on mobile <768px, visible on md+) */}
        <div className={`hidden md:flex items-center justify-between pt-1.5 md:pt-2 border-t flex-wrap gap-1 md:gap-2 ${
          isDarkMode ? 'border-slate-800' : 'border-slate-200'
        }`}>
          
          {/* Action buttons */}
          <div className="flex items-center gap-1 md:gap-1.5 flex-wrap">
            
            {/* Copier */}
            <button
              id="copy-text-btn"
              onClick={handleCopy}
              disabled={!text}
              className={`flex items-center gap-1 md:gap-1.5 text-[11px] md:text-xs font-semibold px-2 md:px-3 py-1.5 md:py-2 rounded-lg border transition-all cursor-pointer shadow-xs disabled:opacity-40 active:scale-95 touch-manipulation min-h-[36px] md:min-h-[38px] ${
                copied 
                  ? 'bg-emerald-600 text-white border-emerald-600' 
                  : (isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 active:bg-slate-650' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 active:bg-slate-100')
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? t.copied : t.copyText}</span>
            </button>

            {/* Enregistrer (Download txt) */}
            <button
              onClick={handleDownload}
              disabled={!text}
              className={`flex items-center gap-1 md:gap-1.5 text-[11px] md:text-xs font-semibold px-2 md:px-3 py-1.5 md:py-2 rounded-lg border transition-all cursor-pointer shadow-xs disabled:opacity-40 active:scale-95 touch-manipulation min-h-[36px] md:min-h-[38px] ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.saveText || 'Save'}</span>
            </button>

            {/* Google Translate */}
            <a
              href={getGoogleTranslateUrl()}
              target="_blank"
              rel="noreferrer"
              title="Translate with Google Translate"
              className={`flex items-center gap-1 md:gap-1.5 text-[11px] md:text-xs font-semibold px-2 md:px-3 py-1.5 md:py-2 rounded-lg border transition-all cursor-pointer shadow-xs active:scale-95 touch-manipulation min-h-[36px] md:min-h-[38px] ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{currentLocale === 'fr' ? 'Traduire' : currentLocale === 'ar' ? 'ترجمة' : currentLocale === 'es' ? 'Traducir' : 'Translate'}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50 ml-0.5" />
            </a>

            {/* Google Search */}
            <a
              href={getGoogleSearchUrl()}
              target="_blank"
              rel="noreferrer"
              title="Search with Google"
              className={`flex items-center gap-1 md:gap-1.5 text-[11px] md:text-xs font-semibold px-2 md:px-3 py-1.5 md:py-2 rounded-lg border transition-all cursor-pointer shadow-xs active:scale-95 touch-manipulation min-h-[36px] md:min-h-[38px] ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>{currentLocale === 'fr' ? 'Recherche Google' : currentLocale === 'ar' ? 'بحث Google' : currentLocale === 'es' ? 'Buscar en Google' : 'Google Search'}</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-50 ml-0.5" />
            </a>

            {/* Espace (Space) */}
            <button
              onClick={onInsertSpace}
              className={`flex items-center gap-1 md:gap-1.5 text-[11px] md:text-xs font-semibold px-2 md:px-3 py-1.5 md:py-2 rounded-lg border transition-all cursor-pointer shadow-xs active:scale-95 touch-manipulation min-h-[36px] md:min-h-[38px] ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              <Space className="w-3.5 h-3.5" />
              <span>{t.space}</span>
            </button>

            {/* Déployer (Full Screen / Expand) */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? t.exitFullscreen : t.fullscreen}
              className={`flex items-center gap-1 md:gap-1.5 text-[11px] md:text-xs font-semibold px-2 md:px-3 py-1.5 md:py-2 rounded-lg border transition-all cursor-pointer shadow-xs active:scale-95 touch-manipulation min-h-[36px] md:min-h-[38px] ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700' : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
              }`}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isExpanded ? t.exitFullscreen : t.fullscreen}</span>
            </button>

            {/* Clear button (❌) */}
            <button
              onClick={() => handleTextChange('')}
              disabled={!text}
              title={t.clearText}
              className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg border transition-all cursor-pointer shadow-xs disabled:opacity-30 active:scale-95 touch-manipulation ${
                isDarkMode ? 'bg-slate-800 hover:bg-rose-950 text-rose-400 border-slate-700' : 'bg-white hover:bg-rose-50 text-rose-600 border-slate-300'
              }`}
            >
              ❌
            </button>
          </div>

          {/* Right Side: Speech & Character Stats */}
          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
            {/* Audio Speech */}
            <button
              onClick={handleSpeak}
              disabled={!text}
              title={t.listenSpeech}
              className={`p-1.5 md:p-2 rounded-lg border transition-all cursor-pointer touch-manipulation active:scale-95 min-h-[36px] min-w-[36px] md:min-h-[38px] md:min-w-[38px] flex items-center justify-center ${
                speaking
                  ? 'bg-amber-500 text-white border-amber-600 animate-pulse'
                  : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-300 text-slate-700')
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {/* Stats */}
            <span className="text-xs text-slate-400 font-mono hidden md:inline ml-1">
              {charCount} {t.charsCount || 'chars'} • {wordCount} {t.wordsCount || 'words'}
            </span>
          </div>
        </div>

        {/* Client-Side Privacy Notice (Hidden on mobile <768px, visible on md+) */}
        <div className={`hidden md:flex mt-0.5 pt-1 md:mt-1 md:pt-2 border-t items-center justify-between text-[10px] md:text-[11px] px-0.5 md:px-1 ${
          isDarkMode ? 'border-slate-800/80 text-slate-400' : 'border-slate-100 text-slate-500'
        }`}>
          <div className="flex items-center gap-1.5 font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 dark:text-slate-300 font-semibold">
              {currentLocale === 'fr' 
                ? "Votre texte saisi reste dans votre navigateur." 
                : currentLocale === 'ar' 
                ? "النص المكتوب يظل داخل متصفحك." 
                : "Your typed text stays in your browser."}
            </span>
            <span className="hidden sm:inline text-slate-400">
              ({currentLocale === 'fr' 
                ? "Traitement 100 % côté client, aucune donnée personnelle stockée sur serveur." 
                : currentLocale === 'ar' 
                ? "معالجة محلية 100%، لا نقوم بتخزين أي نصوص." 
                : "100% client-side, no personal text stored on servers."})
            </span>
          </div>
          <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-600 dark:text-emerald-400">
            Privacy First
          </span>
        </div>
      </div>
    </div>
  );
};
