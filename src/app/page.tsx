import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100%', border: '4px solid black' }}>
      <Box sx={{ flex: 3, padding: 7.5 }}>pedidos</Box>

      <Box
        sx={{
          flex: 1,
          backgroundColor: 'secondary.main',
          borderLeft: '4px solid black',
          display: 'flex',
          flexDirection: 'column',
          padding: 4,
        }}
      >
        menu
      </Box>
    </Box>
  );
}
