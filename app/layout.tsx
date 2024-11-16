import './globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Header from '@/components/header';
import { cn } from '@/lib/utils';
import { Providers } from '@/providers/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Dashboard Arfudy',
    description: 'Dashboard de controle de pedidos e pratos'
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <Providers>
                <body
                    className={cn(
                        'flex h-dvh min-w-full flex-col bg-background p-6 antialiased',
                        inter.className
                    )}
                >
                    <Header />

                    <main className="flex h-[calc(100%-40px)] flex-1 flex-col">
                        {children}
                    </main>
                </body>
            </Providers>
        </html>
    );
}
