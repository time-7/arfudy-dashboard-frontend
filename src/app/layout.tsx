import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import ReactQueryClientProvider from '@/context/react-query-client-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dashboard ARFudy',
  description: 'Dashboard de controle de pedidos e pratos.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ReactQueryClientProvider>
  );
}
