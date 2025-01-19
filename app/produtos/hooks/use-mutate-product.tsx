'use client';

import { useMutation } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { Axios } from '@/lib/axios';
import { TProduct } from '@/utils/validators';

import { useProductContext } from '../contexts/product-context';

/**
 * Remove os dados de informações nutricionais caso existam ingredientes (backend calcula automaticamente)
 */
const formatData = (data: TProduct): TProduct => {
    if (data.ingredients?.length) {
        data.nutritionFacts = undefined;
    }

    return data;
};

export function useMutateProduct() {
    const { setProducts, setProductEdit } = useProductContext();

    return useMutation<any, any, TProduct>({
        mutationFn: (data) => {
            const formattedData = formatData(data);

            return data.id
                ? Axios.patch(`/products/${data.id}`, formattedData)
                : Axios.post('/products', formattedData);
        },
        onSuccess: ({ data }) => {
            setProducts((oldProducts) =>
                oldProducts.map((product) =>
                    product.id === data.data.id ? data.data : product
                )
            );

            setProductEdit(data.data);

            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error?.response?.data.message || 'Falha ao salvar a mesa');
        }
    });
}
