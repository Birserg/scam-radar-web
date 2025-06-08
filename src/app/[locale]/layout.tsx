import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Nav } from '../Nav';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages({ locale: params.locale });
  return (
    <NextIntlClientProvider locale={params.locale} messages={messages}>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Nav locale={params.locale} />
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
