import { Box } from '@mui/material';
import Image from 'next/image';

export default function Navbar() {
  return (
    <Box sx={{ height: '72px' }}>
      <Image src="/arfudy.png" alt="Logo" height={32} />
    </Box>
  );
}
