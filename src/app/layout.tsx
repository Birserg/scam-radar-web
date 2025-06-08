import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scam Radar',
  description: 'Detect crypto scams and honeypots instantly.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
