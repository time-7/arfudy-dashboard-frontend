'use client';

import { useQuery } from '@tanstack/react-query';

import { Axios } from '@/lib/axios';

import { TProduct } from '../types';

export function useQueryProducts() {
    return useQuery<TProduct[]>({
        queryKey: ['products'],
        queryFn: () => Axios.get('/products').then((res) => res.data.data)
    });
}
