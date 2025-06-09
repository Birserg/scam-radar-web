import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Nav } from '../Nav';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale, namespace: 'meta' });
  const baseUrl = 'https://scam-radar.net';
  const ogImage = `${baseUrl}/og-image.png`;
  const url = `${baseUrl}/${locale}`;

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url,
      siteName: 'Scam Radar',
      images: [{ url: ogImage, width: 1200, height: 630, alt: t('ogTitle') }],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: [ogImage],
      site: '@scam_radarbot',
    },
    metadataBase: new URL(baseUrl),
    themeColor: '#22c55e',
  };
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Nav locale={locale} />
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
