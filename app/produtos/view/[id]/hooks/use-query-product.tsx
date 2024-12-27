'use client';

import { useQuery } from '@tanstack/react-query';

import { TProduct } from '@/app/produtos/types';
import { Axios } from '@/lib/axios';

export function useQueryProduct({ id }: { id: string }) {
    return useQuery<TProduct>({
        queryKey: ['products'],
        queryFn: () => Axios.get('/products/' + id).then((res) => res.data.data)
    });
}
