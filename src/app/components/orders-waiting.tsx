'use client';

import { useState } from 'react';
import { useDrop } from 'react-dnd';

import OrderCard from '@/components/cards/order-card';

import { TOrder } from '@/types';
import { Box } from '@mui/material';

const orderLista: TOrder[] = [
  {
    id: '1',
    serviceId: '655a9559feda2b022da41498',
    product: {
      id: '652d6068096f8775151cc4b7',
      name: 'Macarrao',
      quantity: 1,
      status: 'DONE',
    },
    clientName: 'Steven Reis',
  },
  {
    id: '2',
    serviceId: '655a9559feda2b022da41498',
    product: {
      id: '652d6068096f8775151cc4b7',
      name: 'Macarrao',
      quantity: 1,
      status: 'DONE',
    },
    clientName: 'Steven Reis',
  },
  {
    id: '3',
    serviceId: '655a9559feda2b022da41498',
    product: {
      id: '652d6068096f8775151cc4b7',
      name: 'Macarrao',
      quantity: 1,
      status: 'DONE',
    },
    clientName: 'Steven Reis',
  },
];
export default function OrdersWaiting() {
  const [orderList, setOrderList] = useState<TOrder[]>(orderLista);

  const [options, drop] = useDrop(() => ({
    accept: 'TOrder',
    drop: (item: TOrder) =>
      setOrderList((oldOrderList) => [...oldOrderList, item]),
    collect: (monitor) => ({ isOver: Boolean(monitor.isOver) }),
  }));

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
