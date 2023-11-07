import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <Box
      sx={{
        paddingX: '120px',
        paddingY: '18px',
        width: '100%',
        height: 76,
        backgroundColor: 'secondary.light',
        borderRadius: '0px 0px 36px 36px',
        border: '2px solid #000',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        zIndex: 3,
      }}
    >
      <Link href="/">
        <Image src="/arfudy.png" alt="Logo" height={32} width={96} />
      </Link>

      <Box
        sx={{
          display: 'flex',
          gap: 8,
          '& > a .MuiTypography-root': { color: 'secondary.dark' },
        }}
      >
        <Link href="/">
          <Typography>Dashboard</Typography>
        </Link>

        <Link href="/mesas">
          <Typography>Mesas</Typography>
        </Link>

        <Link href="/pratos">
          <Typography>Pratos</Typography>
        </Link>
      </Box>
    </Box>
  );
}
