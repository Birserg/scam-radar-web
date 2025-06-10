import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"
import '../pages/global.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
    </>
  )
}
