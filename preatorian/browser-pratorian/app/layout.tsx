import type { Metadata, Viewport } from 'next';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.SITE_ORIGIN ?? 'https://ortzion-praetorian.gabriel-sousa.chatgpt.site',
  ),
  title: {
    default: 'PRAETORIAN | Autonomous Robotics — ORTZION Technology',
    template: '%s — PRAETORIAN',
  },
  description:
    "PRAETORIAN is ORTZION Technology's autonomous robotics platform combining artificial intelligence, perception and high-performance systems engineering.",
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/praetorian-symbol-v2.png', type: 'image/png' }],
    apple: '/praetorian-symbol-v2.png',
  },
  openGraph: {
    title: 'PRAETORIAN | Autonomous Robotics — ORTZION Technology',
    description:
      'AI-powered autonomous systems engineered for complex, high-reliability environments.',
    type: 'website',
    siteName: 'PRAETORIAN',
    images: [
      {
        url: '/og.png',
        width: 1672,
        height: 941,
        alt: 'PRAETORIAN autonomous ground platform and aerial sensor drone concept',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRAETORIAN | Autonomous Robotics',
    description: 'Intelligence. Autonomy. Resilience. An ORTZION Technology platform.',
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#08090B',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
