import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const SUPPORTED_LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uk', label: 'UK' },
  { code: 'id', label: 'ID' },
  { code: 'zh', label: 'ZH' },
];

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
  return `${basePath}/${locale}`;
};

// Function to detect user's preferred locale
const detectUserLocale = (): string => {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  // Check if locale is stored in localStorage
  const storedLocale = localStorage.getItem('preferred-locale');
  if (storedLocale && SUPPORTED_LOCALES.some(l => l.code === storedLocale)) {
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

interface Messages {
  [key: string]: string | string[] | { [key: string]: unknown };
}

export default function Index() {
  const router = useRouter();
  const [messages, setMessages] = useState<Messages>({});
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const preferredLocale = detectUserLocale();

    // Load locale messages for SEO content
    const loadLocaleMessages = async () => {
      try {
        const localeMessages = await import(`../locales/${preferredLocale}.json`);
        setMessages(localeMessages.default);
      } catch {
        // Fallback to English if locale not found
        const fallbackMessages = await import(`../locales/en.json`);
        setMessages(fallbackMessages.default);
      }
    };

    loadLocaleMessages();

    // Store user preference
    if (typeof window !== 'undefined' && !localStorage.getItem('preferred-locale')) {
      localStorage.setItem('preferred-locale', preferredLocale);
    }

    // Only redirect if user is not a search engine bot
    const isBot = /bot|crawler|spider|crawling/i.test(navigator.userAgent);
    if (!isBot && !isRedirecting) {
      setIsRedirecting(true);
      // Add a small delay to allow search engines to crawl the content
      setTimeout(() => {
        router.replace(createNavLink(preferredLocale));
      }, 1000);
    }
  }, [router, isRedirecting]);

  const t = (key: string): string => {
    const value = key.split('.').reduce<unknown>((obj, k) => (obj && typeof obj === 'object' ? (obj as Record<string, unknown>)[k] : undefined), messages);
    return (value as string) || '';
  };

  return (
    <>
      <Head>
        <title>{t('meta.title') || "Scam Radar — Crypto Scam & Honeypot Detector"}</title>
        <meta name="description" content={t('meta.description') || "Cryptocurrency scam detection bot. Protect your crypto investments with real-time smart contract analysis across Ethereum, BSC, Solana, and Base networks."} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://scam-radar.net/" />

        {/* Language alternatives for SEO */}
        <link rel="alternate" hrefLang="en" href="https://scam-radar.net/en" />
        <link rel="alternate" hrefLang="ru" href="https://scam-radar.net/ru" />
        <link rel="alternate" hrefLang="uk" href="https://scam-radar.net/uk" />
        <link rel="alternate" hrefLang="id" href="https://scam-radar.net/id" />
        <link rel="alternate" hrefLang="zh" href="https://scam-radar.net/zh" />
        <link rel="alternate" hrefLang="x-default" href="https://scam-radar.net/en" />

        {/* Open Graph */}
        <meta property="og:title" content={t('meta.ogTitle') || "Scam Radar - Crypto Scam Detection"} />
        <meta property="og:description" content={t('meta.ogDescription') || "Cryptocurrency scam detection and honeypot checker bot"} />
        <meta property="og:url" content="https://scam-radar.net/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${getBasePath()}/og-image.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/webp" />
        <meta property="og:site_name" content="Scam Radar" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.twitterTitle') || "Scam Radar - Crypto Scam Detection"} />
        <meta name="twitter:description" content={t('meta.twitterDescription') || "Cryptocurrency scam detection and honeypot checker bot"} />
        <meta name="twitter:image" content={`${getBasePath()}/twitter-image.webp`} />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="GeK4WZtgQtonCWGVzCF4Ipy7ED6ZO19E75TsxX7vgCk" />

        {/* Additional SEO Meta Tags */}
        <meta name="keywords" content={t('meta.keywords') || "crypto scam detector, honeypot checker, smart contract analysis, telegram crypto bot, ethereum scam detection, BSC honeypot, solana security, DeFi safety, crypto investment protection"} />
        <meta name="subject" content="Cryptocurrency Security" />
        <meta name="target" content="crypto investors, DeFi traders, blockchain users, crypto traders, traders beginners" />

        {/* Viewport and Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5" />

        {/* Favicon and Icons */}
        <link rel="icon" href={`${getBasePath()}/favicon.ico`} sizes="32x32" />
        <link rel="icon" href={`${getBasePath()}/favicon.svg`} type="image/svg+xml" />
        <link rel="icon" href={`${getBasePath()}/favicon-16x16.png`} type="image/png" sizes="16x16" />
        <link rel="icon" href={`${getBasePath()}/favicon-32x32.png`} type="image/png" sizes="32x32" />
        <link rel="icon" href={`${getBasePath()}/favicon-48x48.png`} type="image/png" sizes="48x48" />
        <link rel="icon" href={`${getBasePath()}/favicon-96x96.png`} type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href={`${getBasePath()}/apple-touch-icon.png`} sizes="180x180" />
        <meta name="apple-mobile-web-app-title" content="Scam Radar" />
        <link rel="manifest" href={`${getBasePath()}/manifest.json`} />
        <meta name="theme-color" content="#00b894" />
        <meta name="msapplication-config" content={`${getBasePath()}/browserconfig.xml`} />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//t.me" />

        {/* WebSite Schema - Root page only */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Scam Radar",
              "url": "https://scam-radar.net",
              "description": "Advanced crypto scam detection and honeypot checker",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://scam-radar.net/{locale}",
                "query-input": "required name=locale"
              },
              "inLanguage": ["en", "ru", "uk", "id", "zh"]
            })
          }}
        />

        {/* Critical CSS for SEO content visibility */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Hide content from users but keep it accessible to search engines */
            .seo-content {
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              width: 1px !important;
              height: 1px !important;
              overflow: hidden !important;
              opacity: 0 !important;
              pointer-events: none !important;
              user-select: none !important;
            }

            /* Ensure search engines can still read the content */
            .seo-content h1,
            .seo-content h2,
            .seo-content h3,
            .seo-content p,
            .seo-content div {
              display: block !important;
              visibility: visible !important;
            }

            /* Loading spinner styles */
            .loading-container {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              background: black;
              padding: 1rem;
            }

            .loading-spinner {
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `
        }} />
      </Head>

      {/* User-facing loading UI */}
      {isClient && (
        <div className="loading-container">
          <div className="text-center">
            <div className="loading-spinner rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
            <h1 className="text-2xl font-semibold text-white mb-2">Scam Radar</h1>
            <h2 className="text-xl text-green-400 mb-6">Advanced Crypto Scam Detection & Honeypot Checker</h2>
            <p className="text-gray-300 mb-6">
              Detecting your preferred language...
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUPPORTED_LOCALES.map((locale) => (
                <a
                  key={locale.code}
                  href={createNavLink(locale.code)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  {locale.label}
                </a>
              ))}
            </div>
            {isRedirecting && (
              <div className="mt-4">
                <p className="text-gray-400">Redirecting to your preferred language...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEO content - hidden from users but visible to search engines */}
      <div className="seo-content">
        <div className="max-w-6xl mx-auto">
          {/* Logo */}
          <Image
            src="/logo.webp"
            alt="Scam Radar Logo"
            width={120}
            height={120}
            priority
          />

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Scam Radar
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl md:text-2xl text-green-400 mb-8">
            Advanced Crypto Scam Detection & Honeypot Checker
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Protect your cryptocurrency investments with Scam Radar, the most trusted Telegram bot for detecting scams and honeypots. Analyze smart contracts instantly across Ethereum, BSC, Solana, and Base networks.
          </p>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-green-400 font-semibold mb-2">Smart Contract Analysis</h3>
              <p className="text-gray-300 text-sm">Advanced real-time detection of crypto scams and honeypot tokens</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-green-400 font-semibold mb-2">Multi-Language Support</h3>
              <p className="text-gray-300 text-sm">Available in English, Russian, Ukrainian, Indonesian, and Chinese</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-green-400 font-semibold mb-2">Telegram Bot</h3>
              <p className="text-gray-300 text-sm">Easy to use Telegram interface with instant results</p>
            </div>
          </div>

          {/* Language Selection */}
          <div className="mb-12">
            <p className="text-gray-400 mb-6">Choose your language:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {SUPPORTED_LOCALES.map((locale) => (
                <a
                  key={locale.code}
                  href={createNavLink(locale.code)}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                  title={`View Scam Radar in ${locale.label}`}
                >
                  {locale.label}
                </a>
              ))}
            </div>
          </div>

          {/* Referral Program */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <div className="text-center">
              <h3 className="text-green-400 font-semibold mb-2 flex items-center justify-center gap-2">
                <span>🎁</span>
                {t('referral.heroTitle') || 'Referral Bonus'}
              </h3>
              <p className="text-gray-300 text-sm mb-4">
                {t('referral.heroSubtitle') || 'Invite friends and both of you get 3 free token checks each!'}
              </p>
              <button className="bg-green-500 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors">
                {t('referral.heroButton') || 'Get Referral Link'}
              </button>
            </div>
          </div>

          {/* Loading indicator for users */}
          {isRedirecting && (
            <div className="mt-4">
              <p className="text-gray-400">Redirecting to your preferred language...</p>
            </div>
          )}

          {/* Additional SEO Content */}
          <div className="mt-16 text-sm text-gray-500 leading-relaxed max-w-4xl mx-auto">
            <p className="mb-4">
              Scam Radar supports multiple blockchain networks including Ethereum, Binance Smart Chain (BSC), Solana, and Base. Our advanced algorithms analyze smart contracts in real-time to detect potential scams, honeypots, and malicious tokens before you invest.
            </p>
            <p className="mb-4">
              We detect various types of crypto scams including honeypot tokens, rug pulls, fake tokens, liquidity traps, and malicious smart contracts. Our comprehensive analysis includes contract verification, liquidity analysis, ownership checks, and trading simulation.
            </p>
            <p>
              Start using Scam Radar today to protect your cryptocurrency investments. Join thousands of crypto traders who trust our advanced scam detection technology to keep their funds safe.
            </p>
          </div>

          {/* Supported Networks */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Supported Blockchain Networks</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Ethereum (ETH) - ERC-20 tokens</li>
              <li>• Binance Smart Chain (BSC) - BEP-20 tokens</li>
              <li>• Solana (SOL) - SPL tokens</li>
              <li>• Base - Base network tokens</li>
              <li>• More networks coming soon</li>
            </ul>
          </div>

          {/* Additional SEO keywords */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Crypto Security Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Real-time honeypot detection</li>
              <li>• Smart contract security analysis</li>
              <li>• Liquidity pool verification</li>
              <li>• Token ownership analysis</li>
              <li>• Trading simulation testing</li>
              <li>• Multi-blockchain support</li>
              <li>• Instant risk assessment</li>
              <li>• DeFi safety tools</li>
            </ul>
          </div>

          {/* Referral Program for SEO */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-green-400 mb-4">{t('referral.title') || 'Referral Program'}</h3>
            <p className="text-gray-300 text-sm mb-4">
              {t('referral.sectionSubtitle') || 'Join our referral program and earn 3 free token checks for each friend you invite. Both you and your friend benefit from this crypto security tool. Share Scam Radar with your crypto community and help protect more investors from scams.'}
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• {t('referral.forYouDesc') || 'Earn 3 free token checks per referral'}</li>
              <li>• {t('referral.forFriendDesc') || 'Your friend also gets 3 free checks'}</li>
              <li>• No limits on referrals</li>
              <li>• Instant rewards</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
