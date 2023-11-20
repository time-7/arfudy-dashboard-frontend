import Orders from './components/orders';
import Tables from './components/tables';

import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Orders />
      <Tables />
    </Box>
  );
}
