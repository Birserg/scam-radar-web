import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scam Radar',
  description: 'Detect crypto scams and honeypots instantly.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
