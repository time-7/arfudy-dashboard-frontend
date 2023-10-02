'use client';

import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

const theme = createTheme({
  palette: {
    primary: {
      light: '#ffac1c',
      main: '#c07c04',
      dark: '#704c04',
    },
    secondary: {
      main: '#0854bc',
      dark: '#083474',
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
