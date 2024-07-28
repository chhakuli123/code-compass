'use client';

import Navbar from '@/layout/navbar/Navbar';

import '@/styles/globals.css';

import { inter } from '@/lib/fonts';

type RootLayoutProps = {
  children: React.ReactNode;
};

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
