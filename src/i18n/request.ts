import {getRequestConfig} from 'next-intl/server';

const SUPPORTED_LOCALES = ['en', 'uk', 'ru', 'zh', 'id'];
const DEFAULT_LOCALE = 'en';

export default getRequestConfig(async ({locale = DEFAULT_LOCALE}) => {
  const safeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE;
  return {
    locale: safeLocale,
    messages: (await import(`../locales/${safeLocale}.json`)).default
  };
});
