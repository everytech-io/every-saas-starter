import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/layout.css';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';
import { brand } from '@/config/brand';
import { FirebaseProvider } from '@/components/providers/firebase-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: brand.name,
  description: brand.metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={'min-h-full'} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FirebaseProvider>{children}</FirebaseProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
