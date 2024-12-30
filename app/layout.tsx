import './globals.css';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppSidebar } from '@/components/app-sidebar';
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
            <body className="bg-background antialiased">
                <Providers>
                    <AppSidebar />

                    <main
                        className={cn(
                            inter.className,
                            'flex h-dvh w-full flex-col p-4'
                        )}
                    >
                        {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}
