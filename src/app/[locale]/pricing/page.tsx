'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Pricing() {
  const t = useTranslations('pricing');
  const plans = t.raw('plans');
  const features = t.raw('features');

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-hidden px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl font-extrabold mb-4 text-center tracking-tight"
      >
        {t('title')}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-lg max-w-2xl mx-auto mb-10 text-center text-gray-300"
      >
        {t('subtitle')}
      </motion.p>
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {plans.map((plan: { name: string; price: string }, i: number) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.7, type: 'spring' }}
            className={`bg-gray-900 rounded-xl p-6 flex flex-col items-center shadow-lg border-t-4 ${i === 3 ? 'border-yellow-500' : 'border-green-500'} hover:scale-105 transition-transform`}
          >
            <h2 className="text-2xl font-bold mb-2 text-green-400 text-center">{plan.name}</h2>
            <div className="text-3xl font-extrabold mb-4 text-white">{plan.price}</div>
            <button className={`w-full mt-auto bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-6 rounded-full text-lg transition shadow-lg ${i === 3 ? 'bg-yellow-400 hover:bg-yellow-500' : ''}`}>{t('cta')}</button>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="w-full max-w-2xl mx-auto mb-8"
      >
        <ul className="list-disc list-inside mb-8 text-lg text-gray-200">
          {features.map((feature: string) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <p className="text-gray-400 text-sm text-center">{t('info')}</p>
      </motion.div>
    </section>
  );
}
