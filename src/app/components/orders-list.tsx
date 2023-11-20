'use client';

import { Dispatch, SetStateAction } from 'react';
import { useDrop } from 'react-dnd';

import OrderCard from '@/components/cards/order-card';

import { TOrder } from '@/types';
import { Box } from '@mui/material';

type TOrdersList = {
  orderList: TOrder[];
  setOrderList: Dispatch<SetStateAction<TOrder[]>>;
  removeOrder: (order: TOrder) => void;
  type: 'PENDING' | 'IN_PREPARE' | 'DONE';
};

export default function OrdersList({
  orderList,
  setOrderList,
  removeOrder,
  type,
}: TOrdersList) {
  const [options, drop] = useDrop(() => ({
    accept: 'TOrder',
    drop: (item: TOrder) => {
      removeOrder(item);
      setOrderList((oldOrderList) => [
        ...oldOrderList,
        { ...item, product: { ...item.product, status: type } },
      ]);
    },
    collect: (monitor) => ({ isOver: Boolean(monitor.isOver) }),
  }));

  console.log(options);

  return (
    <Box
      ref={drop}
      sx={{
        width: '100%',
        display: 'flex',
        overflowX: 'auto',
        gap: 3,
        height: 280,
        marginY: 2,
      }}
    >
      {orderList.map((item) => (
        <OrderCard key={item.id} order={item} />
      ))}
    </Box>
  );
}
