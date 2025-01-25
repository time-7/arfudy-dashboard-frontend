'use client';

import { useQuery } from '@tanstack/react-query';

import { Axios } from '@/lib/axios';
import { TTable } from '@/utils/validators';

export function useQueryTables() {
    return useQuery<TTable[]>({
        queryKey: ['tables'],
        queryFn: () => Axios.get('/tables').then((res) => res.data.data)
    });
}
