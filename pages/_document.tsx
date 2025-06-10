import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//t.me" />

        {/* Preload critical resources */}
        <link rel="preload" href="/logo.webp" as="image" type="image/webp" />

        {/* Critical CSS for hero section - inlined for instant rendering */}
        <style
          id="critical-css"
          dangerouslySetInnerHTML={{
            __html: `
              .critical-content {
                position: relative;
                z-index: 10;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                width: 100%;
              }
              .hero-title {
                font-size: 1.125rem;
                line-height: 1.75rem;
                font-weight: 800;
                margin-bottom: 1.5rem;
                letter-spacing: -0.01em;
                max-width: 36rem;
                text-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                line-height: 1.25;
                color: white;
              }
              .hero-subtitle {
                font-size: 0.875rem;
                line-height: 1.25rem;
                font-weight: 500;
                margin-bottom: 2rem;
                color: white;
                max-width: 36rem;
                border-radius: 0.5rem;
                padding: 0.75rem 1rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
              }
              .cta-button {
                display: inline-flex;
                align-items: center;
                gap: 0.75rem;
                background: linear-gradient(to right, #10b981, #059669);
                border: 2px solid rgba(34, 197, 94, 0.8);
                color: white;
                font-weight: 700;
                padding: 1rem 1.5rem;
                border-radius: 9999px;
                font-size: 1rem;
                line-height: 1.5rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              }
              .text-red-500 {
                color: #ef4444;
              }
              @media (min-width: 640px) {
                .hero-title {
                  font-size: 1.5rem;
                  line-height: 2rem;
                }
                .hero-subtitle {
                  font-size: 1rem;
                  line-height: 1.5rem;
                }
                .cta-button {
                  padding: 1rem 2rem;
                  font-size: 1.125rem;
                  line-height: 1.75rem;
                }
              }
              @media (min-width: 1024px) {
                .hero-title {
                  font-size: 2.25rem;
                  line-height: 2.5rem;
                }
                .hero-subtitle {
                  font-size: 1.125rem;
                  line-height: 1.75rem;
                }
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
