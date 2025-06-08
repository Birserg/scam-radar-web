'use client';
import { motion } from 'framer-motion';

export default function HeroAnimated({ brand, title, subtitle, cta, feature1Title, feature1Desc, feature2Title, feature2Desc, feature3Title, feature3Desc, footer }: { brand: string, title: string, subtitle: string, cta: string, feature1Title: string, feature1Desc: string, feature2Title: string, feature2Desc: string, feature3Title: string, feature3Desc: string, footer: string }) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden px-4 py-8">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          <motion.span
            initial={{ color: '#ff0000' }}
            animate={{ color: '#22c55e' }}
            transition={{ duration: 1.2 }}
            className="block"
          >
            {brand}
          </motion.span>
        </h1>
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-3xl font-extrabold mb-6 text-center tracking-tight"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-lg max-w-2xl mx-auto mb-8 text-center text-gray-200"
      >
        {subtitle}
      </motion.p>
      <motion.a
        href="https://t.me/scam_radar_bot"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold px-10 py-4 rounded-full text-2xl transition shadow-lg hover:scale-105 active:scale-95 mb-12"
      >
        {cta}
      </motion.a>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
          className="bg-[#101624] rounded-xl p-8 flex flex-col items-center shadow-lg border-t-4 border-green-400"
        >
          <h2 className="text-2xl font-bold mb-2 text-white text-center">{feature1Title}</h2>
          <p className="text-base text-gray-200 text-center">{feature1Desc}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7, type: 'spring' }}
          className="bg-[#101624] rounded-xl p-8 flex flex-col items-center shadow-lg border-t-4 border-red-500"
        >
          <h2 className="text-2xl font-bold mb-2 text-white text-center">{feature2Title}</h2>
          <p className="text-base text-gray-200 text-center">{feature2Desc}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7, type: 'spring' }}
          className="bg-[#101624] rounded-xl p-8 flex flex-col items-center shadow-lg border-t-4 border-green-400"
        >
          <h2 className="text-2xl font-bold mb-2 text-white text-center">{feature3Title}</h2>
          <p className="text-base text-gray-200 text-center">{feature3Desc}</p>
        </motion.div>
      </div>
      <p className="text-gray-400 text-base text-center max-w-2xl mx-auto mt-4 mb-2">{footer}</p>
    </section>
  );
}
