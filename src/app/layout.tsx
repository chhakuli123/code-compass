import type { Metadata, Viewport } from 'next';

import '@/styles/globals.css';

import Navbar from '@/layout/navbar/Navbar';

import { siteConfig } from '@/config/site';
import { inter } from '@/lib/fonts';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: siteConfig.icons,
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`min-h-scree bg-primary-950 antialiased ${inter.className}`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
