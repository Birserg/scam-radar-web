'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Contact() {
  const t = useTranslations('contact');
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl font-extrabold mb-8 text-center tracking-tight"
      >
        {t('title')}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="w-full max-w-xl bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-8 flex flex-col gap-6"
      >
        <div>
          <span className="block text-lg font-semibold text-green-400 mb-1">Telegram Bot</span>
          <Link href="https://t.me/scam_radar_bot" target="_blank" className="text-green-400 underline text-lg">@scam_radar_bot</Link>
        </div>
        <div>
          <span className="block text-lg font-semibold text-green-400 mb-1">Support Email</span>
          <a href="mailto:support@scam-radar.net" className="text-green-400 underline text-lg">support@scam-radar.net</a>
        </div>
        <div>
          <span className="block text-lg font-semibold text-green-400 mb-1">Telegram Support</span>
          <Link href="https://t.me/bitcoin_inc" target="_blank" className="text-green-400 underline text-lg">@scam_radar_support</Link>
        </div>
        <p className="text-gray-400 text-sm mt-4">{t('footer')}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full max-w-xl mt-8 flex flex-col items-center"
      >
        <a
          href="https://t.me/tribute/app?startapp=dg4l"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 underline text-xl font-bold hover:text-green-300 transition text-center"
        >
          {t('support')} via Tribute
        </a>
      </motion.div>
    </section>
  );
}
