import React, { useState } from 'react';
import { StaticPageType, getStaticPagePath } from '../utils/routes';
import { SupportedLocale, getTranslation } from '../utils/i18n';
import { 
  PRIVACY_CONTENT, 
  TERMS_CONTENT, 
  ABOUT_CONTENT, 
  CONTACT_CONTENT 
} from '../data/staticPagesContent';
import { 
  ShieldCheck, 
  FileText, 
  Info, 
  Mail, 
  ArrowLeft, 
  Copy, 
  Check, 
  ExternalLink, 
  Globe, 
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';

interface StaticPageViewProps {
  pageType: StaticPageType;
  locale: SupportedLocale;
  theme: 'dark' | 'light';
  onNavigateHome: () => void;
  onNavigateStaticPage: (page: StaticPageType) => void;
}

export const StaticPageView: React.FC<StaticPageViewProps> = ({
  pageType,
  locale,
  theme,
  onNavigateHome,
  onNavigateStaticPage,
}) => {
  const isDarkMode = theme === 'dark';
  const t = getTranslation(locale);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const renderContent = () => {
    switch (pageType) {
      case 'privacy': {
        const data = PRIVACY_CONTENT[locale] || PRIVACY_CONTENT.en;
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-6 border-slate-200 dark:border-slate-800">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {data.title}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {data.subtitle}
                </p>
                {data.lastUpdated && (
                  <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {data.lastUpdated}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {data.sections.map((section, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>{section.title}</span>
                  </h2>
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-600 dark:text-slate-300">
                      {p}
                    </p>
                  ))}
                  {section.listItems && (
                    <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-300">
                      {section.listItems.map((item, lIdx) => (
                        <li key={lIdx} className="marker:text-emerald-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        );
      }

      case 'terms': {
        const data = TERMS_CONTENT[locale] || TERMS_CONTENT.en;
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-6 border-slate-200 dark:border-slate-800">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {data.title}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {data.subtitle}
                </p>
                {data.lastUpdated && (
                  <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {data.lastUpdated}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {data.sections.map((section, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-600 dark:text-slate-300">
                      {p}
                    </p>
                  ))}
                  {section.listItems && (
                    <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 dark:text-slate-300">
                      {section.listItems.map((item, lIdx) => (
                        <li key={lIdx} className="marker:text-blue-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
          </div>
        );
      }

      case 'about': {
        const data = ABOUT_CONTENT[locale] || ABOUT_CONTENT.en;
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-6 border-slate-200 dark:border-slate-800">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                <Info className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {data.title}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {data.subtitle}
                </p>
              </div>
            </div>

            <div className="space-y-8 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              {data.sections.map((section, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {section.title}
                  </h2>
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-600 dark:text-slate-300">
                      {p}
                    </p>
                  ))}
                  {section.listItems && (
                    <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600 dark:text-slate-300">
                      {section.listItems.map((item, lIdx) => (
                        <li key={lIdx} className="marker:text-amber-500">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className="mt-8 p-5 rounded-2xl border bg-slate-50 dark:bg-slate-850/60 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {locale === 'fr' ? 'Prêt à écrire ?' : locale === 'es' ? '¿Listo para escribir?' : locale === 'ar' ? 'جاهز للبدء بالكتابة؟' : 'Ready to Start Typing?'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    {locale === 'fr' ? 'Accédez directement à nos 100+ claviers virtuels gratuits.' : locale === 'es' ? 'Explore más de 100 teclados virtuales gratuitos.' : locale === 'ar' ? 'استكشف أكثر من 100 لوحة مفاتيح افتراضية مجانية.' : 'Explore 100+ free online virtual keyboards right now.'}
                  </p>
                </div>
                <button
                  onClick={onNavigateHome}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-xs cursor-pointer shrink-0"
                >
                  {locale === 'fr' ? 'Ouvrir les Claviers' : locale === 'es' ? 'Abrir Teclados' : locale === 'ar' ? 'فتح لوحات المفاتيح' : 'Open Keyboards'}
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'contact': {
        const data = CONTACT_CONTENT[locale] || CONTACT_CONTENT.en;
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b pb-6 border-slate-200 dark:border-slate-800">
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                <Mail className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {data.title}
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {data.subtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Direct Email Card */}
              <div className="p-6 rounded-2xl border bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  <span>{data.emailLabel}</span>
                </div>
                
                <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
                  <span className="font-mono text-sm sm:text-base font-semibold text-slate-900 dark:text-white select-all">
                    {data.emailAddress}
                  </span>
                  <button
                    onClick={() => handleCopyEmail(data.emailAddress)}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {data.responseTime}
                </p>

                <div className="pt-2">
                  <a
                    href={`mailto:${data.emailAddress}?subject=KeypadKing%20Feedback%20or%20Suggestion`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-xs"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{locale === 'fr' ? 'Envoyer un courriel' : locale === 'es' ? 'Enviar correo' : locale === 'ar' ? 'إرسال بريد إلكتروني' : 'Send an Email'}</span>
                  </a>
                </div>
              </div>

              {/* Guidelines & Support Topics */}
              <div className="p-6 rounded-2xl border bg-slate-50 dark:bg-slate-850/60 border-slate-200 dark:border-slate-800 space-y-4">
                <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{data.guidelinesTitle}</span>
                </h2>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {data.guidelines.map((g, gIdx) => (
                    <li key={gIdx} className="flex items-start gap-2">
                      <span className="text-indigo-500 font-bold">•</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-2 border-t border-slate-200 dark:border-slate-800">
                  {data.formNote}
                </p>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const navLinks: { id: StaticPageType; label: string }[] = [
    { id: 'about', label: locale === 'fr' ? 'À Propos' : locale === 'es' ? 'Acerca de' : locale === 'ar' ? 'عن الموقع' : 'About' },
    { id: 'privacy', label: locale === 'fr' ? 'Confidentialité' : locale === 'es' ? 'Privacidad' : locale === 'ar' ? 'الخصوصية' : 'Privacy Policy' },
    { id: 'terms', label: locale === 'fr' ? 'Conditions' : locale === 'es' ? 'Términos' : locale === 'ar' ? 'الشروط' : 'Terms of Use' },
    { id: 'contact', label: locale === 'fr' ? 'Contact' : locale === 'es' ? 'Contacto' : locale === 'ar' ? 'اتصل بنا' : 'Contact' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb / Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'fr' ? 'Retour aux claviers' : locale === 'es' ? 'Volver a los teclados' : locale === 'ar' ? 'العودة للوحة المفاتيح' : 'Back to Keyboards'}</span>
        </button>

        {/* Tab navigation between trust/legal pages */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {navLinks.map((item) => {
            const isActive = item.id === pageType;
            return (
              <button
                key={item.id}
                onClick={() => onNavigateStaticPage(item.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Page Content Card */}
      <div className={`p-6 sm:p-10 rounded-3xl border shadow-xs transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {renderContent()}
      </div>
    </div>
  );
};
