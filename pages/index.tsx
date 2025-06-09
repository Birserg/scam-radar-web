import { useEffect } from 'react';
import Head from 'next/head';

const SUPPORTED_LOCALES = ['en', 'ru', 'uk', 'id', 'zh'];
const DEFAULT_LOCALE = 'en';

// Utility function to handle base path for GitHub Pages
const getBasePath = () => {
  // For static sites: GitHub Pages needs base path, others don't
  // This is determined at build time, not runtime
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on GitHub Pages by domain
    const isGitHubPages = window.location.hostname.includes('github.io');
    return isGitHubPages ? '/scam-radar-web' : '';
  }

  // Server-side/build-time: use the injected base path
  return process.env.NEXT_PUBLIC_BASE_PATH || '';
};

// Helper function for creating proper navigation links
const createNavLink = (locale: string) => {
  const basePath = getBasePath();
  return `${basePath}/${locale}/`;
};

// Function to detect user's preferred locale
const detectUserLocale = (): string => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  // Check if locale is stored in localStorage
  const storedLocale = localStorage.getItem('preferred-locale');
  if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale)) {
    return storedLocale;
  }

  // Check browser language preferences
  const browserLanguages = navigator.languages || [navigator.language];

  for (const language of browserLanguages) {
    // Extract language code (e.g., 'en-US' -> 'en')
    const langCode = language.split('-')[0].toLowerCase();

    // Special cases for language mapping
    if (langCode === 'uk' || language.toLowerCase().includes('ua')) {
      return 'uk'; // Ukrainian
    }
    if (langCode === 'ru') {
      return 'ru'; // Russian
    }
    if (langCode === 'id') {
      return 'id'; // Indonesian
    }
    if (langCode === 'zh' || langCode === 'cn') {
      return 'zh'; // Chinese
    }
    if (langCode === 'en') {
      return 'en'; // English
    }
  }

  return DEFAULT_LOCALE;
};

export default function Index() {
  useEffect(() => {
    const preferredLocale = detectUserLocale();

    // Store the detected locale for future visits
    localStorage.setItem('preferred-locale', preferredLocale);

    // Redirect to the appropriate locale
    window.location.href = createNavLink(preferredLocale);
  }, []);

  return (
    <>
      <Head>
        <title>Scam Radar - Crypto Scam Detection</title>
        <meta name="description" content="Detecting your preferred language and redirecting..." />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-white mb-2">Scam Radar</h1>
          <p className="text-gray-300 mb-6">
            Detecting your preferred language...
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SUPPORTED_LOCALES.map((locale) => (
              <a
                key={locale}
                href={createNavLink(locale)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                {locale.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
