import MesasGrid from './components/mesas-grid';
import AddButton from '@/components/button/add-button';

import { TGet, TTable } from '@/types';
import { Box, Typography } from '@mui/material';

export default async function Mesas() {
  const data: TGet<TTable[]> = await fetch(
    'https://arfudy-nestjs-backend.onrender.com/api/tables',
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
        <Typography variant="h4">Mesas</Typography>

        <AddButton text="Nova mesa" variant="contained" route="/mesas/form" />
      </Box>

      <MesasGrid data={data} />
    </Box>
  );
}
