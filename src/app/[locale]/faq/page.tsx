'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const t = useTranslations('faq');
  const questions = t.raw('questions');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl font-extrabold mb-10 text-center tracking-tight"
      >
        {t('title')}
      </motion.h1>
      <div className="w-full max-w-2xl mx-auto space-y-4">
        {questions.map((q: { question: string; answer: string }, i: number) => (
          <motion.div
            key={q.question}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
            className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden"
          >
            <button
              className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center group"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span className="text-lg font-semibold text-green-400 group-hover:text-green-300 transition-colors">{q.question}</span>
              <span className="ml-4 text-green-400 text-2xl transform transition-transform duration-200" style={{ transform: openIndex === i ? 'rotate(90deg)' : 'rotate(0deg)' }}>&#8250;</span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-gray-200 text-base"
                >
                  {q.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
