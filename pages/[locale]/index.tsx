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
  const path = `${basePath}/${locale}/`;
  return anchor ? `${path}#${anchor}` : path;
};

// Helper function for canonical URL
const getCanonicalUrl = (locale: string) => {
  const basePath = getBasePath();

  // For GitHub Pages deployment
  if (basePath) {
    return `https://birserg.github.io${basePath}/${locale}/`;
  }

  // For local development or custom domain
  return `https://scam-radar.net/${locale}/`;
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
  const handleLocaleChange = (code: string) => {
    setLocaleMenu(false);
    window.location.href = createNavLink(code);
  };

  return (
    <>
      <Head>
        <title>{(t('meta.title') as string) || ''}</title>
        <meta name="description" content={(t('meta.description') as string) || ''} />
        <meta property="og:title" content={(t('meta.ogTitle') as string) || ''} />
        <meta property="og:description" content={(t('meta.ogDescription') as string) || ''} />
        <meta property="og:image" content="/og-image.jpeg" />
        <meta name="twitter:title" content={(t('meta.twitterTitle') as string) || ''} />
        <meta name="twitter:description" content={(t('meta.twitterDescription') as string) || ''} />
        <meta name="twitter:image" content="/og-image.jpeg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Language" content={locale} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={getCanonicalUrl(locale)} />
      </Head>
      <div className="bg-black min-h-screen w-full relative overflow-x-hidden">
        {/* Locale Switcher */}
        <div className="fixed top-12 right-6 z-[120]">
          <button
            onClick={() => setLocaleMenu((v) => !v)}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-green-500 text-white shadow-2xl border-2 border-white/30 backdrop-blur-lg font-bold text-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 transition-all"
            aria-haspopup="listbox"
            aria-expanded={localeMenu}
            type="button"
          >
            <GlobeAltIcon className="w-6 h-6 text-white drop-shadow" title="Globe" />
            {SUPPORTED_LOCALES.find((l) => l.code === locale)?.label || locale}
          </button>
          {localeMenu && (
            <div className="absolute right-0 mt-2 bg-black/90 border border-white/10 rounded-2xl shadow-2xl z-[100] min-w-[120px] py-2 px-1 flex flex-col items-stretch backdrop-blur-xl">
              {SUPPORTED_LOCALES.filter((l) => l.code !== locale).map((l) => (
                <button
                  key={l.code}
                  className="block px-4 py-2 rounded-xl text-white hover:bg-green-600 hover:text-black text-base transition-colors text-center"
                  onClick={() => handleLocaleChange(l.code)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 shadow-xl py-4 px-4 flex justify-center border-b border-green-600/40 backdrop-blur-2xl">
          <div className="max-w-6xl w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src={`${getBasePath()}/logo.jpeg`} alt="Scam Radar Logo" width={44} height={44} className="rounded-full shadow-lg border-2 border-green-500/60" />
              <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">{(t('home.brand') as string) || 'Scam Radar'}</span>
            </div>
            <div className="flex gap-6 text-lg font-semibold">
              <a href={createNavLink(locale, 'home')} className="text-white hover:text-green-400 transition">{(t('nav.home') as string) || 'Home'}</a>
              <a href={createNavLink(locale, 'how')} className="text-white hover:text-green-400 transition">{(t('nav.howItWorks') as string) || 'How It Works'}</a>
              <a href={createNavLink(locale, 'pricing')} className="text-white hover:text-green-400 transition">{(t('nav.pricing') as string) || 'Pricing'}</a>
              <a href={createNavLink(locale, 'faq')} className="text-white hover:text-green-400 transition">{(t('nav.faq') as string) || 'FAQ'}</a>
              <a href={createNavLink(locale, 'contacts')} className="text-white hover:text-green-400 transition">{(t('nav.contacts') as string) || 'Contact'}</a>
            </div>
          </div>
        </nav>
        <div/>
        {/* Hero Section */}
        <HeroSection t={t} />

        {/* How It Works Section */}
        <section id="how" className="relative max-w-6xl mx-auto px-4 py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold mb-16 text-center text-green-400 drop-shadow"
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
        <section id="pricing" className="max-w-6xl mx-auto px-4 py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold mb-10 text-center text-green-400 drop-shadow"
          >
            {(t('pricing.title') as string) || ''}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-gray-200 mb-12 text-center max-w-2xl mx-auto"
          >
            {(t('pricing.subtitle') as string) || ''}
          </motion.p>

          {/* Pricing Cards */}
          <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
            transition={{ duration: 1, delay: 1.2, type: 'spring', bounce: 0.4 }}
            className="bg-gradient-to-br from-[#0a1a0a]/90 to-[#1a2e1a]/90 backdrop-blur-xl rounded-2xl p-8 border border-green-400/30 shadow-xl max-w-3xl mx-auto"
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
        <section id="faq" className="max-w-6xl mx-auto px-4 py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-extrabold mb-10 text-center text-green-400 drop-shadow"
          >
            {(t('faq.title') as string) || 'FAQ'}
          </motion.h2>
          <div className="w-full max-w-3xl mx-auto space-y-8">
            {Array.isArray(t('faq.questions')) && ((t('faq.questions') as unknown) as { question: string; answer: string }[]).map((q, i) => (
              <motion.div
                key={q.question}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, type: 'spring' }}
                className="glass-card bg-gradient-to-br from-[#101624]/80 to-[#181f2a]/80 rounded-2xl shadow-xl border border-green-800 overflow-hidden"
              >
                <details className="group" open={i === 0}>
                  <summary className="w-full text-left px-8 py-6 flex justify-between items-center cursor-pointer select-none">
                    <span className="text-xl font-semibold text-green-400 group-hover:text-green-300 transition-colors">{q.question}</span>
                    <span className="ml-4 text-green-400 text-3xl">&#8250;</span>
                  </summary>
                  <div className="px-8 pb-6 text-gray-200 text-lg whitespace-pre-line">{q.answer}</div>
                </details>
              </motion.div>
            ))}
          </div>
        </section>

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

                <div className="space-y-4">
                  {/* Telegram Bot */}
                  <motion.a
                    href="https://t.me/scam_radar_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 text-gray-200 hover:text-green-400 transition-all duration-300 group"
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
                  >
                    <FaEnvelope className="text-xl text-red-400 group-hover:text-red-300" />
                    <span className="text-lg font-medium">support@scam-radar.net</span>
                  </motion.a>

                  {/* Telegram Support */}
                  <motion.a
                    href="https://t.me/scam_radar_support"
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
  // Two-column layout: text left, logo+features right - with falling animations
  return (
    <section id="home" className="relative flex flex-col md:flex-row items-center justify-center h-screen w-full px-4 py-12 overflow-hidden bg-black">
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

      {/* Text left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, type: 'spring' }}
        className="flex-1 flex flex-col items-start justify-center z-10 max-w-lg md:pl-8 pl-4"
      >
        <HeroTextBlock t={t} />
      </motion.div>

      {/* Logo and features right */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 mt-4 md:mt-0 md:pl-40 max-w-lg">
        {/* Logo falling like coin FIRST */}
        <LogoWithCoinFlip />

        {/* Three feature cards falling AFTER logo */}
        <motion.div
          className="grid grid-cols-1 gap-5 mt-10 w-full max-w-sm"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -100, rotateX: -45 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.5 + i * 0.2,
                duration: 0.8,
                type: 'spring',
                bounce: 0.4
              }}
              className="glass-card bg-gradient-to-br from-[#0a1a0a]/90 to-[#1a2e1a]/90 rounded-xl p-3 flex flex-col items-start shadow-lg border border-green-400/20 hover:scale-105 hover:shadow-green-400/20 transition-all duration-300"
            >
              <h3 className="text-base font-bold mb-1 text-white text-left drop-shadow-lg">{(t(`home.feature${i}Title`) as string) || ''}</h3>
              <p className="text-xm text-gray-200 text-left">{(t(`home.feature${i}Desc`) as string) || ''}</p>
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
        className="text-6xl md:text-6xl font-extrabold mb-3 drop-shadow-lg text-left hover:scale-105 transition-all duration-300"
        style={{ letterSpacing: '-0.01em' }}
        dangerouslySetInnerHTML={{ __html: brandText }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
        className="text-2xl md:text-4xl font-extrabold mb-4 text-left tracking-tight max-w-xl drop-shadow-xl leading-tight text-white hover:scale-105 transition-all duration-300"
        style={{ letterSpacing: '-0.01em' }}
        dangerouslySetInnerHTML={{ __html: highlightWords(titleText) }}
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
        className="text-base md:text-lg font-medium mb-4 text-white max-w-xl text-left rounded-lg px-4 py-3 shadow-lg backdrop-blur-lg hover:scale-105 transition-all duration-300"
      >
        {(t('home.subtitle') as string) || ''}
      </motion.p>
      <motion.a
      href='https://t.me/scam_radar_bot'
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 1 }} // Initial size of the element
      animate={{ scale: 1.2, opacity: 0.8 }} // Target size and opacity
      transition={{
        duration: 3, // Animation duration
        repeat: Infinity, // Loop indefinitely
        ease: 'easeInOut', // Choose an easing function
        repeatType: 'loop' // Ensure it loops back to the starting point
      }}
      className="inline-flex items-center gap-2 bg-green-500 border-2 border-green-400/80 text-white font-bold px-8 py-4 rounded-full text-lg shadow-2xl hover:bg-green-600 hover:text-white hover:scale-105 active:scale-95 transition focus:outline-none focus:ring-4 focus:ring-green-400/40 ml-20 mt-10"
      style={{ boxShadow: '0 0 20px 0 #22c55e88, 0 4px 20px 0 #000a' }}
      >
        <FaTelegramPlane className="text-xl" />
        {(t('home.cta') as string) || 'Try the Telegram Bot'}
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
