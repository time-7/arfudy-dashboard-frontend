import { Box, Paper, Typography } from '@mui/material';
import Image from 'next/image';

export default function OrderCard() {
  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: 'secondary.main',
        height: 250,
        width: 290,
        boxShadow: '0px 7px 0px 0px #000',
        borderRadius: '30px',
        border: '2px solid #000',
      }}
    >
      <Image
        src="https://files.edgestore.dev/k1h85kjlhc106fdq/publicFiles/_public/4c5a4b46-affc-4b28-b5b3-13a3dcc35361.png"
        alt="kk"
        unoptimized
        width={290}
        height={150}
      />
      <Box
        sx={{
          borderTop: '2px solid #000',
          display: 'flex',
          height: '100px',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: '#fff', fontSize: '26px', fontWeight: 600 }}
        >
          Pizza de Calabresa
        </Typography>
        <Typography sx={{ fontSize: '20px', color: '#fff' }}>
          Mesa 01
        </Typography>
      </Box>
    </Paper>
  );
}
