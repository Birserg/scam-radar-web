import Head from 'next/head';

const SUPPORTED_LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
  { code: 'uk', label: 'Українська' },
  { code: 'id', label: 'Indonesian' },
  { code: 'zh', label: '中文' },
];

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const getBasePath = () => BASE_PATH;

export default function Custom404() {
  const messages = {
    en: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
      selectLanguage: 'Or select your language:',
      goHome: 'Go to Homepage',
      tryBot: 'Try Telegram Bot'
    },
    ru: {
      title: 'Страница не найдена',
      description: 'Страница, которую вы ищете, не существует.',
      selectLanguage: 'Или выберите ваш язык:',
      goHome: 'На главную',
      tryBot: 'Попробовать Telegram бота'
    },
    uk: {
      title: 'Сторінка не знайдена',
      description: 'Сторінка, яку ви шукаєте, не існує.',
      selectLanguage: 'Або оберіть вашу мову:',
      goHome: 'На головну',
      tryBot: 'Спробувати Telegram бота'
    },
    id: {
      title: 'Halaman Tidak Ditemukan',
      description: 'Halaman yang Anda cari tidak ada.',
      selectLanguage: 'Atau pilih bahasa Anda:',
      goHome: 'Ke Beranda',
      tryBot: 'Coba Bot Telegram'
    },
    zh: {
      title: '页面未找到',
      description: '您寻找的页面不存在。',
      selectLanguage: '或选择您的语言：',
      goHome: '回到主页',
      tryBot: '试用 Telegram 机器人'
    }
  };

  const currentMessages = messages.en;

  return (
    <>
      <Head>
        <title>{`404 - ${currentMessages.title} | Scam Radar`}</title>
        <meta name="description" content={`${currentMessages.description} Scam Radar - Advanced cryptocurrency scam detection bot.`} />
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="Content-Language" content="en" />
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
              "url": "https://scam-radar.net/404",
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

        {/* Client-side script for dynamic behavior */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function detectUserLocale() {
                  if (typeof window !== 'undefined' && localStorage.getItem('preferred-locale')) {
                    return localStorage.getItem('preferred-locale');
                  }

                  const browserLanguages = navigator.languages || [navigator.language];

                  for (const language of browserLanguages) {
                    const langCode = language.split('-')[0].toLowerCase();

                    if (langCode === 'uk' || language.toLowerCase().includes('ua')) return 'uk';
                    if (langCode === 'ru') return 'ru';
                    if (langCode === 'id') return 'id';
                    if (langCode === 'zh' || langCode === 'cn') return 'zh';
                    if (langCode === 'en') return 'en';
                  }

                  return 'en';
                }

                function createNavLink(locale) {
                  const basePath = '${getBasePath()}';
                  return basePath + '/' + locale;
                }

                function updateContent() {
                  const locale = detectUserLocale();
                  const messages = {
                    en: {
                      title: 'Page Not Found',
                      description: 'The page you are looking for does not exist.',
                      selectLanguage: 'Or select your language:',
                      goHome: 'Go to Homepage',
                      tryBot: 'Try Telegram Bot'
                    },
                    ru: {
                      title: 'Страница не найдена',
                      description: 'Страница, которую вы ищете, не существует.',
                      selectLanguage: 'Или выберите ваш язык:',
                      goHome: 'На главную',
                      tryBot: 'Попробовать Telegram бота'
                    },
                    uk: {
                      title: 'Сторінка не знайдена',
                      description: 'Сторінка, яку ви шукаєте, не існує.',
                      selectLanguage: 'Або оберіть вашу мову:',
                      goHome: 'На головну',
                      tryBot: 'Спробувати Telegram бота'
                    },
                    id: {
                      title: 'Halaman Tidak Ditemukan',
                      description: 'Halaman yang Anda cari tidak ada.',
                      selectLanguage: 'Atau pilih bahasa Anda:',
                      goHome: 'Ke Beranda',
                      tryBot: 'Coba Bot Telegram'
                    },
                    zh: {
                      title: '页面未找到',
                      description: '您寻找的页面不存在。',
                      selectLanguage: '或选择您的语言：',
                      goHome: '回到主页',
                      tryBot: '试用 Telegram 机器人'
                    }
                  };

                  const msg = messages[locale] || messages.en;

                  document.title = '404 - ' + msg.title + ' | Scam Radar';

                  const titleEl = document.getElementById('error-title');
                  const descEl = document.getElementById('error-description');
                  const selectEl = document.getElementById('select-language');
                  const goHomeEl = document.getElementById('go-home');
                  const tryBotEl = document.getElementById('try-bot');

                  if (titleEl) titleEl.textContent = msg.title;
                  if (descEl) descEl.textContent = msg.description;
                  if (selectEl) selectEl.textContent = msg.selectLanguage;
                  if (goHomeEl) goHomeEl.textContent = msg.goHome;
                  if (tryBotEl) tryBotEl.textContent = msg.tryBot;

                  // Auto-redirect after 5 seconds
                  setTimeout(function() {
                    localStorage.setItem('preferred-locale', locale);
                    window.location.href = createNavLink(locale);
                  }, 5000);
                }

                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', updateContent);
                } else {
                  updateContent();
                }

                window.handleLocaleSelect = function(locale) {
                  localStorage.setItem('preferred-locale', locale);
                  window.location.href = createNavLink(locale);
                };
              })();
            `
          }}
        />
      </Head>

      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-green-400 mb-4" style={{ fontSize: '3.75rem' }}>404</h1>
          <h2 className="text-2xl font-semibold text-white mb-6" id="error-title">{currentMessages.title}</h2>
          <p className="text-gray-300 mb-8" id="error-description">{currentMessages.description}</p>

          <div className="mb-8">
            <p className="text-gray-400 mb-4" id="select-language">{currentMessages.selectLanguage}</p>
            <div className="grid grid-cols-2 gap-3">
              {SUPPORTED_LOCALES.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => `handleLocaleSelect('${locale.code}')`}
                  className="px-4 py-2 rounded-lg font-semibold transition-all duration-200 bg-gray-800 text-gray-300 hover:bg-gray-700"
                >
                  {locale.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => `handleLocaleSelect('en')`}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              id="go-home"
            >
              {currentMessages.goHome}
            </button>
            <a
              href="https://t.me/scam_radar_bot?start=ref_02955EE53301"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-500 text-green-500 px-6 py-3 rounded-lg font-semibold hover:bg-green-500 hover:text-white transition-colors"
              id="try-bot"
            >
              {currentMessages.tryBot}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
