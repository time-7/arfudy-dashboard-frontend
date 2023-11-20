import OrdersWaiting from './orders-waiting';

import { Box, Typography } from '@mui/material';

export default function Orders() {
  return (
    <Box
      sx={{
        width: '75vw',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 2,
        maxHeight: '100%',
      }}
    >
      <Typography variant="h5" sx={{ ml: 2, mt: 2 }}>
        Pedidos novos
      </Typography>

      <OrdersWaiting />

      <Typography variant="h5" sx={{ ml: 2, mt: 2 }}>
        Pedidos em preparo
      </Typography>

      <OrdersWaiting />

      <Typography variant="h5" sx={{ ml: 2, mt: 2 }}>
        Pedidos prontos
      </Typography>

      <OrdersWaiting />
    </Box>
  );
}
