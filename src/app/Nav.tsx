'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

export function Nav({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();

  const SUPPORTED_LOCALES = [
    { code: 'en', label: 'EN' },
    { code: 'uk', label: 'UA' },
    { code: 'ru', label: 'RU' },
    { code: 'zh', label: '中文' },
    { code: 'id', label: 'ID' }
  ];

  const getPathForLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    if (SUPPORTED_LOCALES.some(l => l.code === segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/');
    return newPath === '' ? '/' : newPath;
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-800 gap-4">
      <div className="flex items-center gap-3">
        <Image src="/logo.jpeg" alt="Scam Radar Logo" width={48} height={48} />
        <span className="text-xl font-bold tracking-wide">Scam Radar</span>
      </div>
      <nav className="flex flex-wrap gap-4 mt-2 sm:mt-0">
        <Link href={`/${locale}`} className="hover:text-green-400">{t('nav.home')}</Link>
        <Link href={`/${locale}/how-it-works`} className="hover:text-green-400">{t('nav.howItWorks')}</Link>
        <Link href={`/${locale}/pricing`} className="hover:text-green-400">{t('nav.pricing')}</Link>
        <Link href={`/${locale}/faq`} className="hover:text-green-400">{t('nav.faq')}</Link>
        <Link href={`/${locale}/blog`} className="hover:text-green-400">{t('nav.blog')}</Link>
        <Link href={`/${locale}/contact`} className="hover:text-green-400">{t('nav.contact')}</Link>
        <Link href={`/${locale}/legal`} className="hover:text-green-400">{t('nav.legal')}</Link>
      </nav>
      <div className="flex items-center gap-2 relative">
        <span className="text-sm">🌐</span>
        <div className="relative">
          <button
            className="text-sm font-bold cursor-pointer px-2 py-1 rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
            onClick={() => setOpen((v) => !v)}
            onBlur={() => setTimeout(() => setOpen(false), 100)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            {SUPPORTED_LOCALES.find(l => l.code === locale)?.label || locale}
          </button>
          {open && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-900 border border-gray-700 rounded shadow-xl z-50 min-w-[90px] py-2 px-1 flex flex-col items-stretch">
              {SUPPORTED_LOCALES.filter(l => l.code !== locale).map(l => (
                <Link
                  key={l.code}
                  href={getPathForLocale(l.code)}
                  className="block px-4 py-2 rounded text-white hover:bg-green-600 hover:text-black text-sm transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
