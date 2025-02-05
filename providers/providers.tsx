'use client';

import { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { queryClient } from '@/lib/query-client';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <EdgeStoreProvider>
            <QueryClientProvider client={queryClient}>
                <SidebarProvider>
                    {children}

                    <Toaster position="bottom-left" theme="light" richColors />
                </SidebarProvider>
            </QueryClientProvider>
        </EdgeStoreProvider>
    );
}
