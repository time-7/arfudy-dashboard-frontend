'use client';

import { EdgeStoreProvider } from '@/lib/edgestore';
import { montserrat, theme } from '@/lib/mui-theme';
import { queryClient } from '@/lib/query-client';
import { ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider className={montserrat.className}>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
