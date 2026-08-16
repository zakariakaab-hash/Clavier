import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { SupportedLocale } from '../utils/i18n';
import { KeyboardLayout } from '../types';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  currentLocale: SupportedLocale;
  isDarkMode: boolean;
  currentKeyboard?: KeyboardLayout;
  keyboardName?: string;
}

// Localized language name helpers
const LANGUAGE_NAMES: Record<string, { en: string; fr: string; es: string; ar: string; inAr: string }> = {
  arabic: { en: 'Arabic', fr: 'arabe', es: 'árabe', ar: 'العربية', inAr: 'باللغة العربية' },
  persian: { en: 'Persian (Farsi)', fr: 'persan (farsi)', es: 'persa (farsi)', ar: 'الفارسية', inAr: 'باللغة الفارسية' },
  urdu: { en: 'Urdu', fr: 'ourdou', es: 'urdu', ar: 'الأردية', inAr: 'باللغة الأردية' },
  hebrew: { en: 'Hebrew', fr: 'hébreu', es: 'hebreo', ar: 'العبرية', inAr: 'باللغة العبرية' },
  russian: { en: 'Russian', fr: 'russe', es: 'ruso', ar: 'الروسية', inAr: 'باللغة الروسية' },
  ukrainian: { en: 'Ukrainian', fr: 'ukrainien', es: 'ucraniano', ar: 'الأوكرانية', inAr: 'باللغة الأوكرانية' },
  'serbian-cyrillic': { en: 'Serbian', fr: 'serbe', es: 'serbio', ar: 'الصربية', inAr: 'باللغة الصربية' },
  'old-church-slavonic': { en: 'Old Church Slavonic', fr: 'vieux slave', es: 'antiguo eslavo eclesiástico', ar: 'السلافية الكنسية القديمة', inAr: 'باللغة السلافية القديمة' },
  greek: { en: 'Greek', fr: 'grec', es: 'griego', ar: 'اليونانية', inAr: 'باللغة اليونانية' },
  'polytonic-greek': { en: 'Polytonic Greek', fr: 'grec polytonique', es: 'griego politónico', ar: 'اليونانية الكلاسيكية', inAr: 'باللغة اليونانية' },
  coptic: { en: 'Coptic', fr: 'copte', es: 'copto', ar: 'القبطية', inAr: 'باللغة القبطية' },
  french: { en: 'French', fr: 'français', es: 'francés', ar: 'الفرنسية', inAr: 'باللغة الفرنسية' },
  german: { en: 'German', fr: 'allemand', es: 'alemán', ar: 'الألمانية', inAr: 'باللغة الألمانية' },
  spanish: { en: 'Spanish', fr: 'espagnol', es: 'español', ar: 'الإسبانية', inAr: 'باللغة الإسبانية' },
  polish: { en: 'Polish', fr: 'polonais', es: 'polaco', ar: 'البولندية', inAr: 'باللغة البولندية' },
  vietnamese: { en: 'Vietnamese', fr: 'vietnamien', es: 'vietnamita', ar: 'الفيتنامية', inAr: 'باللغة الفيتنامية' },
  esperanto: { en: 'Esperanto', fr: 'espéranto', es: 'esperanto', ar: 'الإسبرانتو', inAr: 'بلغة الإسبرانتو' },
  hindi: { en: 'Hindi', fr: 'hindi', es: 'hindi', ar: 'الهندية', inAr: 'باللغة الهندية' },
  bengali: { en: 'Bengali', fr: 'bengali', es: 'bengalí', ar: 'البنغالية', inAr: 'باللغة البنغالية' },
  tamil: { en: 'Tamil', fr: 'tamoul', es: 'tamil', ar: 'التاميلية', inAr: 'باللغة التاميلية' },
  'japanese-hiragana': { en: 'Japanese', fr: 'japonais', es: 'japonés', ar: 'اليابانية', inAr: 'باللغة اليابانية' },
  'korean-hangul': { en: 'Korean', fr: 'coréen', es: 'coreano', ar: 'الكورية', inAr: 'باللغة الكورية' },
  thai: { en: 'Thai', fr: 'thaï', es: 'tailandés', ar: 'التايلاندية', inAr: 'باللغة التايلاندية' },
  georgian: { en: 'Georgian', fr: 'géorgien', es: 'georgiano', ar: 'الجورجية', inAr: 'باللغة الجورجية' },
  armenian: { en: 'Armenian', fr: 'arménien', es: 'armenio', ar: 'الأرمنية', inAr: 'باللغة الأرمنية' },
  'amharic-geez': { en: 'Amharic', fr: 'amharique', es: 'amhárico', ar: 'الأمهرية', inAr: 'باللغة الأمهرية' },
  tifinagh: { en: 'Berber / Tifinagh', fr: 'berbère / tifinagh', es: 'bereber / tifinagh', ar: 'التيفيناغ الأمازيغية', inAr: 'بحروف التيفيناغ الأمازيغية' },
  'ipa-phonetic': { en: 'Phonetic IPA', fr: 'phonétique (API)', es: 'fonética (AFI)', ar: 'الأبجدية الصوتية الدولية (IPA)', inAr: 'بالرموز الصوتية الدولية' },
  hieroglyphs: { en: 'Hieroglyphs', fr: 'hiéroglyphes', es: 'jeroglíficos', ar: 'الهيروغليفية', inAr: 'بالرموز الهيروغليفية' },
  runes: { en: 'Runic Futhark', fr: 'runes futhark', es: 'runas futhark', ar: 'الرموز الرونية', inAr: 'بالكتابة الرونية' },
  ogham: { en: 'Ogham', fr: 'ogham', es: 'ogham', ar: 'الأوغام', inAr: 'بحروف الأوغام' },
  braille: { en: 'Braille', fr: 'braille', es: 'braille', ar: 'بريل', inAr: 'بنظام بريل' },
  'math-symbols': { en: 'Math Symbols', fr: 'symboles mathématiques', es: 'símbolos matemáticos', ar: 'الرموز الرياضية', inAr: 'بالرموز الرياضية' }
};

export function FAQSection({ currentLocale, isDarkMode, currentKeyboard, keyboardName }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const kbId = currentKeyboard?.id || 'arabic';
  const kbInfo = LANGUAGE_NAMES[kbId];
  const nativeName = currentKeyboard?.nativeName || '';
  const langEn = kbInfo?.en || currentKeyboard?.name || keyboardName || 'Arabic';
  const langFr = kbInfo?.fr || currentKeyboard?.name?.toLowerCase() || 'cette langue';
  const langEs = kbInfo?.es || currentKeyboard?.name?.toLowerCase() || 'este idioma';
  const langAr = kbInfo?.ar || currentKeyboard?.nativeName || currentKeyboard?.name || 'هذه اللغة';
  const langInAr = kbInfo?.inAr || `باللغة ${langAr}`;

  const nativeTag = nativeName ? ` (${nativeName})` : '';

  const getFaqs = (): FAQItem[] => {
    switch (currentLocale) {
      case 'fr':
        return [
          {
            question: `Comment puis-je taper en ${langFr} sans clavier physique ?`,
            answer: `Sur KeypadKing, utilisez simplement les touches de votre clavier d'ordinateur d'origine. Chaque touche latine correspond phonétiquement ou directement aux caractères en ${langFr}${nativeTag}. Vous pouvez aussi cliquer directement sur les touches du clavier virtuel à l'écran.`
          },
          {
            question: `Puis-je taper en ${langFr} sur mon téléphone portable ?`,
            answer: `Oui ! KeypadKing est spécialement optimisé pour iPhone (Safari) et Android (Chrome). Les touches tactiles du clavier ${langFr} sont dimensionnées pour être confortables, sans zoom intempestif ni défilement horizontal.`
          },
          {
            question: `Le clavier ${langFr} fonctionne-t-il sur Mac et Windows ?`,
            answer: `Oui, il fonctionne instantanément sur tous les navigateurs Mac (Safari, Chrome, Firefox, Edge) et Windows sans aucune installation ni configuration requise.`
          },
          {
            question: "KeypadKing est-il gratuit ?",
            answer: `Oui, KeypadKing est 100 % gratuit pour tous les utilisateurs, sans abonnement, sans publicité intrusive et sans limite d'utilisation pour écrire en ${langFr}.`
          },
          {
            question: "Dois-je installer un logiciel ou des polices de caractères ?",
            answer: `Non, aucun téléchargement ni extension n'est requis. Tous les caractères Unicode de la langue ${langFr} s'affichent et s'exécutent directement dans votre navigateur web.`
          },
          {
            question: `Quelle est la disposition de ce clavier ${langFr} ?`,
            answer: `KeypadKing propose une disposition interactive adaptée (mode phonétique intuitif ou disposition standard PC). Vous pouvez alterner entre la disposition avec repères latins et les caractères spéciaux à tout moment.`
          },
          {
            question: `Puis-je copier et exporter mon texte en ${langFr} ?`,
            answer: `Oui, cliquez sur le bouton 'Copier' pour copier votre texte ${langFr} en un clic dans le presse-papiers (pour le coller dans Word, WhatsApp, Google Docs ou vos e-mails), ou utilisez le bouton de téléchargement pour l'enregistrer au format .txt.`
          },
          {
            question: `Mes textes en ${langFr} sont-ils confidentiels et sécurisés ?`,
            answer: "Absolument. Vos textes restent à 100 % dans votre navigateur web local. Aucun texte saisi n'est envoyé ni enregistré sur des serveurs distants."
          }
        ];

      case 'es':
        return [
          {
            question: `¿Cómo puedo escribir en ${langEs} sin un teclado físico?`,
            answer: `En KeypadKing, simplemente escriba con las teclas de su teclado habitual. Cada tecla latina se asigna de manera intuitiva a las letras en ${langEs}${nativeTag}. También puede hacer clic directamente en las teclas del teclado virtual en pantalla.`
          },
          {
            question: `¿Puedo escribir en ${langEs} en mi teléfono móvil?`,
            answer: `¡Sí! KeypadKing está totalmente optimizado para iPhone (Safari) y Android (Chrome) con teclas táctiles adaptadas al teclado ${langEs}, respuesta instantánea y sin desplazamientos horizontales molestos.`
          },
          {
            question: `¿El teclado de ${langEs} funciona en Mac y Windows?`,
            answer: "Sí, funciona de inmediato en todos los navegadores de Mac (Safari, Chrome, Firefox, Edge) y Windows sin necesidad de configuraciones adicionales."
          },
          {
            question: "¿KeypadKing es gratuito?",
            answer: `Sí, KeypadKing es 100 % gratuito para todos los usuarios, sin muros de pago, sin suscripciones y sin límites para escribir en ${langEs}.`
          },
          {
            question: "¿Necesito instalar algún programa o fuente especial?",
            answer: `No, no necesita descargar ni instalar ningún software ni fuentes adicionales. Todos los caracteres Unicode de ${langEs} se representan directamente en su navegador web.`
          },
          {
            question: `¿Qué distribución utiliza este teclado de ${langEs}?`,
            answer: `KeypadKing ofrece tanto una distribución fonética intuitiva como la distribución estándar para ${langEs}, permitiéndole alternar fácilmente según sus preferencias.`
          },
          {
            question: `¿Puedo copiar y guardar el texto en ${langEs}?`,
            answer: `Sí, haga clic en el botón 'Copiar' para copiar el texto con un solo clic y pegarlo en Word, WhatsApp, Docs o correos electrónicos, o use el botón de descarga para guardarlo en un archivo .txt.`
          },
          {
            question: `¿Mis textos en ${langEs} son privados y seguros?`,
            answer: "Totalmente. El texto escrito permanece en su navegador local al 100%. No guardamos ni enviamos su texto personal a ningún servidor."
          }
        ];

      case 'ar':
        return [
          {
            question: `كيف يمكنني الكتابة ${langInAr} بدون لوحة مفاتيح مخصصة؟`,
            answer: `على KeypadKing، يمكنك استخدام مفاتيح لوحة مفاتيح الكمبيوتر العادية. يتم تحويل الحروف اللاتينية تلقائياً إلى حروف ${langAr}${nativeTag}. كما يمكنك النقر مباشرة على الحروف في لوحة المفاتيح الافتراضية على الشاشة.`
          },
          {
            question: `هل يمكنني الكتابة ${langInAr} على هاتفي؟`,
            answer: `نعم! تم تصميم KeypadKing ليعمل بسلاسة فائقة على هواتف iPhone (Safari) و Android (Chrome) مع أزرار لمس مريحة وسريعة الاستجابة وبدون أي تمرير أفقي.`
          },
          {
            question: `هل تعمل لوحة مفاتيح ${langAr} على أنظمة Mac و Windows؟`,
            answer: "نعم، تعمل مباشرة على جميع المتصفحات في أنظمة Mac (Safari, Chrome, Firefox) و Windows دون الحاجة لأي تثبيت أو إعدادات."
          },
          {
            question: "هل موقع KeypadKing مجاني؟",
            answer: `نعم، موقع KeypadKing مجاني 100% لجميع المستخدمين بدون أي اشتراكات أو رسوم للكتابة ${langInAr} وأكثر من 100 لغة أخرى.`
          },
          {
            question: "هل أحتاج إلى تثبيت أي برامج أو خطوط؟",
            answer: `لا، لا تحتاج إلى تثبيت أي تطبيق أو خطوط إضافية. جميع رموز ويونيكود ${langAr} مدعومة وتعمل مباشرة وفوراً داخل متصفحك.`
          },
          {
            question: "ما هو تخطيط لوحة المفاتيح المستخدم؟",
            answer: `يوفر KeypadKing تخطيطاً صوتياً بديهياً بالإضافة إلى التخطيط القياسي للوحة مفاتيح ${langAr} لتوفير تجربة كتابة سهلة وسريعة.`
          },
          {
            question: `هل يمكنني نسخ وتصدير النص المكتوب ${langInAr}؟`,
            answer: "نعم، بمجرد النقر على زر 'نسخ' يتم حفظ النص في الحافظة للصقه في Word أو Google Docs أو WhatsApp أو البريد الإلكتروني، أو يمكنك تنزيله كملف نصي .txt."
          },
          {
            question: `هل النصوص المكتوبة ${langInAr} محمية وخاصة بي؟`,
            answer: "نعم بكل تأكيد. تظل نصوصك المكتوبة داخل متصفحك بنسبة 100%. لا نقوم بإرسال أو حفظ أي نصوص على الخوادم."
          }
        ];

      case 'en':
      default:
        return [
          {
            question: `How can I type ${langEn} without a physical ${langEn} keyboard?`,
            answer: `On KeypadKing, simply type on your physical computer keyboard. Each Latin key intuitively maps to ${langEn} letters${nativeTag}. Alternatively, you can click or tap directly on the on-screen virtual keyboard.`
          },
          {
            question: `Can I type ${langEn} on my phone?`,
            answer: `Yes! KeypadKing is optimized for iPhone Safari and Android Chrome with comfortably sized touch keys, instant response, and full viewport sizing for typing in ${langEn} without downloading extra apps.`
          },
          {
            question: `Does the ${langEn} keyboard work on Mac and Windows?`,
            answer: "Yes, it works instantly across all desktop browsers on macOS (Safari, Chrome, Firefox, Edge) and Windows 10/11 with zero setup required."
          },
          {
            question: "Is KeypadKing free?",
            answer: `Yes, KeypadKing is 100% free with no registration, no paywalls, and unlimited typing in ${langEn} and 100+ other languages.`
          },
          {
            question: "Do I need to install any fonts or software?",
            answer: `No, you don't need to install any software, plugins, or fonts. All ${langEn} Unicode characters render instantly and natively in your modern web browser.`
          },
          {
            question: `What layout does this ${langEn} keyboard use?`,
            answer: `KeypadKing provides an intuitive typing layout with Latin key hints as well as standard hardware PC layout options, letting you type ${langEn} characters effortlessly.`
          },
          {
            question: `Can I copy or export ${langEn} text?`,
            answer: `Yes, click the 'Copy' button to copy your formatted Unicode text to your clipboard with a single click (to paste into Word, WhatsApp, Docs, or emails), or use the 'Download' button to save it as a .txt file.`
          },
          {
            question: "Is my typed text private and secure?",
            answer: "Your typed text stays in your browser. All typing, transliteration, and text formatting are processed 100% client-side without sending your content to remote servers."
          }
        ];
    }
  };

  const faqs = getFaqs();

  const getTitle = () => {
    switch (currentLocale) {
      case 'fr': return `Questions Fréquentes — Clavier ${langFr.charAt(0).toUpperCase() + langFr.slice(1)}`;
      case 'es': return `Preguntas Frecuentes — Teclado ${langEs.charAt(0).toUpperCase() + langEs.slice(1)}`;
      case 'ar': return `الأسئلة الشائعة — لوحة مفاتيح ${langAr}`;
      default: return `Frequently Asked Questions — ${langEn} Keyboard`;
    }
  };

  const getSubtitle = () => {
    switch (currentLocale) {
      case 'fr': return `Tout ce que vous devez savoir sur la frappe en ${langFr}, la compatibilité et la confidentialité`;
      case 'es': return `Todo lo que necesita saber sobre la escritura en ${langEs}, compatibilidad y privacidad`;
      case 'ar': return `كل ما تحتاج لمعرفته حول الكتابة ${langInAr}، التوافق، والخصوصية`;
      default: return `Everything you need to know about typing in ${langEn}, device compatibility, and privacy`;
    }
  };

  const getBadge = () => {
    switch (currentLocale) {
      case 'fr': return "8 réponses concises";
      case 'es': return "8 respuestas concisas";
      case 'ar': return "8 إجابات سريعة";
      default: return "8 Quick Answers";
    }
  };

  return (
    <section aria-labelledby="faq-heading" className="w-full">
      <div className={`rounded-2xl border p-4 sm:p-6 transition-colors shadow-sm ${
        isDarkMode ? 'bg-[#0f172a] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      }`}>
        
        {/* Section Header */}
        <div className="flex items-center justify-between pb-4 border-b mb-4 gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              isDarkMode ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 id="faq-heading" className="text-base sm:text-lg font-extrabold tracking-tight">
                {getTitle()}
              </h2>
              <p className="text-xs text-slate-400">
                {getSubtitle()}
              </p>
            </div>
          </div>

          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
            isDarkMode ? 'bg-slate-900 border-slate-700 text-emerald-400' : 'bg-slate-50 border-slate-200 text-emerald-800'
          }`}>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{getBadge()}</span>
          </div>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={`faq-${idx}`}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isOpen
                    ? (isDarkMode ? 'bg-slate-900/80 border-emerald-500/40 shadow-xs' : 'bg-emerald-50/40 border-emerald-300 shadow-2xs')
                    : (isDarkMode ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700' : 'bg-slate-50/50 border-slate-200/80 hover:border-slate-300')
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-semibold text-xs sm:text-sm gap-3 cursor-pointer touch-manipulation"
                >
                  <span className={`flex-1 leading-snug ${isOpen ? 'text-emerald-700 dark:text-emerald-400 font-bold' : ''}`}>
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-lg border transition-transform shrink-0 ${
                    isOpen ? 'rotate-180 bg-emerald-600 text-white border-emerald-600' : 'bg-transparent text-slate-400 border-transparent'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className={`px-3.5 sm:px-4 pb-4 pt-1 text-xs sm:text-sm leading-relaxed border-t border-dashed ${
                    isDarkMode ? 'text-slate-300 border-slate-800/80' : 'text-slate-700 border-emerald-200/60'
                  }`}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
