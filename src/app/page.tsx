'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SUPPORTED_LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'uk', label: 'UA' },
  { code: 'ru', label: 'RU' },
  { code: 'zh', label: '中文' },
  { code: 'id', label: 'ID' }
];

export function Nav({ locale }: { locale: string }) {
  const pathname = usePathname();

  // Remove the current locale from the path and replace it with the new one
  const getPathForLocale = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    return segments.join('/');
  };

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-800 gap-4">
      {/* ...logo and nav links... */}
      <div className="flex items-center gap-2">
        <span className="text-sm">🌐</span>
        <div className="relative group">
          <button className="text-sm font-bold cursor-pointer">
            {SUPPORTED_LOCALES.find(l => l.code === locale)?.label || locale}
          </button>
          <div className="absolute hidden group-hover:block bg-black border border-gray-700 rounded shadow-lg mt-2 z-10">
            {SUPPORTED_LOCALES.filter(l => l.code !== locale).map(l => (
              <Link
                key={l.code}
                href={getPathForLocale(l.code)}
                className="block px-4 py-2 hover:bg-gray-800"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
