'use client';

import { ReactNode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';

import { SidebarProvider } from '@/components/ui/sidebar';
import { queryClient } from '@/lib/query-client';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SidebarProvider>
                {children} <Toaster />
            </SidebarProvider>
        </QueryClientProvider>
    );
}
