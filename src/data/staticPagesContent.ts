import { SupportedLocale } from '../utils/i18n';
import { StaticPageType } from '../utils/routes';

export interface StaticPageContent {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  sections: {
    title: string;
    content: string[];
    listItems?: string[];
  }[];
}

export const PRIVACY_CONTENT: Record<SupportedLocale, StaticPageContent> = {
  en: {
    title: 'Privacy Policy',
    subtitle: 'Learn how KeypadKing handles client-side typing, privacy, cookies, and website data.',
    lastUpdated: 'Last Updated: August 2026',
    sections: [
      {
        title: '1. Introduction & Overview',
        content: [
          'KeypadKing ("we", "our", or "the Service") is a free online virtual keyboard platform designed to enable users to type in multiple languages, alphabets, and special scripts directly within their web browser.',
          'We believe in data transparency and respect for user privacy. This Privacy Policy outlines what information is collected, how it is processed, and your rights when using our website at keypadking.com.'
        ]
      },
      {
        title: '2. Client-Side Keyboard Input Processing',
        content: [
          'The core virtual keyboard and physical keystroke transliteration tools on KeypadKing operate strictly on the client side (within your web browser).',
          'When you type, edit, or transliterate text using KeypadKing keyboards, your keystrokes and typed text are processed locally by your browser JavaScript engine.',
          'Your typed text is NOT transmitted to, recorded by, or stored on our servers for keyboard operation. You retain complete ownership and control of the content you type.'
        ]
      },
      {
        title: '3. Local Storage & User Preferences',
        content: [
          'KeypadKing uses standard browser local storage (localStorage) exclusively to preserve your personal interface preferences between visits. This includes:',
        ],
        listItems: [
          'Selected keyboard layout and active language setting',
          'Light or Dark theme display mode',
          'Keyboard tactile sound effect toggle (enabled or muted)',
          'Your pinned favorite keyboards list',
          'Custom editor font size preference'
        ]
      },
      {
        title: '4. Web Analytics & Aggregated Telemetry',
        content: [
          'We may use standard web analytics tools, such as Google Analytics 4, to collect aggregated, non-personally identifiable telemetry data.',
          'This information helps us understand aggregate site traffic, general visitor geographic distribution (country or city level), device and browser types, screen resolutions, and which virtual keyboards are most frequently used to guide platform performance improvements.',
          'Analytics cookies may collect standard information such as anonymized IP addresses and browser headers. No keystroke content, typed text, or personal credentials are ever collected by or transmitted to analytics services.'
        ]
      },
      {
        title: '5. Cookies & Similar Technologies',
        content: [
          'Cookies are small text files stored on your device by your web browser. KeypadKing may use necessary cookies and analytics cookies to maintain website functionality, analyze usage patterns, and remember language preferences.',
          'You have the full ability to manage, restrict, or delete cookies at any time through your browser security settings.'
        ]
      },
      {
        title: '6. Third-Party Services & External Resources',
        content: [
          'KeypadKing may load web fonts or static script assets from established content delivery networks (CDNs). These providers may log technical connection metadata in accordance with their respective privacy policies.',
          'Our website contains no third-party behavioral advertising trackers that profile your personal identity across external websites.'
        ]
      },
      {
        title: '7. Communications & Inquiries',
        content: [
          'If you choose to contact us directly via email for support, keyboard layout suggestions, or general feedback, we will only use your email address and message contents to respond to your inquiry.',
          'We do not sell, rent, or trade user contact information with third parties for marketing purposes.'
        ]
      },
      {
        title: '8. User Rights & Data Control',
        content: [
          'Depending on your location and applicable privacy laws, you may have rights regarding your personal information, including the right to request information about data handling, clear stored local data, or opt out of non-essential analytics cookies.',
          'You can instantly erase all locally stored KeypadKing preferences at any time by clearing your browser site data for keypadking.com.'
        ]
      },
      {
        title: '9. Changes to This Privacy Policy',
        content: [
          'We may periodically update this Privacy Policy to reflect technical updates or legal requirements. Any modifications will be posted on this page with an updated revision date.'
        ]
      },
      {
        title: '10. Contact Information',
        content: [
          'If you have any questions, suggestions, or concerns regarding this Privacy Policy or our privacy practices, please contact us at:'
        ],
        listItems: [
          'Email: contact@keypadking.com'
        ]
      }
    ]
  },
  fr: {
    title: 'Politique de Confidentialité',
    subtitle: 'Découvrez comment KeypadKing protège votre vie privée et gère les données de navigation.',
    lastUpdated: 'Dernière mise à jour : Août 2026',
    sections: [
      {
        title: '1. Introduction et Présentation',
        content: [
          'KeypadKing (« nous », « notre » ou « le Service ») est une plateforme gratuite de claviers virtuels en ligne permettant d\'écrire dans de multiples langues et alphabets directement dans votre navigateur web.',
          'Nous accordons une importance primordiale à la transparence et au respect de votre vie privée. Cette politique détaille les données collectées et vos droits lors de l\'utilisation de keypadking.com.'
        ]
      },
      {
        title: '2. Traitement des Saisies Côté Client',
        content: [
          'Le fonctionnement des claviers virtuels et de la translittération phonétique sur KeypadKing s\'effectue exclusivement côté client (dans votre navigateur).',
          'Lorsque vous saisissez du texte sur nos claviers, vos frappes sont traitées localement par le moteur JavaScript de votre navigateur.',
          'Le texte saisi n\'est JAMAIS transmis, enregistré ni stocké sur nos serveurs. Vous conservez l\'entière propriété de vos écrits.'
        ]
      },
      {
        title: '3. Stockage Local et Préférences Utilisateur',
        content: [
          'KeypadKing utilise le stockage local de votre navigateur (localStorage) uniquement pour conserver vos préférences d\'interface :',
        ],
        listItems: [
          'Clavier sélectionné et langue de l\'interface',
          'Mode d\'affichage (thème sombre ou clair)',
          'Activation ou désactivation du son des touches',
          'Liste de vos claviers favoris épinglés',
          'Taille de police personnalisée de l\'éditeur'
        ]
      },
      {
        title: '4. Outils d\'Analyse et Télémétrie',
        content: [
          'Nous pouvons utiliser des outils de mesure d\'audience tels que Google Analytics 4 afin d\'obtenir des statistiques globales et anonymisées.',
          'Ces données nous permettent d\'évaluer la fréquentation du site, les types d\'appareils et les claviers les plus consultés afin d\'optimiser les performances.',
          'Aucune frappe de clavier ni aucun texte rédigé n\'est transmis aux outils d\'analyse.'
        ]
      },
      {
        title: '5. Cookies et Technologies Similaires',
        content: [
          'Les cookies sont de petits fichiers texte déposés par votre navigateur. Vous pouvez à tout moment configurer votre navigateur pour refuser ou supprimer les cookies.'
        ]
      },
      {
        title: '6. Services Tiers',
        content: [
          'KeypadKing peut charger des polices de caractères et des bibliothèques statiques via des réseaux de diffusion de contenu (CDN) sécurisés.'
        ]
      },
      {
        title: '7. Vos Droits et Contact',
        content: [
          'Vous pouvez à tout moment effacer vos données locales en vidant le cache de votre navigateur pour keypadking.com.',
          'Pour toute question relative à cette politique de confidentialité, vous pouvez nous écrire à :'
        ],
        listItems: [
          'Courriel : contact@keypadking.com'
        ]
      }
    ]
  },
  es: {
    title: 'Política de Privacidad',
    subtitle: 'Conozca cómo KeypadKing protege su privacidad y gestiona los datos de navegación.',
    lastUpdated: 'Última actualización: Agosto de 2026',
    sections: [
      {
        title: '1. Introducción y Resumen',
        content: [
          'KeypadKing («nosotros» o «el Servicio») es una plataforma en línea de teclados virtuales gratuitos diseñada para permitir la escritura en múltiples alfabetos y lenguajes en su navegador.',
          'Esta Política de Privacidad describe el tratamiento de datos y sus derechos al utilizar keypadking.com.'
        ]
      },
      {
        title: '2. Procesamiento de Texto en el Lado del Cliente',
        content: [
          'El funcionamiento de los teclados virtuales y la transliteración fonética se ejecuta íntegramente en el navegador del usuario (lado del cliente).',
          'El texto que escribe NO se envía, registra ni almacena en servidores remotos. Usted mantiene el control absoluto sobre sus escritos.'
        ]
      },
      {
        title: '3. Almacenamiento Local (localStorage)',
        content: [
          'Utilizamos el almacenamiento local del navegador para guardar sus preferencias de interfaz:',
        ],
        listItems: [
          'Teclado seleccionado e idioma de interfaz',
          'Preferencia de tema claro u oscuro',
          'Sonido táctil activado o silenciado',
          'Lista de teclados favoritos fijados',
          'Tamaño de fuente personalizado'
        ]
      },
      {
        title: '4. Analítica Web y Cookies',
        content: [
          'Podemos emplear herramientas como Google Analytics 4 para recopilar métricas agregadas y anónimas sobre tráfico y rendimiento.',
          'Nunca se envían textos escritos ni datos confidenciales a herramientas analíticas.'
        ]
      },
      {
        title: '5. Contacto',
        content: [
          'Para cualquier duda sobre nuestra política de privacidad, contáctenos en:'
        ],
        listItems: [
          'Correo electrónico: contact@keypadking.com'
        ]
      }
    ]
  },
  ar: {
    title: 'سياسة الخصوصية',
    subtitle: 'تعرف على كيفية حماية خصوصيتك ومعالجة البيانات على موقع KeypadKing.',
    lastUpdated: 'آخر تحديث: أغسطس 2026',
    sections: [
      {
        title: '1. مقدمة ونظرة عامة',
        content: [
          'موقع KeypadKing هو منصة مجانية للوحات المفاتيح الافتراضية تتيح الكتابة بمختلف اللغات وأنظمة الحروف مباشرة داخل متصفح الويب.',
          'نحن نلتزم بالشفافية الكاملة وحماية خصوصية مستخدمينا. توضح هذه الوثيقة طبيعة البيانات وكيفية التعامل معها على keypadking.com.'
        ]
      },
      {
        title: '2. معالجة الكتابة داخل المتصفح (Client-Side)',
        content: [
          'تتم معالجة نصوص لوحة المفاتيح والترجمة الصوتية بالكامل محلياً داخل متصفحك عبر محرك جافاسكريبت.',
          'لا يتم إرسال أو تسجيل أو تخزين النصوص التي تكتبها على خوادمنا على الإطلاق. أنت المالك الوحيد لنصوصك.'
        ]
      },
      {
        title: '3. التخزين المحلي وتفضيلات المستخدم',
        content: [
          'نستخدم التخزين المحلي في المتصفح (localStorage) لحفظ التفضيلات الشخصية التالية فقط:',
        ],
        listItems: [
          'لوحة المفاتيح ولغة الواجهة المحددة',
          'الوضع المظلم أو الفاتح',
          'تفعيل أو كتم الصوت التفاعلي للمفاتيح',
          'قائمة لوحات المفاتيح المفضلة',
          'حجم خط المحرر'
        ]
      },
      {
        title: '4. التحليلات وملفات تعريف الارتباط (Cookies)',
        content: [
          'قد نستخدم أدوات تحليلية قياسية مثل Google Analytics 4 لقياس حركة الزوار بشكل إحصائي مجمع ومجهول الهوية لتحسين أداء الموقع.',
          'لا تتضمن التحليلات أي نصوص مكتوبة أو بيانات شخصية.'
        ]
      },
      {
        title: '5. التواصل والاستفسار',
        content: [
          'لأي استفسارات بخصوص سياسة الخصوصية، يرجى مراسلتنا عبر:'
        ],
        listItems: [
          'البريد الإلكتروني: contact@keypadking.com'
        ]
      }
    ]
  }
};

export const TERMS_CONTENT: Record<SupportedLocale, StaticPageContent> = {
  en: {
    title: 'Terms of Use',
    subtitle: 'Please review the terms and conditions governing the use of KeypadKing.',
    lastUpdated: 'Last Updated: August 2026',
    sections: [
      {
        title: '1. Acceptance of Terms',
        content: [
          'By accessing or using KeypadKing (accessible at keypadking.com), you agree to be bound by these Terms of Use and all applicable laws and regulations.',
          'If you do not agree with any of these terms, you are prohibited from using or accessing this website.'
        ]
      },
      {
        title: '2. Description of the Service',
        content: [
          'KeypadKing provides free online virtual keyboards, multilingual character maps, phonetic transliteration tools, and text editing helpers.',
          'The Service is provided free of charge for personal, educational, and professional use directly through modern web browsers without requiring software installation.'
        ]
      },
      {
        title: '3. Acceptable Use',
        content: [
          'You agree to use KeypadKing solely for lawful purposes. You agree not to:',
        ],
        listItems: [
          'Attempt to disrupt, compromise, or impair the stability or security of the website and associated servers',
          'Deploy automated scraping, denial-of-service, or abusive bots that excessively strain platform infrastructure',
          'Circumvent technical measures designed to govern access or rate limits',
          'Use the platform to generate or distribute malicious or unlawful material'
        ]
      },
      {
        title: '4. User Responsibilities & Content Ownership',
        content: [
          'You retain full intellectual property rights and responsibility for all text and content you compose using KeypadKing.',
          'Because text editing is executed locally in your web browser, you are solely responsible for saving, backing up, and protecting your work.'
        ]
      },
      {
        title: '5. Intellectual Property Rights',
        content: [
          'All software code, visual designs, layouts, graphical elements, brand identifiers, and virtual keyboard key mappings provided on KeypadKing are protected by applicable intellectual property laws.',
          'You may not copy, reverse engineer, or redistribute our core code or interface for commercial resale without prior written authorization.'
        ]
      },
      {
        title: '6. Third-Party Links & External Resources',
        content: [
          'KeypadKing may provide links to external reference resources (such as Unicode tables or linguistic references). We are not responsible for the contents or privacy practices of external third-party websites.'
        ]
      },
      {
        title: '7. Disclaimer of Warranties',
        content: [
          'The Service and all tools on KeypadKing are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.',
          'We do not guarantee that the website will always be uninterrupted, error-free, or compatible with every hardware configuration.'
        ]
      },
      {
        title: '8. Limitation of Liability',
        content: [
          'In no event shall KeypadKing or its operators be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use the Service.'
        ]
      },
      {
        title: '9. Changes to These Terms',
        content: [
          'We reserve the right to revise or update these Terms of Use at any time. Continued use of the website following changes constitutes acceptance of the revised terms.'
        ]
      },
      {
        title: '10. Contact Information',
        content: [
          'For inquiries regarding these Terms of Use, please reach out to:'
        ],
        listItems: [
          'Email: contact@keypadking.com'
        ]
      }
    ]
  },
  fr: {
    title: "Conditions d'Utilisation",
    subtitle: "Consultez les conditions régissant l'utilisation des services de KeypadKing.",
    lastUpdated: 'Dernière mise à jour : Août 2026',
    sections: [
      {
        title: '1. Acceptation des Conditions',
        content: [
          'En accédant au site KeypadKing (keypadking.com), vous acceptez d\'être lié par les présentes Conditions d\'Utilisation et par toutes les lois applicables.',
          'Si vous n\'acceptez pas ces conditions, veuillez ne pas utiliser notre service.'
        ]
      },
      {
        title: '2. Description du Service',
        content: [
          'KeypadKing met à disposition des claviers virtuels gratuits, des tables de caractères multilingues et des outils de translittération en ligne.',
          'Le service est accessible gratuitement pour un usage personnel, éducatif ou professionnel sans installation logicielle.'
        ]
      },
      {
        title: '3. Utilisation Acceptable',
        content: [
          'Vous vous engagez à utiliser le site conformément aux lois en vigueur et à ne pas tenter de perturber ou surcharger les infrastructures du service.'
        ]
      },
      {
        title: '4. Propriété Intellectuelle et Responsabilité',
        content: [
          'Vous conservez tous les droits sur les textes rédigés sur le site. La conception, le code source et les agencements de claviers de KeypadKing sont protégés par le droit de la propriété intellectuelle.'
        ]
      },
      {
        title: '5. Limitation de Responsabilité',
        content: [
          'Le service est fourni « en l\'état ». KeypadKing ne saurait être tenu responsable d\'éventuelles interruptions temporaires ou de pertes de données non sauvegardées.'
        ]
      },
      {
        title: '6. Contact',
        content: [
          'Pour toute question concernant nos conditions d\'utilisation, écrivez-nous à :'
        ],
        listItems: [
          'Courriel : contact@keypadking.com'
        ]
      }
    ]
  },
  es: {
    title: 'Términos de Uso',
    subtitle: 'Revise las condiciones que rigen el uso de la plataforma KeypadKing.',
    lastUpdated: 'Última actualización: Agosto de 2026',
    sections: [
      {
        title: '1. Aceptación de los Términos',
        content: [
          'Al acceder y utilizar KeypadKing (keypadking.com), usted acepta quedar sujeto a estos Términos de Uso y a la normativa legal aplicable.'
        ]
      },
      {
        title: '2. Descripción del Servicio',
        content: [
          'KeypadKing ofrece teclados virtuales en línea, transliteración fonética y herramientas de edición de texto multilingüe de acceso libre y gratuito.'
        ]
      },
      {
        title: '3. Uso Aceptable y Responsabilidades',
        content: [
          'Usted se compromete a hacer un uso lícito del servicio y es el único responsable de los textos generados y guardados en su dispositivo.'
        ]
      },
      {
        title: '4. Propiedad Intelectual y Limitación de Responsabilidad',
        content: [
          'La plataforma se suministra «tal cual» sin garantías explícitas de disponibilidad ininterrumpida. Los elementos visuales y el código son propiedad de KeypadKing.'
        ]
      },
      {
        title: '5. Contacto',
        content: [
          'Para consultas sobre estos términos, contáctenos en:'
        ],
        listItems: [
          'Correo electrónico: contact@keypadking.com'
        ]
      }
    ]
  },
  ar: {
    title: 'شروط الاستخدام',
    subtitle: 'يرجى قراءة الشروط والأحكام المنظمة لاستخدام منصة KeypadKing.',
    lastUpdated: 'آخر تحديث: أغسطس 2026',
    sections: [
      {
        title: '1. قبول الشروط',
        content: [
          'باستخدامك لموقع KeypadKing (keypadking.com)، فإنك توافق على الالتزام بشروط الاستخدام هذه وكافة القوانين واللوائح المعمول بها.'
        ]
      },
      {
        title: '2. وصف الخدمة',
        content: [
          'يقدم موقع KeypadKing لوحات مفاتيح افتراضية مجانية، وأدوات ترجمة صوتية، ولوحات لكتابة الرموز والحروف الخاصة بدون الحاجة لتثبيت برامج.'
        ]
      },
      {
        title: '3. الاستخدام المقبول',
        content: [
          'توافق على استخدام الموقع للأغراض المشروعة فقط وعدم محاولة إلحاق الضرر بالبنية التحتية أو التدخل في عمل الخدمة.'
        ]
      },
      {
        title: '4. الملكية الفكرية وإخلاء المسؤولية',
        content: [
          'يتم توفير الخدمة "كما هي". تحتفظ بحقوق ملكية نصوصك المكتوبة بالكامل، وتظل التصاميم البرمجية والشفرات محمية بحقوق الملكية الفكرية.'
        ]
      },
      {
        title: '5. التواصل',
        content: [
          'لأي استفسارات حول شروط الاستخدام، تواصل معنا عبر:'
        ],
        listItems: [
          'البريد الإلكتروني: contact@keypadking.com'
        ]
      }
    ]
  }
};

export const ABOUT_CONTENT: Record<SupportedLocale, StaticPageContent> = {
  en: {
    title: 'About KeypadKing',
    subtitle: 'Free online virtual keyboards designed for global multilingual communication.',
    sections: [
      {
        title: 'Our Mission',
        content: [
          'KeypadKing is a free online virtual keyboard platform designed to help people type characters and scripts that may not be available on their physical keyboard.',
          'Whether you are writing an email in Arabic, studying classical polytonic Greek, typing Russian Cyrillic on an English laptop, or looking for mathematical and phonetic symbols, KeypadKing provides an instant, frictionless solution right in your browser.'
        ]
      },
      {
        title: 'What You Can Do on KeypadKing',
        content: [
          'Our platform is engineered for speed, accessibility, and accuracy:',
        ],
        listItems: [
          'Type in diverse writing systems: Arabic, Cyrillic, Greek, Hebrew, Devanagari Hindi, Japanese Hiragana/Katakana, Korean Hangul, Tifinagh Berber, Amharic Ge\'ez, and more',
          'Smart Phonetic Transliteration: Type Arabic using intuitive Latin letters (Yamli-style) or transliterate Cyrillic in real time',
          'Full Diacritics & Accents: Easy one-click Tashkeel for Arabic, Greek breathing marks, and Latin accents',
          'Copy & Export Instantly: Copy text to clipboard, download as text files, or read aloud with speech synthesis',
          'Zero Installation Required: Works directly on desktop, tablet, and mobile browsers without requiring extra keyboard layout software'
        ]
      },
      {
        title: 'Client-Side Performance & Accessibility',
        content: [
          'KeypadKing is built with modern web technologies that prioritize performance, security, and privacy. Keystrokes are handled instantly on your device, ensuring zero typing latency and complete confidentiality for your writing.'
        ]
      },
      {
        title: 'Supported Writing Systems & Catalogs',
        content: [
          'Our catalog spans over 100 layouts across modern world languages, ancient scripts (such as Egyptian Hieroglyphs and Runic Futhark), scientific symbols, and specialized transcription systems like the International Phonetic Alphabet (IPA) and Braille.'
        ]
      }
    ]
  },
  fr: {
    title: 'À Propos de KeypadKing',
    subtitle: 'Plateforme gratuite de claviers virtuels en ligne pour toutes les langues du monde.',
    sections: [
      {
        title: 'Notre Mission',
        content: [
          'KeypadKing est une plateforme gratuite de claviers virtuels en ligne conçue pour vous permettre d\'écrire dans tous les alphabets et caractères non disponibles sur votre clavier physique.',
          'Que vous rédigiez un texte en arabe, étudiiez le grec ancien, écriviez en russe ou recherchiez des symboles phonétiques ou mathématiques, KeypadKing vous offre une solution immédiate directement dans votre navigateur web.'
        ]
      },
      {
        title: 'Ce que Vous Pouvez Faire sur KeypadKing',
        content: [
          'Notre plateforme propose des fonctionnalités pensées pour la rapidité et le confort :'
        ],
        listItems: [
          'Écrire dans de multiples systèmes d\'écriture : arabe, cyrillique, grec, hébreu, hindi, japonais, coréen, tifinaghe, etc.',
          'Translittération phonétique intelligente : écrivez l\'arabe ou le russe en lettres latines avec conversion instantanée',
          'Diacritiques et accents complets : voyelles du Tashkeel, accents grecs et symboles spéciaux',
          'Copie et exportation rapides : copiez en un clic ou téléchargez vos écrits',
          'Sans installation : accessible immédiatement sur ordinateur, tablette et smartphone'
        ]
      },
      {
        title: 'Rapidité et Confidentialité Côté Client',
        content: [
          'KeypadKing fonctionne directement dans votre navigateur, garantissant une saisie instantanée sans latence et une confidentialité totale de vos écrits.'
        ]
      }
    ]
  },
  es: {
    title: 'Acerca de KeypadKing',
    subtitle: 'Plataforma en línea de teclados virtuales gratuitos para todos los idiomas.',
    sections: [
      {
        title: 'Nuestra Misión',
        content: [
          'KeypadKing es una plataforma gratuita de teclados virtuales en línea diseñada para ayudar a las personas a escribir caracteres y alfabetos que no están disponibles en su teclado físico.',
          'Permite escribir en árabe, ruso cirílico, griego antiguo, hindi, japonés, símbolos matemáticos y muchos otros sistemas de escritura sin necesidad de instalar programas adicionales.'
        ]
      },
      {
        title: 'Características Principales',
        content: [
          'Herramientas avanzadas para una escritura fluida:'
        ],
        listItems: [
          'Más de 100 teclados y disposiciones lingüísticas disponibles',
          'Transliteración fonética inteligente en tiempo real',
          'Acceso completo a tildes, diacríticos y vocales harakat',
          'Copia instantánea al portapapeles y exportación rápida',
          '100% en el navegador, compatible con ordenadores y móviles'
        ]
      }
    ]
  },
  ar: {
    title: 'عن موقع KeypadKing',
    subtitle: 'منصة مجانية شاملة للوحات المفاتيح الافتراضية للكتابة بجميع لغات العالم.',
    sections: [
      {
        title: 'رسالتنا',
        content: [
          'منصة KeypadKing هي موقع مجاني للوحات المفاتيح الافتراضية مصممة لمساعدتك على الكتابة بمختلف اللغات والحروف غير المتوفرة على لوحة مفاتيحك الفعلية.',
          'سواء كنت بحاجة لكتابة نص باللغة العربية مع التشكيل، أو بالروسية السيريلية، أو اليونانية، أو الهندية، أو الحروف الصوتية والرموز الرياضية، يوفر لك KeypadKing حلاً سريعاً وفورياً مباشرة في متصفحك.'
        ]
      },
      {
        title: 'أبرز مميزات المنصة',
        content: [
          'تم تصميم المنصة لتوفير أقصى درجات السهولة والسرعة:'
        ],
        listItems: [
          'دعم واسع لمختلف أنظمة الكتابة: العربية، السيريلية، اليونانية، العبرية، الديفاناغارية، التيفيناغ، وغيرها',
          'الكتابة الصوتية والترجمة الذكية (Yamli) للتحويل الفوري من الحروف اللاتينية',
          'دعم كامل لحركات التشكيل والعلامات الخاصة',
          'النسخ الفوري والتصدير بضغطة زر واحدة',
          'بدون أي برامج إضافية: يعمل على الحواسيب والهواتف الذكية بسلاسة تامة'
        ]
      }
    ]
  }
};

export const CONTACT_CONTENT: Record<SupportedLocale, {
  title: string;
  subtitle: string;
  emailLabel: string;
  emailAddress: string;
  responseTime: string;
  guidelinesTitle: string;
  guidelines: string[];
  formNote: string;
}> = {
  en: {
    title: 'Contact KeypadKing',
    subtitle: 'We welcome your feedback, keyboard suggestions, and technical inquiries.',
    emailLabel: 'Direct Email Support',
    emailAddress: 'contact@keypadking.com',
    responseTime: 'We aim to respond to genuine inquiries within 2–3 business days.',
    guidelinesTitle: 'How We Can Help You',
    guidelines: [
      'Keyboard Suggestions: Request a new language, dialect layout, or specific character set',
      'Bug Reports: Report typing glitches, incorrect transliteration mappings, or display issues',
      'Educational & Research Inquiries: Questions regarding keyboard maps or phonetic layouts',
      'General Feedback: Suggestions for improving editor usability and performance'
    ],
    formNote: 'Please include your browser version and device type when reporting technical display issues.'
  },
  fr: {
    title: 'Contactez KeypadKing',
    subtitle: 'Vos retours, suggestions de claviers et questions techniques sont les bienvenus.',
    emailLabel: 'Adresse de Contact',
    emailAddress: 'contact@keypadking.com',
    responseTime: 'Nous répondons généralement aux demandes dans un délai de 2 à 3 jours ouvrés.',
    guidelinesTitle: 'Motifs de Contact',
    guidelines: [
      'Suggestions de Claviers : Proposer une nouvelle langue ou un agencement de touches spécifique',
      'Signalement de Bogues : Signaler une erreur de translittération ou un problème d\'affichage',
      'Questions Linguistiques : Renseignements sur les tables de caractères et translittérations',
      'Retours Généraux : Vos idées pour améliorer l\'expérience utilisateur'
    ],
    formNote: 'Pour tout problème technique, merci de préciser votre navigateur et votre type d\'appareil.'
  },
  es: {
    title: 'Contacto',
    subtitle: 'Envíenos sus comentarios, sugerencias de nuevos teclados o consultas técnicas.',
    emailLabel: 'Correo Electrónico de Contacto',
    emailAddress: 'contact@keypadking.com',
    responseTime: 'Intentamos responder a las consultas en un plazo de 2 a 3 días hábiles.',
    guidelinesTitle: '¿En qué podemos ayudarle?',
    guidelines: [
      'Sugerencias de Teclados: Solicitar un nuevo idioma o disposición de caracteres',
      'Reporte de Errores: Notificar fallos de escritura o problemas visuales',
      'Consultas Generales: Propuestas de mejora para la plataforma'
    ],
    formNote: 'Al reportar un error técnico, incluya el modelo de su dispositivo y navegador.'
  },
  ar: {
    title: 'اتصل بنا',
    subtitle: 'نرحب بملاحظاتكم، واقتراحاتكم لإضافة لوحات مفاتيح جديدة، واستفساراتكم الفنية.',
    emailLabel: 'البريد الإلكتروني المباشر',
    emailAddress: 'contact@keypadking.com',
    responseTime: 'نسعى للرد على جميع الاستفسارات خلال يومين إلى 3 أيام عمل.',
    guidelinesTitle: 'كيف يمكننا مساعدتك؟',
    guidelines: [
      'اقتراح لوحات مفاتيح جديدة: طلب لغات أو لهجات أو أنظمة كتابة إضافية',
      'الإبلاغ عن أخطاء: الإبلاغ عن مشكلات في تحويل الحروف أو العرض',
      'الملاحظات العامة: أفكار واقتراحات لتطوير تجربة الكتابة'
    ],
    formNote: 'يرجى ذكر نوع المتصفح والجهاز عند الإبلاغ عن أي مشكلة فنية.'
  }
};
