import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, CornerDownLeft, Delete, Space, 
  Sparkles, Layers, Volume2, Info, ChevronDown, 
  ChevronUp, Check, Keyboard as KeyboardIcon, HelpCircle
} from 'lucide-react';
import { KeyboardLayout, KeyDefinition } from '../types';
import { playKeyClickSound, playSpacebarSound, playBackspaceSound } from '../utils/audio';
import { SupportedLocale, getTranslation } from '../utils/i18n';

interface VirtualKeyboardProps {
  currentKeyboard: KeyboardLayout;
  onInsertChar: (char: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  soundEnabled: boolean;
  phoneticMode: boolean;
  onTogglePhoneticMode: () => void;
  theme?: 'dark' | 'light';
  currentLocale?: SupportedLocale;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  currentKeyboard,
  onInsertChar,
  onBackspace,
  onClear,
  soundEnabled,
  phoneticMode,
  onTogglePhoneticMode,
  theme = 'light',
  currentLocale = 'en'
}) => {
  const t = getTranslation(currentLocale);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);
  const [isAltGrActive, setIsAltGrActive] = useState(false);
  const [activeSpecialTab, setActiveSpecialTab] = useState(0);
  const [isSpecialGroupsOpen, setIsSpecialGroupsOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  
  // Prefer Lexilogos view mode if layout has lexilogosRows
  const hasLexilogos = Boolean(currentKeyboard.lexilogosRows && currentKeyboard.lexilogosRows.length > 0);
  const [viewMode, setViewMode] = useState<'lexilogos' | 'hardware'>('lexilogos');

  // Reset viewMode when keyboard changes if necessary
  useEffect(() => {
    if (hasLexilogos) {
      setViewMode('lexilogos');
    } else {
      setViewMode('hardware');
    }
  }, [currentKeyboard.id, hasLexilogos]);

  // Audio helper
  const handleAudio = (type: 'key' | 'space' | 'backspace') => {
    if (!soundEnabled) return;
    if (type === 'space') playSpacebarSound();
    else if (type === 'backspace') playBackspaceSound();
    else playKeyClickSound();
  };

  // Virtual key tap
  const handleKeyClick = (keyDef: KeyDefinition) => {
    let charToInsert = keyDef.char;

    if (isAltGrActive && keyDef.altChar) {
      charToInsert = keyDef.altChar;
    } else if ((isShiftActive || isCapsLockActive) && keyDef.shiftChar) {
      charToInsert = keyDef.shiftChar;
    }

    handleAudio('key');
    onInsertChar(charToInsert);

    if (isShiftActive && !isCapsLockActive) {
      setIsShiftActive(false);
    }
  };

  // Physical modifier keys listener
  useEffect(() => {
    const handlePhysicalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' && target.id !== 'lexi-editor-textarea') {
        return;
      }
      if (e.key === 'Shift') {
        setIsShiftActive(true);
      } else if (e.key === 'AltGraph' || (e.altKey && e.ctrlKey)) {
        setIsAltGrActive(true);
      } else if (e.key === 'CapsLock') {
        setIsCapsLockActive(prev => !prev);
      }
    };

    const handlePhysicalKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setIsShiftActive(false);
      } else if (e.key === 'AltGraph' || (!e.altKey && !e.ctrlKey)) {
        setIsAltGrActive(false);
      }
    };

    window.addEventListener('keydown', handlePhysicalKeyDown);
    window.addEventListener('keyup', handlePhysicalKeyUp);
    return () => {
      window.removeEventListener('keydown', handlePhysicalKeyDown);
      window.removeEventListener('keyup', handlePhysicalKeyUp);
    };
  }, []);

  const effectiveShift = isShiftActive || isCapsLockActive;
  const isDarkMode = theme === 'dark';

  const rowsToRender = (viewMode === 'lexilogos' && currentKeyboard.lexilogosRows) 
    ? currentKeyboard.lexilogosRows 
    : currentKeyboard.rows;

  return (
    <div className={`rounded-2xl border p-2.5 sm:p-4 md:p-5 select-none transition-colors duration-200 shadow-sm w-full max-w-full overflow-hidden ${
      isDarkMode 
        ? 'bg-[#0f172a] text-slate-100 border-slate-800' 
        : 'bg-slate-100/90 text-slate-800 border-slate-200'
    }`}>
      
      {/* Top Header Bar of Virtual Keyboard */}
      <div className={`flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-3 border-b mb-2.5 sm:mb-3 ${
        isDarkMode ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-700'
      }`}>
        
        {/* Left: View Mode Toggle (Original Letters vs Full PC Matrix) */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {hasLexilogos && (
            <div className={`inline-flex p-0.5 rounded-lg border text-xs font-medium ${
              isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
            }`}>
              <button
                onClick={() => setViewMode('lexilogos')}
                className={`px-2.5 sm:px-3 py-1 rounded-md transition-all cursor-pointer font-semibold touch-manipulation active:scale-95 ${
                  viewMode === 'lexilogos'
                    ? (isDarkMode ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-600 text-white shadow-xs')
                    : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                🔤 <span className="hidden xs:inline">{t.originalKeyboard || 'Original'}</span>
              </button>
              <button
                onClick={() => setViewMode('hardware')}
                className={`px-2.5 sm:px-3 py-1 rounded-md transition-all cursor-pointer touch-manipulation active:scale-95 ${
                  viewMode === 'hardware'
                    ? (isDarkMode ? 'bg-emerald-700 text-white shadow-xs' : 'bg-emerald-600 text-white shadow-xs')
                    : (isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                }`}
              >
                ⌨️ <span className="hidden xs:inline">{t.pcMatrix || 'PC Matrix'}</span>
              </button>
            </div>
          )}

          {/* Phonetic typing badge */}
          {currentKeyboard.hasPhoneticMode && (
            <button
              id="phonetic-toggle-btn"
              onClick={onTogglePhoneticMode}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer border touch-manipulation active:scale-95 ${
                phoneticMode
                  ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-2xs ring-1 ring-amber-300'
                  : (isDarkMode 
                      ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750' 
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50')
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.phoneticMode} : {phoneticMode ? t.phoneticActive.toUpperCase() : t.phoneticStandard.toUpperCase()}</span>
              <span className="sm:hidden font-mono">{phoneticMode ? 'PHON ON' : 'PHON OFF'}</span>
            </button>
          )}
        </div>

        {/* Right: Modifiers & Instructions toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setIsCapsLockActive(!isCapsLockActive)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors cursor-pointer touch-manipulation active:scale-95 ${
              isCapsLockActive 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs' 
                : (isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-white text-slate-700 border-slate-300')
            }`}
          >
            {t.capsLock || 'CAPS'} {isCapsLockActive ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer touch-manipulation active:scale-95 ${
              showInstructions 
                ? (isDarkMode ? 'bg-slate-800 text-emerald-400 border-slate-700' : 'bg-emerald-50 text-emerald-800 border-emerald-300')
                : (isDarkMode ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-white text-slate-600 border-slate-300')
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.help || 'Help'}</span>
          </button>
        </div>
      </div>

      {/* Quick Diacritics Strip if available */}
      {currentKeyboard.diacritics && currentKeyboard.diacritics.length > 0 && (
        <div className={`mb-2.5 sm:mb-3 p-1.5 sm:p-2 rounded-xl border flex items-center gap-1.5 overflow-x-auto scrollbar-touch ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
        }`}>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 shrink-0">
            {t.vowelsAndDiacritics || t.diacritics} :
          </span>
          <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap">
            {currentKeyboard.diacritics.map((dia, idx) => (
              <button
                key={`dia-${idx}`}
                onClick={() => {
                  handleAudio('key');
                  onInsertChar(dia);
                }}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center font-bold text-lg sm:text-xl rounded-lg border transition-all shrink-0 cursor-pointer touch-manipulation active:scale-95 ${
                  isDarkMode 
                    ? 'bg-slate-800 hover:bg-slate-700 text-red-400 border-slate-700 active:bg-slate-650' 
                    : 'bg-slate-50 hover:bg-red-50 text-[#a80000] border-slate-200 hover:border-red-300 shadow-2xs active:bg-red-100'
                }`}
              >
                {`◌${dia}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MAIN KEYBOARD AREA: Lexilogos Clavier Mode with Original Keyboard Letters Above Keys */}
      {viewMode === 'lexilogos' ? (
        <div className="space-y-1.5 sm:space-y-2 py-0.5">
          {rowsToRender.map((row, rowIdx) => (
            <div 
              key={`lexi-row-${rowIdx}`} 
              className="flex justify-center items-end gap-1 sm:gap-1.5 md:gap-2 max-w-full"
            >
              {row.map((kDef, kIdx) => {
                const charToShow = kDef.displayChar || kDef.char;

                return (
                  <div key={`lexi-key-${rowIdx}-${kIdx}`} className="flex flex-col items-center flex-1 min-w-[26px] max-w-[54px]">
                    {/* Original Keyboard Letter Guide Centered Above Key */}
                    <span 
                      className={`text-[9px] sm:text-[11px] md:text-xs font-bold tracking-wider h-3.5 sm:h-4 md:h-5 flex items-center justify-center font-mono select-none ${
                        isDarkMode ? 'text-slate-200' : 'text-slate-700'
                      }`}
                    >
                      {kDef.latinGuide || '\u00A0'}
                    </span>

                    {/* Keycap: Rounded Card with Deep Crimson Script Letter */}
                    <button
                      onClick={() => handleKeyClick(kDef)}
                      title={kDef.latinGuide ? `Touche: ${kDef.latinGuide} → ${kDef.char}` : kDef.char}
                      className={`w-full h-10 sm:h-11 md:h-12 bg-white text-[#a80000] hover:text-[#dc2626] active:scale-95 active:bg-slate-50 rounded-lg shadow-sm border border-slate-300 hover:border-red-400 flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl transition-transform cursor-pointer select-none touch-manipulation ${
                        currentKeyboard.fontFamilyClass || ''
                      }`}
                    >
                      {charToShow}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}

          {/* Quick Space & Controls bar */}
          <div className="flex justify-center items-center gap-1.5 sm:gap-2 pt-1.5 sm:pt-2">
            <button
              onClick={() => {
                handleAudio('space');
                onInsertChar(' ');
              }}
              className="flex-1 max-w-md min-h-[42px] sm:min-h-[44px] px-4 py-2.5 bg-white hover:bg-slate-50 active:scale-98 active:bg-slate-100 border border-slate-300 text-slate-700 hover:border-slate-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer touch-manipulation"
            >
              <Space className="w-4 h-4 text-slate-400" />
              <span className="font-mono tracking-widest text-slate-500 uppercase">{t.space}</span>
            </button>

            <button
              onClick={() => {
                handleAudio('backspace');
                onBackspace();
              }}
              className="min-h-[42px] sm:min-h-[44px] px-3.5 sm:px-4 py-2.5 bg-white hover:bg-rose-50 active:scale-95 hover:text-rose-700 border border-slate-300 text-slate-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer touch-manipulation shrink-0"
            >
              <Delete className="w-4 h-4" />
              <span className="hidden xs:inline">{t.backspace}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Standard Full PC Hardware Matrix Mode */
        <div className="space-y-1 sm:space-y-1.5">
          {currentKeyboard.rows.map((row, rowIdx) => (
            <div key={`row-${rowIdx}`} className="flex justify-center gap-0.5 sm:gap-1 md:gap-1.5">
              
              {/* Shift Key on Left of row 3 */}
              {rowIdx === 3 && (
                <button
                  onClick={() => setIsShiftActive(!isShiftActive)}
                  className={`flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all active:scale-95 cursor-pointer shadow-xs touch-manipulation ${
                    isShiftActive 
                      ? 'bg-emerald-600 text-white border border-emerald-600' 
                      : (isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-200 text-slate-600 border-slate-300')
                  }`}
                  style={{ flex: 1.5, minHeight: '38px' }}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Shift</span>
                </button>
              )}

              {/* Row Keys */}
              {row.map((kDef, kIdx) => {
                let displayChar = kDef.char;

                if (isAltGrActive && kDef.altChar) {
                  displayChar = kDef.altChar;
                } else if (effectiveShift && kDef.shiftChar) {
                  displayChar = kDef.shiftChar;
                }

                const isWide = kDef.width === 'wide';
                const isWider = kDef.width === 'wider';

                return (
                  <button
                    key={`key-${rowIdx}-${kIdx}`}
                    onClick={() => handleKeyClick(kDef)}
                    className={`relative group rounded-lg font-medium transition-transform active:scale-95 flex flex-col items-center justify-center p-0.5 sm:p-1.5 border cursor-pointer touch-manipulation select-none ${
                      isAltGrActive && kDef.altChar
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs'
                        : effectiveShift && kDef.shiftChar
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-300 text-[#a80000] hover:border-red-400 shadow-xs'
                    }`}
                    style={{
                      flex: isWider ? 2 : isWide ? 1.5 : 1,
                      minHeight: '38px',
                      maxHeight: '52px',
                    }}
                  >
                    {/* Latin guide / Shift character in top-left */}
                    {(kDef.latinGuide || kDef.shiftChar) && (
                      <span className="absolute top-0.5 left-1 text-[8px] sm:text-[9px] text-slate-500 font-mono font-semibold">
                        {kDef.latinGuide || kDef.shiftChar}
                      </span>
                    )}

                    {/* Main Key Display */}
                    <span className={`text-base sm:text-lg md:text-xl font-bold ${currentKeyboard.fontFamilyClass || ''}`}>
                      {displayChar}
                    </span>
                  </button>
                );
              })}

              {/* Backspace on Row 0 */}
              {rowIdx === 0 && (
                <button
                  onClick={() => {
                    handleAudio('backspace');
                    onBackspace();
                  }}
                  className={`flex items-center justify-center px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all active:scale-95 shadow-xs cursor-pointer touch-manipulation ${
                    isDarkMode ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-slate-200 text-slate-700 border border-slate-300'
                  }`}
                  style={{ flex: 1.5, minHeight: '38px' }}
                >
                  <Delete className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">{t.backspace}</span>
                </button>
              )}

              {/* Shift on Row 3 Right */}
              {rowIdx === 3 && (
                <button
                  onClick={() => setIsShiftActive(!isShiftActive)}
                  className={`flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-bold tracking-wider uppercase transition-all active:scale-95 cursor-pointer shadow-xs touch-manipulation ${
                    isShiftActive 
                      ? 'bg-emerald-600 text-white border border-emerald-600' 
                      : (isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-200 text-slate-600 border border-slate-300')
                  }`}
                  style={{ flex: 1.5, minHeight: '38px' }}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Shift</span>
                </button>
              )}
            </div>
          ))}

          {/* Spacebar Row */}
          <div className="flex justify-center gap-1 sm:gap-1.5 pt-1">
            <button
              onClick={() => setIsCapsLockActive(!isCapsLockActive)}
              className={`px-2.5 sm:px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs touch-manipulation active:scale-95 ${
                isCapsLockActive 
                  ? 'bg-emerald-600 text-white border border-emerald-600' 
                  : (isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-200 text-slate-600 border border-slate-300')
              }`}
              style={{ flex: 1.5, minHeight: '40px' }}
            >
              {t.capsLock || 'Caps'}
            </button>

            <button
              onClick={() => {
                handleAudio('space');
                onInsertChar(' ');
              }}
              className="px-4 py-2 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 text-slate-500 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 shadow-xs cursor-pointer touch-manipulation"
              style={{ flex: 6, minHeight: '40px' }}
            >
              <Space className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline font-mono tracking-widest text-slate-400 uppercase">{t.space}</span>
            </button>

            <button
              onClick={() => {
                handleAudio('key');
                onInsertChar('\n');
              }}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs cursor-pointer touch-manipulation"
              style={{ flex: 2, minHeight: '40px' }}
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.enter}</span>
            </button>
          </div>
        </div>
      )}

      {/* Authentic Lexilogos Instructions Banner */}
      {showInstructions && (
        <div className={`mt-4 p-3 rounded-xl border text-xs ${
          isDarkMode 
            ? 'bg-slate-900/90 border-slate-800 text-slate-300' 
            : 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
        }`}>
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                {t.instructionsTitle || "Instructions :"}
              </p>
              <p className="text-[11px] sm:text-xs leading-relaxed">
                {t.instructionsDesc || "To type directly with your computer keyboard: use the keys shown above each letter."}
                {currentKeyboard.instructions && (
                  <span className="block mt-1 font-mono text-[10px] sm:text-[11px] opacity-90">
                    {currentKeyboard.instructions}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Special Character Unicode Groups & Drawer */}
      {currentKeyboard.specialCharGroups && currentKeyboard.specialCharGroups.length > 0 && (
        <div className={`mt-4 pt-3 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-thin">
              {currentKeyboard.specialCharGroups.map((grp, idx) => (
                <button
                  key={`sp-tab-${idx}`}
                  onClick={() => {
                    setActiveSpecialTab(idx);
                    setIsSpecialGroupsOpen(true);
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    activeSpecialTab === idx && isSpecialGroupsOpen
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : (isDarkMode ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200')
                  }`}
                >
                  {grp.title} ({grp.chars.length})
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsSpecialGroupsOpen(!isSpecialGroupsOpen)}
              className={`p-1 shrink-0 ml-2 cursor-pointer ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-800'}`}
              title="Afficher / Masquer les caractères spéciaux"
            >
              {isSpecialGroupsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isSpecialGroupsOpen && (
            <div className={`p-3 rounded-xl border max-h-40 overflow-y-auto scrollbar-thin shadow-2xs ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex flex-wrap gap-1.5">
                {currentKeyboard.specialCharGroups[activeSpecialTab]?.chars.map((ch, cIdx) => (
                  <button
                    key={`sp-char-${cIdx}`}
                    onClick={() => {
                      handleAudio('key');
                      onInsertChar(ch);
                    }}
                    className={`min-w-8 h-9 px-2 flex items-center justify-center bg-white hover:bg-red-50 hover:border-red-400 active:scale-90 text-[#a80000] font-bold text-lg rounded-lg border border-slate-200 transition-all cursor-pointer shadow-2xs ${
                      currentKeyboard.fontFamilyClass || ''
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
