// src/app/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import HeroAnimated from './HeroAnimated';

export default async function Home({params}: {params: {locale: string}}) {
  const { locale } = await params
  const t = await getTranslations({locale: locale, namespace: 'home'});

  return (
    <HeroAnimated
      brand={t('brand')}
      title={t.rich('title', {
        highlight: (chunks) => <span className="text-red-500 font-extrabold">{chunks}</span>
      })}
      subtitle={t('subtitle')}
      cta={t('cta')}
      feature1Title={t('feature1Title')}
      feature1Desc={t('feature1Desc')}
      feature2Title={t('feature2Title')}
      feature2Desc={t('feature2Desc')}
      feature3Title={t('feature3Title')}
      feature3Desc={t('feature3Desc')}
      footer={t('footer')}
    />
  );
}
