import type {Metadata} from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';
import Particles from '@/components/layout/Particles';
import { Balancer as Provider } from 'react-wrap-balancer';

export const metadata: Metadata = {
  title: 'Digital Blessing Chain',
  description: 'A decentralized chain of blessings, prayers, and positive affirmations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Provider>
          <div className="relative flex min-h-screen flex-col">
            <Particles />
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
