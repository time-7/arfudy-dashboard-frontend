'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { EdgeStoreProvider } from '@/lib/edgestore';
import { queryClient } from '@/lib/query-client';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <EdgeStoreProvider>
                <DndProvider backend={HTML5Backend}>{children}</DndProvider>
            </EdgeStoreProvider>
        </QueryClientProvider>
    );
}
