'use client';

import { useEffect, useState } from 'react';

import OrdersList from './orders-list';

import { Api } from '@/lib/axios';
import { socket } from '@/lib/socket';
import { TGet, TOrder } from '@/types';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export default function Orders() {
  const [orderPendingList, setOrderPendingList] = useState<TOrder[]>([]);
  const [orderInPrepareList, setOrderInPrepareList] = useState<TOrder[]>([]);
  const [orderDoneList, setOrderDoneList] = useState<TOrder[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const addOrder = (orderList: TOrder[][]) => {
    orderList.flat().forEach((order) => {
      const { status } = order.product;

      order.orderProductId = `${order.id}${order.product.id}`;

      if (status === 'PENDING') {
        setOrderPendingList((oldOrderPendingList) => [
          ...oldOrderPendingList,
          order,
        ]);
      } else if (status === 'IN_PREPARE') {
        setOrderInPrepareList((oldOrderInPendingList) => [
          ...oldOrderInPendingList,
          order,
        ]);
      } else if (status === 'DONE') {
        setOrderDoneList((oldOrderDoneList) => [...oldOrderDoneList, order]);
      }
    });
  };

  const removeOrder = (order: TOrder) => {
    const { status } = order.product;

    if (status === 'PENDING') {
      setOrderPendingList((oldOrderPendingList) =>
        oldOrderPendingList.filter(
          (item) => item.orderProductId !== order.orderProductId,
        ),
      );
    } else if (status === 'IN_PREPARE') {
      setOrderInPrepareList((oldOrderInPendingList) =>
        oldOrderInPendingList.filter(
          (item) => item.orderProductId !== order.orderProductId,
        ),
      );
    } else if (status === 'DONE') {
      setOrderDoneList((oldOrderDoneList) =>
        oldOrderDoneList.filter(
          (item) => item.orderProductId !== order.orderProductId,
        ),
      );
    }
  };

  useEffect(() => {
    const onOrder = (value: TGet<TOrder[][]>) => {
      console.log(value);
      addOrder(value.data);
      enqueueSnackbar('Novos pedidos chegaram', { variant: 'success' });
    };

    socket.on('onOrder', onOrder);

    return () => {
      socket.off('onOrder', onOrder);
    };
  }, []);

  const { data } = useQuery<TGet<TOrder[][]>>({
    queryKey: ['getOrderList'],
    queryFn: () => Api.get('/orders').then((res) => res.data),
  });

  useEffect(() => {
    if (data?.data) {
      addOrder(data.data);
    }
  }, [data]);

  return (
    <Box
      sx={{
        width: 'calc(100vw - 368px)',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 4,
        paddingBottom: 2,
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
