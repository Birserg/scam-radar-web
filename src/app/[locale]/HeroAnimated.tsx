'use client';
import { motion } from 'framer-motion';

export default function HeroAnimated({ brand, title, subtitle, cta }: { brand: string, title: string, subtitle: string, cta: string }) {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] bg-black text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          <motion.span
            initial={{ color: '#fff' }}
            animate={{ color: '#22c55e' }}
            transition={{ duration: 1.2 }}
            className="block"
          >
            {brand}
          </motion.span>
          <span className="block text-3xl font-bold mt-2">
            {title}
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg max-w-2xl mx-auto mb-8"
        >
          {subtitle}
        </motion.p>
        <motion.a
          href="https://t.me/ScamRadarBot"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="inline-block bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 rounded-full text-xl transition shadow-lg hover:scale-105 active:scale-95"
        >
          {cta}
        </motion.a>
      </motion.div>
    </section>
  );
}
