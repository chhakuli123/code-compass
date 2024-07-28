"use client";
import React from 'react';
import Navbar from '@/layout/navbar/Navbar';
import '@/styles/globals.css';
import { inter } from '@/lib/fonts';


type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="Your Site Description" />
        <meta name="theme-color" content="Your Theme Color" />
        <title>Your Site Name</title>
        {/* <style>{inter.style}</style> */}
        {/* Add other head elements as needed */}
      </head>
      <body className={`min-h-screen bg-primary-950 antialiased ${inter.className}`}>
        <Navbar />
        {children}
    
      </body>
    </html>
  );
}
