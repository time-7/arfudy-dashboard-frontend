'use client';

import { useState } from 'react';

import OrdersList from './orders-list';

import { TOrder } from '@/types';
import { Box, Typography } from '@mui/material';

const orderLista: TOrder[] = [
  {
    id: '1',
    serviceId: '655a9559feda2b022da41498',
    product: {
      id: '1',
      name: 'Macarrao',
      quantity: 1,
      status: 'PENDING',
    },
    clientName: 'Steven Reis',
  },
  {
    id: '2',
    serviceId: '655a9559feda2b022da41498',
    product: {
      id: '2',
      name: 'Macarrao',
      quantity: 1,
      status: 'PENDING',
    },
    clientName: 'Steven Reis',
  },
  {
    id: '3',
    serviceId: '655a9559feda2b022da41498',
    product: {
      id: '3',
      name: 'Macarrao',
      quantity: 1,
      status: 'PENDING',
    },
    clientName: 'Steven Reis',
  },
];

export default function Orders() {
  const [orderPendingList, setOrderPendingList] =
    useState<TOrder[]>(orderLista);
  const [orderInPrepareList, setOrderInPrepareList] = useState<TOrder[]>([]);
  const [orderDoneList, setOrderDoneList] = useState<TOrder[]>([]);

  const removeOrder = (order: TOrder) => {
    const { status } = order.product;

    if (status === 'PENDING') {
      setOrderPendingList((oldOrderPendingList) =>
        oldOrderPendingList.filter(
          (item) =>
            item.id !== order.id && item.product.id !== order.product.id,
        ),
      );
    } else if (status === 'IN_PREPARE') {
      setOrderInPrepareList((oldOrderInPendingList) =>
        oldOrderInPendingList.filter(
          (item) =>
            item.id !== order.id && item.product.id !== order.product.id,
        ),
      );
    } else if (status === 'DONE') {
      setOrderDoneList((oldOrderDoneList) =>
        oldOrderDoneList.filter(
          (item) =>
            item.id !== order.id && item.product.id !== order.product.id,
        ),
      );
    }
  };

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

      <OrdersList
        removeOrder={removeOrder}
        orderList={orderPendingList}
        setOrderList={setOrderPendingList}
        type="PENDING"
      />

      <Typography variant="h5" sx={{ ml: 2, mt: 2 }}>
        Pedidos em preparo
      </Typography>

      <OrdersList
        removeOrder={removeOrder}
        orderList={orderInPrepareList}
        setOrderList={setOrderInPrepareList}
        type="IN_PREPARE"
      />

      <Typography variant="h5" sx={{ ml: 2, mt: 2 }}>
        Pedidos prontos
      </Typography>

      <OrdersList
        removeOrder={removeOrder}
        orderList={orderDoneList}
        setOrderList={setOrderDoneList}
        type="DONE"
      />
    </Box>
  );
}
