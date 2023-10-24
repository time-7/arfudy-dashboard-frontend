import { Box, Button, Typography } from '@mui/material';
import PratosGrid from './pratos-grid';

export default async function Pratos() {
  const data = await fetch(
    'https://arfudy-nestjs-backend.onrender.com/api/products',
  ).then((res) => res.json());

  console.log(data);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        height: '100%',
        margin: 2,
        padding: 5.5,
        borderRadius: 2,
        backgroundColor: 'secondary.main',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Pratos</Typography>

        <Button variant="contained">+ Novo</Button>
      </Box>

      <PratosGrid data={data} />
    </Box>
  );
}
