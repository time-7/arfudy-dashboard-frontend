import './globals.css';
import type { Metadata } from 'next';

import Navbar from '@/components/navbar';

import { Providers } from '@/providers/providers';
import { Box } from '@mui/material';

export const metadata: Metadata = {
  title: 'Dashboard ARFudy',
  description: 'Dashboard de controle de pedidos e pratos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <Box
          component="body"
          sx={{
            minWidth: '100%',
            minHeight: '100dvh',
            display: 'flex',
            backgroundColor: 'secondary.dark',
          }}
        >
          <Navbar />

          <Box
            component="main"
            sx={{
              flex: 1,
              marginTop: '76px',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '100%',
            }}
          >
            {children}
          </Box>
        </Box>
      </Providers>
    </html>
  );
}
