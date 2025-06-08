// src/app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import HeroAnimated from './HeroAnimated';

export default async function Home({params}: {params: {locale: string}}) {
  const t = await getTranslations({locale: params.locale, namespace: 'home'});
  return (
    <HeroAnimated
      brand={t('brand')}
      title={t('title')}
      subtitle={t('subtitle')}
      cta={t('cta')}
    />
  );
}
