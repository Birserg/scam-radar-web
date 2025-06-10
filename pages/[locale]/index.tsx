import Head from 'next/head';
import { useState } from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

import { FaTelegramPlane, FaEye, FaRobot, FaShieldAlt, FaBell, FaCrown, FaEnvelope, FaCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SUPPORTED_LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uk', label: 'UK' },
  { code: 'id', label: 'ID' },
  { code: 'zh', label: 'ZH' },
];

// Utility function to handle base path consistently across the app
const getBasePath = () => process.env.NEXT_PUBLIC_BASE_PATH || '';

// Helper function for creating proper navigation links
const createNavLink = (locale: string, anchor?: string) => {
  const basePath = getBasePath();
  const path = `${basePath}/${locale}`;
  return anchor ? `${path}#${anchor}` : path;
};

// Helper function for canonical URL
const getCanonicalUrl = (locale: string) => {
  const basePath = getBasePath();

  // For GitHub Pages deployment
  if (basePath) {
    return `https://birserg.github.io${basePath}/${locale}`;
  }

  // For local development or custom domain
  return `https://scam-radar.net/${locale}`;
};

export async function getStaticPaths() {
  return {
    paths: SUPPORTED_LOCALES.map(l => ({ params: { locale: l.code } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  let messages = {};
  try {
    messages = await import(`../../locales/${locale}.json`).then(m => m.default);
  } catch {
    messages = await import(`../../locales/en.json`).then(m => m.default);
  }
  return {
    props: {
      locale,
      messages,
    },
  };
}

interface Messages {
  [key: string]: string | string[] | { [key: string]: unknown };
}

export default function Home({ locale, messages }: { locale: string; messages: Messages }) {
  const t = (key: string): string | string[] | { [key: string]: unknown } | undefined => {
    const value = key.split('.').reduce<unknown>((obj, k) => (obj && typeof obj === 'object' ? (obj as Record<string, unknown>)[k] : undefined), messages);
    return value as string | string[] | { [key: string]: unknown } | undefined;
  };

  const [localeMenu, setLocaleMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLocaleChange = (code: string) => {
    // Store the user's manual locale selection
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-locale', code);
    }
    window.location.href = createNavLink(code);
  };

  return (
    <>
      <Head>
        <title>{(t('meta.title') as string) || ''}</title>
        <meta name="description" content={(t('meta.description') as string) || ''} />
        <meta name="keywords" content={(t('meta.keywords') as string) || ''} />
        <meta name="author" content={(t('meta.author') as string) || 'Scam Radar Team'} />
        <meta name="publisher" content={(t('meta.publisher') as string) || 'Scam Radar'} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large" />
        <meta name="googlebot" content="index, follow" />
        <meta httpEquiv="Content-Language" content={locale} />
        <meta name="application-name" content={(t('meta.applicationName') as string) || 'Scam Radar'} />
        <meta name="theme-color" content="#00b894" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={(t('meta.applicationName') as string) || 'Scam Radar'} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Scam Radar" />
        <meta property="og:title" content={(t('meta.ogTitle') as string) || ''} />
        <meta property="og:description" content={(t('meta.ogDescription') as string) || ''} />
        <meta property="og:image" content={`${getBasePath()}${(t('meta.ogImage') as string) || '/og-image.jpeg'}`} />
        <meta property="og:image:alt" content={(t('meta.ogImageAlt') as string) || 'Scam Radar - Cryptocurrency Scam Detection Bot'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={getCanonicalUrl(locale)} />
        <meta property="og:locale" content={(t('meta.locale') as string) || locale.replace('-', '_')} />
        {((t('meta.alternateLocales') as string[]) || []).map((altLocale) => (
          <meta key={altLocale} property="og:locale:alternate" content={altLocale} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ScamRadarBot" />
        <meta name="twitter:creator" content="@ScamRadarBot" />
        <meta name="twitter:title" content={(t('meta.twitterTitle') as string) || ''} />
        <meta name="twitter:description" content={(t('meta.twitterDescription') as string) || ''} />
        <meta name="twitter:image" content={`${getBasePath()}${(t('meta.twitterImage') as string) || '/twitter-image.jpeg'}`} />
        <meta name="twitter:image:alt" content={(t('meta.twitterImageAlt') as string) || 'Scam Radar Bot - Protect Your Crypto'} />

        {/* Additional SEO Meta Tags */}
        <meta name="category" content={(t('meta.category') as string) || 'Cryptocurrency Security Tools'} />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        <meta name="referrer" content="no-referrer-when-downgrade" />

        {/* Alternate Language Links */}
        {SUPPORTED_LOCALES.map((l) => (
          <link key={l.code} rel="alternate" hrefLang={l.code} href={getCanonicalUrl(l.code)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={getCanonicalUrl('en')} />

        {/* Canonical and Other Links */}
        <link rel="canonical" href={getCanonicalUrl(locale)} />
        <link rel="icon" href={`${getBasePath()}/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${getBasePath()}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${getBasePath()}/manifest.json`} />

        {/* Viewport and Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no" />
        <meta name="format-detection" content="telephone=no" />

        {/* Performance Optimizations */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//t.me" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
        <link rel="preload" href={`${getBasePath()}/logo.jpeg`} as="image" type="image/jpeg" />
        <link rel="modulepreload" href="/_next/static/chunks/pages/[locale]/index.js" />

        {/* Resource Hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />

        {/* Performance Meta */}
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Structured Data */}
        {t('meta.structuredData') && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(t('meta.structuredData'))
            }}
          />
        )}

        {/* Organization Schema */}
        {t('meta.organizationData') && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(t('meta.organizationData'))
            }}
          />
        )}

        {/* FAQ Schema */}
        {Array.isArray(t('faq.questions')) && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": (t('faq.questions') as unknown as Array<{question: string, answer: string}>).map(item => ({
                  "@type": "Question",
                  "name": item.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": item.answer
                  }
                }))
              })
            }}
          />
        )}
      </Head>
      <div className="bg-black min-h-screen w-full relative overflow-x-hidden">
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {/* Mobile-Optimized Navigation */}
        <nav role="navigation" aria-label="Main navigation" className="fixed top-0 left-0 w-full z-50 bg-black/95 shadow-xl border-b border-green-600/40 md:backdrop-blur-2xl">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo and Brand */}
              <div className="flex items-center gap-3" itemScope itemType="https://schema.org/Organization">
                <Image
                  src={`${getBasePath()}/logo.jpeg`}
                  alt="Scam Radar Logo"
                  width={40}
                  height={40}
                  className="rounded-full shadow-lg border-2 border-green-500/60"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  itemProp="logo"
                />
                <span className="text-xl md:text-2xl font-extrabold tracking-tight text-white drop-shadow-lg" itemProp="name">
                  {(t('home.brand') as string) || 'Scam Radar'}
                </span>
                <meta itemProp="url" content={getCanonicalUrl(locale)} />
                <meta itemProp="description" content={(t('meta.description') as string) || ''} />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-6">
                <div className="flex gap-6 text-lg font-semibold">
                  <a href={createNavLink(locale, 'home')} className="text-white hover:text-green-400 transition">{(t('nav.home') as string) || 'Home'}</a>
                  <a href={createNavLink(locale, 'how')} className="text-white hover:text-green-400 transition">{(t('nav.howItWorks') as string) || 'How It Works'}</a>
                  <a href={createNavLink(locale, 'pricing')} className="text-white hover:text-green-400 transition">{(t('nav.pricing') as string) || 'Pricing'}</a>
                  <a href={createNavLink(locale, 'faq')} className="text-white hover:text-green-400 transition">{(t('nav.faq') as string) || 'FAQ'}</a>
                  <a href={createNavLink(locale, 'contacts')} className="text-white hover:text-green-400 transition">{(t('nav.contacts') as string) || 'Contact'}</a>
                </div>

                {/* Desktop Locale Switcher */}
                <div className="relative">
                  <button
                    onClick={() => setLocaleMenu((v) => !v)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500 text-white shadow-lg border border-white/20 backdrop-blur-lg font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-green-400/40 transition-all hover:bg-green-600"
                    aria-haspopup="listbox"
                    aria-expanded={localeMenu}
                    type="button"
                  >
                    <GlobeAltIcon className="w-5 h-5 text-white" title="Globe" />
                    <span className="hidden sm:inline">{SUPPORTED_LOCALES.find((l) => l.code === locale)?.label || locale}</span>
                    <span className="sm:hidden">{locale.toUpperCase()}</span>
                  </button>
                  {localeMenu && (
                    <div className="absolute right-0 mt-2 bg-black/95 border border-white/10 rounded-xl shadow-2xl z-[100] min-w-[140px] py-2 px-1 backdrop-blur-xl">
                      {SUPPORTED_LOCALES.filter((l) => l.code !== locale).map((l) => (
                        <button
                          key={l.code}
                          className="block w-full px-4 py-2 rounded-lg text-white hover:bg-green-600 hover:text-black text-sm transition-colors text-left"
                          onClick={() => {
                            handleLocaleChange(l.code);
                            setLocaleMenu(false);
                          }}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Toggle */}
              <div className="md:hidden flex items-center gap-3">
                {/* Mobile Locale Switcher */}
                <div className="relative">
                  <button
                    onClick={() => setLocaleMenu((v) => !v)}
                    className="flex items-center gap-1 px-3 py-2 rounded-full bg-green-500 text-white shadow-lg border border-white/20 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-green-400/40 transition-all"
                    type="button"
                  >
                    <GlobeAltIcon className="w-4 h-4 text-white" />
                    {locale.toUpperCase()}
                  </button>
                  {localeMenu && (
                    <div className="absolute right-0 mt-2 bg-black/95 border border-white/10 rounded-xl shadow-2xl z-[100] min-w-[120px] py-2 px-1 backdrop-blur-xl">
                      {SUPPORTED_LOCALES.filter((l) => l.code !== locale).map((l) => (
                        <button
                          key={l.code}
                          className="block w-full px-3 py-2 rounded-lg text-white hover:bg-green-600 hover:text-black text-sm transition-colors text-left"
                          onClick={() => {
                            handleLocaleChange(l.code);
                            setLocaleMenu(false);
                          }}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hamburger Menu Button */}
                <button
                  onClick={() => setMobileMenu((v) => !v)}
                  className="p-2 rounded-lg bg-green-500 text-white shadow-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-green-400/40 transition-all"
                  aria-label="Toggle mobile menu"
                  type="button"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenu ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
              <div className="md:hidden mt-4 pb-4 border-t border-green-600/30">
                <div className="flex flex-col space-y-3 pt-4">
                  <a
                    href={createNavLink(locale, 'home')}
                    className="block px-4 py-3 text-white hover:text-green-400 hover:bg-green-500/10 rounded-lg transition text-lg font-semibold"
                    onClick={() => setMobileMenu(false)}
                  >
                    {(t('nav.home') as string) || 'Home'}
                  </a>
                  <a
                    href={createNavLink(locale, 'how')}
                    className="block px-4 py-3 text-white hover:text-green-400 hover:bg-green-500/10 rounded-lg transition text-lg font-semibold"
                    onClick={() => setMobileMenu(false)}
                  >
                    {(t('nav.howItWorks') as string) || 'How It Works'}
                  </a>
                  <a
                    href={createNavLink(locale, 'pricing')}
                    className="block px-4 py-3 text-white hover:text-green-400 hover:bg-green-500/10 rounded-lg transition text-lg font-semibold"
                    onClick={() => setMobileMenu(false)}
                  >
                    {(t('nav.pricing') as string) || 'Pricing'}
                  </a>
                  <a
                    href={createNavLink(locale, 'faq')}
                    className="block px-4 py-3 text-white hover:text-green-400 hover:bg-green-500/10 rounded-lg transition text-lg font-semibold"
                    onClick={() => setMobileMenu(false)}
                  >
                    {(t('nav.faq') as string) || 'FAQ'}
                  </a>
                  <a
                    href={createNavLink(locale, 'contacts')}
                    className="block px-4 py-3 text-white hover:text-green-400 hover:bg-green-500/10 rounded-lg transition text-lg font-semibold"
                    onClick={() => setMobileMenu(false)}
                  >
                    {(t('nav.contacts') as string) || 'Contact'}
                  </a>

                  {/* Mobile CTA Button */}
                  <a
                    href="https://t.me/scam_radar_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mx-4 mt-4 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full text-center shadow-lg hover:from-green-600 hover:to-green-700 transition-all"
                    onClick={() => setMobileMenu(false)}
                  >
                    🚀 Try Bot Now
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>
        <div/>
        {/* Hero Section */}
        <main id="main-content" role="main">
          <HeroSection t={t} />

        {/* How It Works Section */}
        <section id="how" className="relative max-w-6xl mx-auto px-4 py-16 lg:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-12 lg:mb-16 text-center text-green-400 drop-shadow"
          >
            {(t('howItWorks.title') as string) || 'How It Works'}
          </motion.h2>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {Array.isArray(t('howItWorks.steps')) && ((t('howItWorks.steps') as unknown as { title: string; desc: string }[])).map((step, i) => {
              // Define React Icons for each step
              const icons = [
                <FaTelegramPlane key="telegram" className="text-2xl text-green-400" />,
                <FaEye key="eye" className="text-2xl text-blue-400" />,
                <FaRobot key="robot" className="text-2xl text-purple-400" />,
                <FaShieldAlt key="shield" className="text-2xl text-red-400" />,
                <FaCrown key="crown" className="text-2xl text-yellow-400" />,
                <FaBell key="bell" className="text-2xl text-yellow-400" />
              ];

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8, type: 'spring' }}
                  className="glass-card bg-gradient-to-br from-[#0a1a0a]/90 to-[#1a2e1a]/90 rounded-xl p-4 flex flex-col items-start shadow-xl border border-green-400/30 hover:scale-105 hover:shadow-green-400/30 transition-all duration-300"
                >
                  {/* Icon container */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    className="w-12 h-12 bg-black/60 border-2 border-green-400/40 rounded-lg flex items-center justify-center mb-4 shadow-lg hover:border-green-400/70 hover:shadow-green-400/20 transition-all duration-300"
                  >
                    {icons[i]}
                  </motion.div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">
                      {step.title}
                    </h3>
                    <p className="text-sm text-green-100">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="max-w-6xl mx-auto px-4 py-16 lg:py-24" itemScope itemType="https://schema.org/Product">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-8 lg:mb-10 text-center text-green-400 drop-shadow"
            itemProp="name"
          >
            {(t('pricing.title') as string) || ''}
          </motion.h2>
          <meta itemProp="category" content="Security Software" />
          <meta itemProp="brand" content="Scam Radar" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-gray-200 mb-10 lg:mb-12 text-center max-w-2xl mx-auto px-4"
          >
            {(t('pricing.subtitle') as string) || ''}
          </motion.p>

          {/* Pricing Cards */}
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {/* Existing Plans */}
            {Array.isArray(t('pricing.plans')) && ((t('pricing.plans') as unknown) as { name: string; price: string }[]).slice(0, 3).map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 60, scale: 0.8, rotateY: 15 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + i * 0.2,
                  duration: 0.9,
                  type: 'spring',
                  bounce: 0.5,
                  stiffness: 120
                }}
                whileHover={{
                  scale: 1.08,
                  y: -10,
                  rotateY: 5,
                  transition: { duration: 0.3, type: 'spring', stiffness: 300 }
                }}
                className="glass-card bg-gradient-to-br from-[#0a1a0a]/90 to-[#1a2e1a]/90 rounded-2xl p-6 flex flex-col items-center shadow-xl border border-green-400/30 hover:shadow-green-400/40 transition-all duration-300 hover:border-green-400/60 relative overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 text-center w-full">
                  <h3 className="text-xl font-bold mb-4 text-white drop-shadow-lg">{plan.name}</h3>
                  <p className="text-4xl font-extrabold mb-8 text-green-400">{plan.price}</p>

                  <motion.a
                    href="https://t.me/scam_radar_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full inline-block bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold px-6 py-4 rounded-full text-lg shadow-lg transition-all duration-300"
                  >
                    {(t('pricing.cta') as string) || 'Pay'}
                  </motion.a>
                </div>
              </motion.div>
            ))}

            {/* Premium/Lifetime Card from Locales */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.8, rotateY: 15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.9,
                duration: 1.1,
                type: 'spring',
                bounce: 0.6,
                stiffness: 100
              }}
              whileHover={{
                scale: 1.08,
                y: -10,
                rotateY: -5,
                transition: { duration: 0.3, type: 'spring', stiffness: 300 }
              }}
              className="glass-card bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 flex flex-col items-center shadow-2xl border-2 border-yellow-400/60 hover:shadow-yellow-400/50 transition-all duration-300 hover:border-yellow-400/80 relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Popular badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.2, duration: 0.6, type: 'spring' }}
                className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-3 py-1 text-xs rounded-bl-lg"
              >
                POPULAR
              </motion.div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 text-center w-full">
                <h3 className="text-xl font-bold mb-4 text-white drop-shadow-lg">
                  {((t('pricing.plans') as unknown as { name: string; price: string }[])?.[3]?.name) || 'Lifetime Access'}
                </h3>
                <p className="text-4xl font-extrabold mb-8 text-yellow-400">
                  {((t('pricing.plans') as unknown as { name: string; price: string }[])?.[3]?.price) || '$99.99'}
                </p>

                <motion.a
                  href="https://t.me/scam_radar_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full inline-block bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-6 py-4 rounded-full text-lg shadow-lg transition-all duration-300"
                >
                  {(t('pricing.premiumCta') as string) || 'Get Lifetime'}
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Premium Features Box */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.2, type: 'spring' }}
            className="bg-gradient-to-br from-[#0a1a0a]/95 to-[#1a2e1a]/95 md:backdrop-blur-xl rounded-2xl p-8 border border-green-400/30 shadow-xl max-w-3xl mx-auto"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="text-2xl font-bold text-white mb-6 text-center"
            >
              {(t('footer.premiumFeatures') as string) || '✨ Premium Features'}
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(Array.isArray(t('pricing.features')) ? (t('pricing.features') as string[]) : [
                'Unlimited contract checks',
                'Priority support',
                'Early access to new features',
                'Detailed risk analysis',
                'No ads'
              ]).map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -30, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 1.5 + i * 0.15,
                    type: 'spring',
                    bounce: 0.3
                  }}
                  whileHover={{
                    scale: 1.05,
                    x: 10,
                    transition: { duration: 0.2 }
                  }}
                  className="flex items-center gap-3 text-green-100 p-2 rounded-lg hover:bg-green-400/10 transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.7 + i * 0.15, duration: 0.4, type: 'spring' }}
                    className="w-3 h-3 rounded-full bg-green-400 flex-shrink-0"
                  />
                  <span className="text-base font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 2 }}
            className="text-gray-400 text-center text-sm mt-8"
          >
            {(t('pricing.info') as string) || ''}
          </motion.p>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="max-w-6xl mx-auto px-4 py-24" itemScope itemType="https://schema.org/FAQPage">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold mb-10 text-center text-green-400 drop-shadow"
            itemProp="name"
          >
            {(t('faq.title') as string) || 'FAQ'}
          </motion.h2>
          <div className="w-full max-w-3xl mx-auto space-y-8" itemProp="mainEntity">
            {Array.isArray(t('faq.questions')) && ((t('faq.questions') as unknown) as { question: string; answer: string }[]).map((q, i) => (
              <motion.div
                key={q.question}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, type: 'spring' }}
                className="glass-card bg-gradient-to-br from-[#101624]/80 to-[#181f2a]/80 rounded-2xl shadow-xl border border-green-800 overflow-hidden"
                itemScope itemType="https://schema.org/Question"
                itemProp="mainEntity"
              >
                <details className="group" open={i === 0}>
                  <summary className="w-full text-left px-8 py-6 flex justify-between items-center cursor-pointer select-none">
                    <span className="text-xl font-semibold text-green-400 group-hover:text-green-300 transition-colors" itemProp="name">{q.question}</span>
                    <span className="ml-4 text-green-400 text-3xl">&#8250;</span>
                  </summary>
                  <div className="px-8 pb-6 text-gray-200 text-lg whitespace-pre-line" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <div itemProp="text">{q.answer}</div>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </section>

        </main>

        {/* Footer Section */}
        <footer className="w-full bg-gradient-to-br from-black to-gray-900 border-t border-green-600/40 py-16 px-4 mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left side - Get in touch */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                                 <h3 id="contacts" className="text-2xl font-bold text-green-400 mb-8">{(t('contacts.title') as string) || 'Get in Touch'}</h3>

                <div className="space-y-4" itemScope itemType="https://schema.org/ContactPoint">
                  <meta itemProp="contactType" content="Customer Support" />
                  <meta itemProp="areaServed" content="Worldwide" />
                  <meta itemProp="availableLanguage" content="en,ru,uk,id,zh" />
                  {/* Telegram Bot */}
                  <motion.a
                    href="https://t.me/scam_radar_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 text-gray-200 hover:text-green-400 transition-all duration-300 group"
                    itemProp="url"
                  >
                    <FaTelegramPlane className="text-xl text-blue-400 group-hover:text-blue-300" />
                    <span className="text-lg font-medium">Telegram Bot</span>
                  </motion.a>

                  {/* Email */}
                  <motion.a
                    href="mailto:support@scam-radar.net"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 text-gray-200 hover:text-green-400 transition-all duration-300 group"
                    itemProp="email"
                  >
                    <FaEnvelope className="text-xl text-red-400 group-hover:text-red-300" />
                    <span className="text-lg font-medium">support@scam-radar.net</span>
                  </motion.a>

                  {/* Telegram Support */}
                  <motion.a
                    href="https://t.me/bitcoin_inc"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 text-gray-200 hover:text-green-400 transition-all duration-300 group"
                  >
                    <FaTelegramPlane className="text-xl text-cyan-400 group-hover:text-cyan-300" />
                    <span className="text-lg font-medium">Telegram Support</span>
                  </motion.a>

                  {/* Live Now */}
                  <motion.div
                    className="flex items-center gap-4 pt-30 text-green-500"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <FaCircle className="text-lg text-green-500" />
                    </motion.div>
                    <span className="text-lg font-bold text-green-500">Live Now</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right side - Year and Resources */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-green-400 mb-8">{(t('footer.resources') as string) || 'Resources'}</h3>

                <div className="space-y-4">
                  <motion.a
                    href={createNavLink(locale, 'home')}
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="block text-gray-200 hover:text-green-400 transition-all duration-300 text-lg"
                  >
                    {(t('nav.home') as string) || 'Home'}
                  </motion.a>

                  <motion.a
                    href={createNavLink(locale, 'how')}
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="block text-gray-200 hover:text-green-400 transition-all duration-300 text-lg"
                  >
                    {(t('nav.howItWorks') as string) || 'How It Works'}
                  </motion.a>

                  <motion.a
                    href={createNavLink(locale, 'pricing')}
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="block text-gray-200 hover:text-green-400 transition-all duration-300 text-lg"
                  >
                    {(t('nav.pricing') as string) || 'Pricing'}
                  </motion.a>

                  <motion.a
                    href={createNavLink(locale, 'faq')}
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="block text-gray-200 hover:text-green-400 transition-all duration-300 text-lg"
                  >
                    {(t('nav.faq') as string) || 'FAQ'}
                  </motion.a>

                  <motion.a
                    href={createNavLink(locale, 'contacts')}
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="block text-gray-200 hover:text-green-400 transition-all duration-300 text-lg"
                  >
                                         {(t('nav.contacts') as string) || 'Contacts'}
                  </motion.a>
                </div>

                {/* Copyright */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="pt-8 mt-8 border-t border-green-600/30"
                >
                  <p className="text-gray-400 text-base">
                    {(t('footer.copyright') as string) || '© 2025 Scam Radar. All rights reserved.'}
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function HeroSection({ t }: { t: (key: string) => string | string[] | { [key: string]: unknown } | undefined }) {
  // Responsive layout: mobile-first, stacked on mobile, side-by-side on desktop
  return (
    <section id="home" className="relative flex flex-col lg:flex-row items-center justify-center min-h-screen w-full px-4 py-20 lg:py-12 overflow-hidden bg-black pt-24 lg:pt-12"
             itemScope itemType="https://schema.org/SoftwareApplication">
      {/* Animated multi-color gradient background */}
      <motion.div
        className="absolute inset-0 -z-10 animate-gradient-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          background: 'linear-gradient(120deg, #22c55e 0%, #38bdf8 50%, #a78bfa 100%)',
          backgroundSize: '200% 200%',
          filter: 'blur(0px)',
        }}
      />

      {/* Text content - centered on mobile, left on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: 'spring' }}
        className="flex-1 flex flex-col items-center lg:items-start justify-center z-10 w-full lg:max-w-lg text-center lg:text-left lg:pl-8"
      >
        <HeroTextBlock t={t} />
      </motion.div>

      {/* Logo and features - centered on mobile, right on desktop */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 mt-8 lg:mt-0 lg:pl-20 w-full lg:max-w-lg">
        {/* Logo falling like coin FIRST */}
        <LogoWithCoinFlip />

        {/* Three feature cards - responsive grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 mt-8 lg:mt-10 w-full max-w-md lg:max-w-sm"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -50, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.5 + i * 0.15,
                duration: 0.8,
                type: 'spring',
                bounce: 0.4
              }}
              className="glass-card bg-gradient-to-br from-[#0a1a0a]/90 to-[#1a2e1a]/90 rounded-xl p-4 flex flex-col items-center sm:items-start lg:items-start text-center sm:text-left lg:text-left shadow-lg border border-green-400/20 hover:scale-105 hover:shadow-green-400/20 transition-all duration-300"
            >
              <h3 className="text-sm sm:text-base font-bold mb-2 text-white drop-shadow-lg">{(t(`home.feature${i}Title`) as string) || ''}</h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">{(t(`home.feature${i}Desc`) as string) || ''}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HeroTextBlock({ t }: { t: (key: string) => string | string[] | { [key: string]: unknown } | undefined }) {
  // Function to highlight scam and honeypot words in red
  const highlightWords = (text: string) => {
    if (!text) return text;
    return text
      .replace(/scam/gi, '<span style="color: #ef4444;">Scam</span>')
      .replace(/honeypot/gi, '<span style="color: #ef4444;">Honeypot</span>');
  };

  const brandText = (t('home.brand') as string) || 'Scam Radar';
  const titleText = (t('home.title') as string) || '';

  return (
    <>
      <motion.span
        initial={{ color: 'var(--color-green-500)' }}
        animate={{ color: ['var(--color-red-500)', 'var(--color-green-500)'], }}
        transition={{ duration: 3, repeat: 0, repeatType: 'loop', ease: 'linear' }}
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg hover:scale-105 transition-all duration-300"
        style={{ letterSpacing: '-0.01em' }}
        dangerouslySetInnerHTML={{ __html: brandText }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        className="text-xl sm:text-2xl lg:text-4xl font-extrabold mb-6 tracking-tight max-w-xl drop-shadow-xl leading-tight text-white hover:scale-105 transition-all duration-300"
        style={{ letterSpacing: '-0.01em' }}
        itemProp="name"
        dangerouslySetInnerHTML={{ __html: highlightWords(titleText) }}
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
        className="text-sm sm:text-base lg:text-lg font-medium mb-8 text-white max-w-xl rounded-lg px-4 py-3 shadow-lg md:backdrop-blur-lg hover:scale-105 transition-all duration-300"
        itemProp="description"
      >
        {(t('home.subtitle') as string) || ''}
      </motion.p>

      {/* Hidden microdata for schema.org */}
      <meta itemProp="applicationCategory" content="SecurityApplication" />
      <meta itemProp="operatingSystem" content="Web Browser, Telegram" />
      <meta itemProp="softwareVersion" content="2.1.0" />
      <meta itemProp="author" content="Scam Radar Team" />
      <meta itemProp="price" content="0" />
      <meta itemProp="priceCurrency" content="USD" />
      <motion.a
        href='https://t.me/scam_radar_bot'
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatType: 'loop'
        }}
        className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 border-2 border-green-400/80 text-white font-bold px-6 sm:px-8 py-4 rounded-full text-base sm:text-lg shadow-2xl hover:from-green-600 hover:to-green-700 hover:scale-105 active:scale-95 transition focus:outline-none focus:ring-4 focus:ring-green-400/40"
        style={{ boxShadow: '0 0 20px 0 #22c55e88, 0 4px 20px 0 #000a' }}
      >
        <FaTelegramPlane className="text-lg sm:text-xl" />
        <span className="hidden sm:inline">{(t('home.cta') as string) || 'Try the Telegram Bot'}</span>
        <span className="sm:hidden">Try Bot</span>
      </motion.a>
    </>
  );
}

function LogoWithCoinFlip() {
  return (
    <div className="relative">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 z-0 rounded-full blur-xl"
        style={{ background: 'radial-gradient(circle, #22c55e88 0%, #38bdf888 60%, transparent 100%)', width: '100%', height: '100%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ delay: 0.8, duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      />
      {/* Coin flip animation */}
      <motion.div
        initial={{
          y: -200,
          rotateY: 0,
          rotateX: 0,
          scale: 0.5,
          opacity: 0
        }}
        animate={{
          y: 0,
          rotateY: 1440,
          rotateX: 0,
          scale: 1,
          opacity: 1
        }}
        transition={{
          delay: 0.2,
          y: { duration: 1.5, type: 'spring', bounce: 0.6 },
          rotateY: { duration: 1.5, type: 'tween', ease: 'easeOut' },
          rotateX: { duration: 1.5, type: 'spring', bounce: 0.4 },
          scale: { duration: 1.5, type: 'spring', bounce: 0.3 },
          opacity: { duration: 0.8, type: 'tween', ease: 'easeOut' }
        }}
        className="w-24 h-24 md:w-32 md:h-32 bg-black/70 border-4 border-green-400 shadow-lg flex items-center justify-center rounded-full relative z-10"
        style={{
          boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Continuous spin after landing */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{
            delay: 2,
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            type: 'tween'
          }}
          style={{ transformStyle: 'preserve-3d', transformOrigin: 'center' }}
        >
          <Image src={`${getBasePath()}/logo.jpeg`} alt="Scam Radar Logo" width={100} height={100} className="rounded-full border-2 border-white/80 shadow-md" />
        </motion.div>
      </motion.div>
    </div>
  );
}
