'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Axios } from '@/lib/axios';
import { TProduct } from '@/utils/validators';

import { useProductContext } from '../contexts/product-context';

export function useDeleteProduct() {
    const { setProducts, setProductEdit, setProductView, productEdit, productView } =
        useProductContext();

    /**
     * Remove o produto da lista e fecha a tela de edit ou view.
     */
    const onSuccessDelete = (Product: TProduct) => {
        setProducts((oldProducts) =>
            oldProducts.filter((oldProduct) => Product.id !== oldProduct.id)
        );

        if (productEdit?.id === Product.id) {
            setProductEdit(null);
        } else if (productView?.id === Product.id) {
            setProductView(null);
        }
    };

    return useMutation<any, any, TProduct>({
        mutationFn: (data) => Axios.delete(`/products/${data.id}`),
        onSuccess: ({ data }, formData) => {
            onSuccessDelete(formData);

            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(
                error?.response?.data.message || 'Falha ao salvar a mesa'
            );
        }
    });
}
