'use client';

import { Dispatch, SetStateAction } from 'react';
import { useDrop } from 'react-dnd';

import OrderCard from '@/components/cards/order-card';

import { TOrder, TPostReturn, TRequestError } from '@/types';
import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { Api } from '@/lib/axios';
import { AxiosError, AxiosResponse } from 'axios';

type TOrdersList = {
  orderList: TOrder[];
  setOrderList: Dispatch<SetStateAction<TOrder[]>>;
  removeOrder: (order: TOrder) => void;
  type: 'PENDING' | 'IN_PREPARE' | 'DONE';
};

type TPostOrder = {
  idProduto: string;
  idPedido: string;
  status: TOrdersList['type'];
};

export default function OrdersList({
  orderList,
  setOrderList,
  removeOrder,
  type,
}: TOrdersList) {
  const { mutate } = useMutation<
    AxiosResponse<TPostReturn<TOrder>>,
    AxiosError<TRequestError>,
    TPostOrder
  >({
    mutationFn: (data) => Api.post(`/orders/${data.idPedido}`, data),
  });

  const [options, drop] = useDrop(() => ({
    accept: 'TOrder',
    drop: (item: TOrder) => {
      removeOrder(item);
      setOrderList((oldOrderList) => [
        ...oldOrderList,
        { ...item, product: { ...item.product, status: type } },
      ]);
      mutate({
        idProduto: item.product.id,
        idPedido: item.id,
        status: item.product.status,
      });
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
