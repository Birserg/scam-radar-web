import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const SUPPORTED_LOCALES = ['en', 'uk', 'ru', 'zh', 'id'];
const DEFAULT_LOCALE = 'en';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');
  let locale = DEFAULT_LOCALE;

  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(',')
      .map((lang: string) => lang.split(';')[0].trim().toLowerCase())
      .find((lang: string) => SUPPORTED_LOCALES.includes(lang));
    if (preferred) {
      locale = preferred;
    }
  }

  redirect(`/${locale}`);
  return null;
}
