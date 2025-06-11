import { useEffect, useState } from 'react';
import Head from 'next/head';

const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
  { code: 'id', label: 'Indonesian' },
  { code: 'zh', label: '中文' },
];

const DEFAULT_LOCALE = 'en';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
// Utility function to handle base path
const getBasePath = () => BASE_PATH;

// Helper function for creating proper navigation links
const createNavLink = (locale: string) => {
  const basePath = getBasePath();
  return `${basePath}/${locale}`;
};

// Function to detect locale from current URL
const getLocaleFromPath = (): string => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  const pathname = window.location.pathname;
  const basePath = getBasePath();

  // Remove base path if present
  const cleanPath = basePath ? pathname.replace(basePath, '') : pathname;

  // Extract locale from path (e.g., /en/something -> en)
  const pathSegments = cleanPath.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  // Check if first segment is a supported locale
  const foundLocale = SUPPORTED_LOCALES.find(l => l.code === firstSegment);
  return foundLocale ? foundLocale.code : DEFAULT_LOCALE;
};

// Function to detect user's preferred locale from browser
const detectBrowserLocale = (): string => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  // Check browser language preferences
  const browserLanguages = navigator.languages || [navigator.language];

  for (const language of browserLanguages) {
    const langCode = language.split('-')[0].toLowerCase();

    if (langCode === 'uk' || language.toLowerCase().includes('ua')) return 'uk';
    if (langCode === 'ru') return 'ru';
    if (langCode === 'id') return 'id';
    if (langCode === 'zh' || langCode === 'cn') return 'zh';
    if (langCode === 'en') return 'en';
  }

  return DEFAULT_LOCALE;
};

export default function Custom404() {
  const [countdown, setCountdown] = useState(10);
  const [currentLocale, setCurrentLocale] = useState<string>(DEFAULT_LOCALE);
  const [targetLocale, setTargetLocale] = useState<string>(DEFAULT_LOCALE);

  useEffect(() => {
    // Get locale from current URL
    const urlLocale = getLocaleFromPath();
    setCurrentLocale(urlLocale);

    // If URL has no locale, use browser preference
    const preferredLocale = urlLocale !== DEFAULT_LOCALE ? urlLocale : detectBrowserLocale();
    setTargetLocale(preferredLocale);

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Store the target locale for future visits
          localStorage.setItem('preferred-locale', preferredLocale);
          // Redirect to the homepage in the preferred locale
          window.location.href = createNavLink(preferredLocale);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLocaleSelect = (locale: string) => {
    localStorage.setItem('preferred-locale', locale);
    window.location.href = createNavLink(locale);
  };

  // Localized messages
  const messages = {
    en: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
      redirecting: 'Redirecting to homepage in',
      seconds: 'seconds',
      selectLanguage: 'Or select your language:',
      goHome: 'Go to Homepage',
      tryBot: 'Try Telegram Bot'
    },
    ru: {
      title: 'Страница не найдена',
      description: 'Страница, которую вы ищете, не существует.',
      redirecting: 'Перенаправление на главную через',
      seconds: 'секунд',
      selectLanguage: 'Или выберите ваш язык:',
      goHome: 'На главную',
      tryBot: 'Попробовать Telegram бота'
    },
    uk: {
      title: 'Сторінка не знайдена',
      description: 'Сторінка, яку ви шукаєте, не існує.',
      redirecting: 'Перенаправлення на головну через',
      seconds: 'секунд',
      selectLanguage: 'Або оберіть вашу мову:',
      goHome: 'На головну',
      tryBot: 'Спробувати Telegram бота'
    },
    id: {
      title: 'Halaman Tidak Ditemukan',
      description: 'Halaman yang Anda cari tidak ada.',
      redirecting: 'Mengarahkan ke beranda dalam',
      seconds: 'detik',
      selectLanguage: 'Atau pilih bahasa Anda:',
      goHome: 'Ke Beranda',
      tryBot: 'Coba Bot Telegram'
    },
    zh: {
      title: '页面未找到',
      description: '您寻找的页面不存在。',
      redirecting: '正在重定向到主页，',
      seconds: '秒后',
      selectLanguage: '或选择您的语言：',
      goHome: '回到主页',
      tryBot: '试用 Telegram 机器人'
    }
  };

  const currentMessages = messages[currentLocale as keyof typeof messages] || messages.en;

  return (
    <>
      <Head>
        <title>{`404 - ${currentMessages.title} | Scam Radar`}</title>
        <meta name="description" content={`${currentMessages.description} Scam Radar - Advanced cryptocurrency scam detection bot.`} />
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="Content-Language" content={currentLocale} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00b894" />

        {/* Open Graph */}
        <meta property="og:title" content={`404 - ${currentMessages.title} | Scam Radar`} />
        <meta property="og:description" content={`${currentMessages.description} Scam Radar - Advanced cryptocurrency scam detection bot.`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${getBasePath()}/logo.webp`} />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:site_name" content="Scam Radar" />

        {/* X (formerly Twitter) */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`404 - ${currentMessages.title} | Scam Radar`} />
        <meta name="twitter:description" content={`${currentMessages.description} Scam Radar - Advanced cryptocurrency scam detection bot.`} />
        <meta name="twitter:image" content={`${getBasePath()}/logo.webp`} />

        <link rel="canonical" href={`https://scam-radar.net/`} />
        <link rel="icon" href={`${getBasePath()}/favicon.ico`} />

        {/* Structured Data for 404 Page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": `404 - ${currentMessages.title}`,
              "description": `${currentMessages.description} Scam Radar - Advanced cryptocurrency scam detection bot.`,
              "url": typeof window !== 'undefined' ? window.location.href : '',
              "mainEntity": {
                "@type": "Thing",
                "name": "Page Not Found",
                "description": "The requested page could not be found on this server."
              },
              "isPartOf": {
                "@type": "WebSite",
                "name": "Scam Radar",
                "url": "https://scam-radar.net"
              }
            })
          }}
        />
      </Head>
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-green-400 mb-4" style={{ fontSize: '3.75rem' }}>404</h1>
          <h2 className="text-2xl font-semibold text-white mb-6">{currentMessages.title}</h2>
          <p className="text-gray-300 mb-8">{currentMessages.description}</p>

          {countdown > 0 && (
            <div className="mb-8">
              <p className="text-green-400 mb-4">
                {currentMessages.redirecting} <span className="font-bold text-white">{countdown}</span> {currentMessages.seconds}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="bg-green-400 h-2 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="mb-8">
            <p className="text-gray-400 mb-4">{currentMessages.selectLanguage}</p>
            <div className="grid grid-cols-2 gap-3">
              {SUPPORTED_LOCALES.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleLocaleSelect(locale.code)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    currentLocale === locale.code
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {locale.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleLocaleSelect(targetLocale)}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              {currentMessages.goHome}
            </button>
            <a
              href="https://t.me/scam_radar_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500 text-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-colors"
            >
              {currentMessages.tryBot}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
