import OrderCard from '@/components/cards/order-card';

import { Box } from '@mui/material';

export default function OrdersWaiting() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        overflowX: 'auto',
        gap: 3,
        height: 280,
        marginY: 2,
        scrollbarWidth: 'thin',
        scrollbarColor: 'red',
      }}
    >
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </Box>
  );
}
