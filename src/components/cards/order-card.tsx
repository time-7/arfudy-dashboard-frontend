'use client';

import Image from 'next/image';
import { useDrag } from 'react-dnd';

import { TOrder } from '@/types';
import { Box, Paper, Typography } from '@mui/material';

type TOrderCard = {
  order: TOrder;
};

export default function OrderCard({ order }: TOrderCard) {
  const drag = useDrag(() => ({
    item: order,
    type: 'TOrder',
    collect: (monitor) => ({ isDragging: Boolean(monitor.isDragging) }),
  }))[1];

  return (
    <Paper
      ref={drag}
      elevation={2}
      sx={{
        backgroundColor: 'secondary.main',
        height: 200,
        width: 290,
        boxShadow: '0px 7px 0px 0px #000',
        borderRadius: '30px',
        border: '2px solid #000',
      }}
    >
      <Box
        sx={{
          width: 286,
          height: 100,
          position: 'relative',
        }}
      >
        <Image
          src="https://files.edgestore.dev/k1h85kjlhc106fdq/publicFiles/_public/4c5a4b46-affc-4b28-b5b3-13a3dcc35361.png"
          alt="kk"
          unoptimized
          fill
          style={{
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px',
          }}
        />
      </Box>
      <Box
        sx={{
          borderTop: '2px solid #000',
          display: 'flex',
          height: '100px',
          flexDirection: 'column',
          paddingLeft: 1.5,
          paddingRight: 1.5,
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: '#fff', fontSize: '20px', fontWeight: 600 }}>
          {order.product.name}
        </Typography>
        <Typography sx={{ fontSize: '16px', color: '#fff' }}>
          Mesa 01
        </Typography>
      </Box>
    </Paper>
  );
}
