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
    <header className="relative top-0 left-0 z-50 w-full bg-[#101624] shadow-lg flex items-center justify-center px-0 py-0">
      <div className="w-full max-w-5xl flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-3 group focus:outline-none">
          <Image src="/logo.jpeg" alt="Scam Radar Logo" width={44} height={44} className="rounded-full shadow group-hover:scale-105 group-hover:ring-2 group-hover:ring-green-400 transition-transform duration-200" />
        </Link>
        {/* Nav */}
        <nav className="flex gap-2 sm:gap-4 items-center text-base sm:text-lg font-medium mx-2 text-white">
          <Link href={`/${locale}`} className="px-3 py-1 rounded-full hover:bg-green-500/10 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">{t('nav.home')}</Link>
          <Link href={`/${locale}/how-it-works`} className="px-3 py-1 rounded-full hover:bg-green-500/10 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">{t('nav.howItWorks')}</Link>
          <Link href={`/${locale}/pricing`} className="px-3 py-1 rounded-full hover:bg-green-500/10 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">{t('nav.pricing')}</Link>
          <Link href={`/${locale}/faq`} className="px-3 py-1 rounded-full hover:bg-green-500/10 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">{t('nav.faq')}</Link>
          {/* <Link href={`/${locale}/blog`} className="px-3 py-1 rounded-full hover:bg-green-500/10 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">{t('nav.blog')}</Link> */}
          <Link href={`/${locale}/contact`} className="px-3 py-1 rounded-full hover:bg-green-500/10 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">{t('contact.title')}</Link>
          {/* <Link href={`/${locale}/legal`} className="px-3 py-1 rounded-full hover:bg-green-500/10 hover:text-green-400 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400">{t('nav.legal')}</Link> */}
        </nav>
        {/* Language Switcher */}
        <div className="relative flex items-center ml-2">
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-900/80 shadow hover:bg-green-600 text-white font-bold text-base transition-colors focus:outline-none"
            onClick={() => setOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={open}
            type="button"
          >
            <span className="text-lg">🌐</span>
            {SUPPORTED_LOCALES.find(l => l.code === locale)?.label || locale}
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {open && (
            <div className="absolute right-0 top-full mt-2 bg-gray-950/95 border border-white/10 rounded-2xl shadow-2xl z-[100] min-w-[120px] py-2 px-1 flex flex-col items-stretch">
              {SUPPORTED_LOCALES.filter(l => l.code !== locale).map(l => (
                <Link
                  key={l.code}
                  href={getPathForLocale(l.code)}
                  className="block px-4 py-2 rounded-xl text-white hover:bg-green-600 hover:text-black text-base transition-colors text-center"
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
