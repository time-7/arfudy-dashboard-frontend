'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { Axios } from '@/lib/axios';

import { TOrder, TOrderStatus } from '../types';

export function useMutateOrder() {
    return useMutation<
        AxiosResponse<{ data: TOrder; message: string }>,
        AxiosError<{ message: string; status: string }>,
        { productId: string; orderId: string; status: TOrderStatus }
    >({
        mutationFn: (data) => Axios.post(`/orders/${data.orderId}`, data)
    });
}
