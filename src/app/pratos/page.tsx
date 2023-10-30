import PratosGrid from './components/pratos-grid';
import AddButton from '@/components/button/add-button';

import { TProduct, TGet } from '@/types';
import { Box, Typography } from '@mui/material';

export default async function Pratos() {
  const data: TGet<TProduct[]> = await fetch(
    'https://arfudy-nestjs-backend.onrender.com/api/products',
  ).then((res) => res.json());

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

        <AddButton text="Novo prato" variant="contained" route="/pratos/form" />
      </Box>

      <PratosGrid data={data} />
    </Box>
  );
}
