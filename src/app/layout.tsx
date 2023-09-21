import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Navbar from '@/components/navbar';

import { Providers } from '@/providers/providers';
import { Box, Paper } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

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
          className={inter.className}
          sx={{
            minWidth: '100%',
            minHeight: '100dvh',
            display: 'flex',
            backgroundColor: '#e6e6e6',
            background: '#e6e6e6',
            gap: 2,
            p: 1,
          }}
        >
          <Navbar />
          <Paper
            component="main"
            sx={{
              flex: 1,
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              p: 8,
            }}
          >
            {children}
          </Paper>
        </Box>
      </Providers>
    </html>
  );
}
