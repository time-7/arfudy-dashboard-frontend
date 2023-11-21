'use client';

import { Dispatch, SetStateAction } from 'react';
import { useDrop } from 'react-dnd';

import OrderCard from '@/components/cards/order-card';

import { Api } from '@/lib/axios';
import { TOrder, TPostReturn, TRequestError, TStatusOrder } from '@/types';
import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

type TOrdersList = {
  orderList: TOrder[];
  setOrderList: Dispatch<SetStateAction<TOrder[]>>;
  removeOrder: (order: TOrder) => void;
  type: TStatusOrder;
};

type TPostOrder = {
  productId: string;
  orderId: string;
  status: TStatusOrder;
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
    mutationFn: (data) => Api.post(`/orders/${data.orderId}`, data),
  });

  const drop = useDrop(() => ({
    accept: 'TOrder',
    drop: (item: TOrder) => {
      removeOrder(item);

      setOrderList((oldOrderList) => [
        ...oldOrderList,
        { ...item, product: { ...item.product, status: type } },
      ]);

      mutate({
        productId: item.product.id,
        orderId: item.id,
        status: type,
      });
    },
    collect: (monitor) => ({ isOver: Boolean(monitor.isOver) }),
  }))[1];

  return (
    <Box
      ref={drop}
      sx={{
        backgroundColor: 'secondary.light',
        border: '2px solid black',
        borderRadius: '46px',
        width: '100%',
        display: 'flex',
        overflowX: 'auto',
        gap: 3,
        height: 242,
        marginY: 2,
        padding: 2,
      }}
    >
      {orderList.map((item) => (
        <OrderCard key={item.orderProductId} order={item} />
      ))}
    </Box>
  );
}
