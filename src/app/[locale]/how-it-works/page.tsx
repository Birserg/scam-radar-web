'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaTelegramPlane, FaClipboardList, FaSearch, FaShieldAlt, FaCrown, FaBell, FaDiscord } from 'react-icons/fa';

const icons = [
  <FaTelegramPlane className="text-green-400 text-3xl mb-2" key="telegram" />,
  <FaClipboardList className="text-green-400 text-3xl mb-2" key="clipboard" />,
  <FaSearch className="text-green-400 text-3xl mb-2" key="search" />,
  <FaShieldAlt className="text-green-400 text-3xl mb-2" key="shield" />,
  <FaCrown className="text-yellow-400 text-3xl mb-2" key="crown" />,
  <FaBell className="text-yellow-400 text-3xl mb-2" key="bell" />,
];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps');

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl font-extrabold mb-10 text-center tracking-tight"
      >
        {t('title')}
      </motion.h1>
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
        {steps.map((step: { title: string; desc: string }, i: number) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.18, duration: 0.7, type: 'spring' }}
            className="bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow-lg border border-gray-800 hover:border-green-500 transition"
          >
            {icons[i]}
            <h2 className="text-xl font-bold mb-2 text-green-400 text-center">{step.title}</h2>
            <p className="text-base text-gray-300 text-center">{step.desc}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <Link
          href="https://t.me/scam_radar_bot"
          target="_blank"
          className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold py-4 px-10 rounded-full text-2xl transition shadow-xl hover:scale-105 active:scale-95"
        >
          {t('cta')}
        </Link>
      </motion.div>
      {/* Optionally add animated background shapes or particles here */}
    </section>
  );
}
