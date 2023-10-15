'use client';

import { createTheme, ThemeProvider } from '@mui/material';
import { ptBR } from '@mui/x-data-grid';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const theme = createTheme(
  {
    palette: {
      primary: {
        light: '#FFAF1A',
        main: '#BC7A00',
        dark: '#6F4900',
      },
      secondary: {
        main: '#0053BD',
        dark: '#003271',
      },
    },
  },
  ptBR,
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
