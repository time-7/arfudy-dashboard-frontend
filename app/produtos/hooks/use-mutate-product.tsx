'use client';

import { useMutation } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { Axios } from '@/lib/axios';
import { TProduct } from '@/utils/validators';

export function useMutateProduct({ form }: { form: UseFormReturn<TProduct> }) {
    const formatData = (data: TProduct): TProduct => {
        if (data.ingredients?.length) {
            data.nutritionFacts = undefined;
        }

        return data;
    };

    return useMutation<any, any, TProduct>({
        mutationFn: (data) => {
            const formattedData = formatData(data);

            return data.id
                ? Axios.patch(`/products/${data.id}`, formattedData)
                : Axios.post('/products', formattedData);
        },
        onSuccess: ({ data }) => {
            form.reset(data.data);

            toast(data.message);
        },
        onError: (error) => {
            toast(error?.response?.data.message || 'Falha ao salvar a mesa');
        }
    });
}
