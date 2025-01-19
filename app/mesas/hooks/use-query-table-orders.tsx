'use client';

import { useQuery } from '@tanstack/react-query';

import { TOrder } from '@/app/(pedidos)/types';
import { Axios } from '@/lib/axios';

export function useQueryTableOrders({ id }: { id: string }) {
    return useQuery<TOrder[][]>({
        queryKey: ['table-orders', id],
        queryFn: () =>
            Axios.get(`/orders/table/${id}`).then((res) => res.data.data)
    });
}
