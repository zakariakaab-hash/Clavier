import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, CornerDownLeft, Delete, Space, 
  Layers, ChevronDown, ChevronUp 
} from 'lucide-react';
import { KeyboardLayout, KeyDefinition } from '../types';
import { playKeyClickSound, playSpacebarSound, playBackspaceSound } from '../utils/audio';
import { SupportedLocale, getTranslation } from '../utils/i18n';
import { 
  detectBrowserPhysicalLayout, 
  inferPhysicalLayoutFromKeystroke, 
  getPhysicalKeyHint 
} from '../utils/keyboardEngine';

interface VirtualKeyboardProps {
  currentKeyboard: KeyboardLayout;
  onInsertChar: (char: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  soundEnabled: boolean;
  phoneticMode?: boolean;
  onTogglePhoneticMode?: () => void;
  theme?: 'dark' | 'light';
  currentLocale?: SupportedLocale;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  currentKeyboard,
  onInsertChar,
  onBackspace,
  soundEnabled,
  theme = 'light',
  currentLocale = 'en'
}) => {
  const t = getTranslation(currentLocale);
  const [isShiftActive, setIsShiftActive] = useState(false);
  const [isCapsLockActive, setIsCapsLockActive] = useState(false);
  const [isAltGrActive, setIsAltGrActive] = useState(false);
  const [activeSpecialTab, setActiveSpecialTab] = useState(0);
  const [isSpecialGroupsOpen, setIsSpecialGroupsOpen] = useState(false);
  const [pressedKeyCode, setPressedKeyCode] = useState<string | null>(null);
  const [detectedLayout, setDetectedLayout] = useState<'qwerty' | 'azerty' | 'qwertz'>('qwerty');

  // Detect physical layout on mount
  useEffect(() => {
    let isMounted = true;
    detectBrowserPhysicalLayout().then(detected => {
      if (isMounted && detected) {
        setDetectedLayout(detected);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

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

  // Physical modifier keys listener & keystroke inference
  useEffect(() => {
    const handlePhysicalKeyDown = (e: KeyboardEvent) => {
      setPressedKeyCode(e.code);

      // Infer physical layout dynamically from keystroke
      const inferred = inferPhysicalLayoutFromKeystroke(e.code, e.key);
      if (inferred && inferred !== detectedLayout) {
        setDetectedLayout(inferred);
      }

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
      setPressedKeyCode(null);
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
  }, [detectedLayout]);

  const effectiveShift = isShiftActive || isCapsLockActive;
  const isDarkMode = theme === 'dark';

  return (
    <div className={`rounded-xl sm:rounded-2xl border p-1 sm:p-3 md:p-5 select-none transition-colors duration-200 shadow-xs sm:shadow-sm w-full max-w-full overflow-hidden landscape:p-1 ${
      isDarkMode 
        ? 'bg-[#0f172a] text-slate-100 border-slate-800' 
        : 'bg-slate-100/90 text-slate-800 border-slate-200'
    }`}>
      {/* Quick Diacritics Strip if available */}
      {currentKeyboard.diacritics && currentKeyboard.diacritics.length > 0 && (
        <div className={`mb-1.5 sm:mb-2.5 md:mb-3 p-1 sm:p-1.5 md:p-2 rounded-xl border flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-touch ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-2xs'
        }`}>
          <span className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 shrink-0">
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
                className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center font-bold text-base sm:text-lg md:text-xl rounded-lg border transition-all shrink-0 cursor-pointer touch-manipulation active:scale-95 ${
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

      {/* MAIN HARDWARE KEYBOARD AREA: Standard Full PC Matrix */}
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
              const physicalHint = getPhysicalKeyHint(kDef, detectedLayout);
              const isKeyPressed = Boolean(kDef.code && pressedKeyCode === kDef.code);

              return (
                <button
                  key={`key-${rowIdx}-${kIdx}`}
                  onClick={() => handleKeyClick(kDef)}
                  className={`relative group rounded-lg font-medium transition-transform active:scale-95 flex flex-col items-center justify-center p-0.5 sm:p-1.5 border cursor-pointer touch-manipulation select-none ${
                    isKeyPressed
                      ? 'bg-amber-100 border-amber-500 text-amber-900 scale-95 ring-2 ring-amber-400'
                      : isAltGrActive && kDef.altChar
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
                  {/* Physical Key Hint (Top Left, LTR isolated) */}
                  {physicalHint && (
                    <span dir="ltr" className="absolute top-0.5 left-1 text-[8px] sm:text-[9px] text-slate-500 font-mono font-bold select-none">
                      {physicalHint}
                    </span>
                  )}

                  {/* Shift Character (Top Right) */}
                  {kDef.shiftChar && (
                    <span className="absolute top-0.5 right-1 text-[8px] sm:text-[9px] text-slate-400 font-medium select-none">
                      {kDef.shiftChar}
                    </span>
                  )}

                  {/* Main Key Display: Large Target Character */}
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

      {/* Special Character Groups Tabs & Drawer */}
      {currentKeyboard.specialCharGroups && currentKeyboard.specialCharGroups.length > 0 && (
        <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between gap-2 mb-2">
            <button
              onClick={() => setIsSpecialGroupsOpen(!isSpecialGroupsOpen)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.specialChars || 'Special Characters & Glyphs'}</span>
              {isSpecialGroupsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {isSpecialGroupsOpen && (
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-touch">
                {currentKeyboard.specialCharGroups.map((group, idx) => (
                  <button
                    key={`spec-tab-${idx}`}
                    onClick={() => setActiveSpecialTab(idx)}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
                      activeSpecialTab === idx
                        ? 'bg-emerald-600 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {group.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isSpecialGroupsOpen && (
            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-1 p-2 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 max-h-40 overflow-y-auto">
              {currentKeyboard.specialCharGroups[activeSpecialTab]?.chars.map((ch, idx) => (
                <button
                  key={`spec-char-${idx}`}
                  onClick={() => {
                    handleAudio('key');
                    onInsertChar(ch);
                  }}
                  className="h-9 flex items-center justify-center font-bold text-base sm:text-lg bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  {ch}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
