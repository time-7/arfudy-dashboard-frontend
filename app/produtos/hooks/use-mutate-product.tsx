'use client';

import { useMutation } from '@tanstack/react-query';
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
    } else if (data.nutritionFacts) {
        data.nutritionFacts.totalCalories = null;
    }

    return data;
};

export function useMutateProduct() {
    const { setProducts, setProductEdit } = useProductContext();

    /**
     * Altera os dados na lista e atualiza os dados no state de edit.
     */
    const onSuccessEdit = (product: TProduct) => {
        setProducts((oldProducts) =>
            oldProducts.map((oldProduct) =>
                oldProduct.id === product.id ? product : oldProduct
            )
        );

        setProductEdit(product);
    };

    /**
     * Adicionao o novo produto na lista de produtos e salva os dados no state de edit.
     */
    const onSuccessSave = (product: TProduct) => {
        setProducts((oldProducts) => [...oldProducts, product]);

        setProductEdit(product);
    };

    return useMutation<any, any, TProduct>({
        mutationFn: (data) => {
            const formattedData = formatData(data);

            return data.id
                ? Axios.patch(`/products/${data.id}`, formattedData)
                : Axios.post('/products', formattedData);
        },
        onSuccess: ({ data }, formData) => {
            const newData = { ...formData, ...data.data };

            if (formData.id) {
                onSuccessEdit(newData);
            } else {
                onSuccessSave(newData);
            }

            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(
                error?.response?.data.message || 'Falha ao salvar a mesa'
            );
        }
    });
}
