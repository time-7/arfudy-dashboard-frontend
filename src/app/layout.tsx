import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Providers } from '@/providers/providers';
import { Box } from '@mui/material';

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
            maxHeight: '100dvh',
            minHeight: '100dvh',
            display: 'flex',
            backgroundColor: 'secondary.dark',
          }}
        >
          <Box
            component="main"
            sx={{
              flex: 1,
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
