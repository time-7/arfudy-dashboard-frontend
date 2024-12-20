'use client';

import { useQuery } from '@tanstack/react-query';

import { Axios } from '@/lib/axios';

import { TOrder } from '../types';

export function useQueryOrders() {
    return useQuery<TOrder[]>({
        queryKey: ['orders'],
        queryFn: () => Axios.get('/orders').then((res) => res.data.data.flat())
    });
}
