'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';

import { Api } from '@/lib/axios';
import {
    TGet,
    TPostReturn,
    TPratosForm,
    TProduct,
    TRequestError
} from '@/types';

import PratosForm from './components/pratos-form';

export default function PratosFormPage({ params }: TPratosForm) {
    const { id } = use(params);
    const hasId = Boolean(id && id[0]);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState<TProduct | null>(null);

    const formatData = (data: TProduct): TProduct => {
        if (data.ingredients?.length) {
            data.nutritionFacts = undefined;
        }

        return data;
    };

    const { data, isFetching } = useQuery<TGet<TProduct>>({
        queryKey: ['getProduct'],
        queryFn: () => Api.get(`/products/${id[0]}`).then((res) => res.data),
        enabled: hasId,
        gcTime: 0
    });

    const { mutate, isPending } = useMutation<
        AxiosResponse<TPostReturn<TProduct>>,
        AxiosError<TRequestError>,
        TProduct
    >({
        mutationFn: (data) => {
            const formattedData = formatData(data);

            return hasId
                ? Api.patch(`/products/${id.at(0)}`, formattedData)
                : Api.post('/products', formattedData);
        },
        onSuccess: ({ data: responseData }) => {
            const { data, message } = responseData;

            if (!hasId) {
                const { id } = data;

                router.push(`/pratos/form/${id}`);
            } else {
                setFormData(data);
            }

            enqueueSnackbar(message, { variant: 'success' });
        },
        onError: (error) => {
            enqueueSnackbar(
                error?.response?.data.message || 'Falha ao salvar a mesa',
                {
                    variant: 'error'
                }
            );
        }
    });

    return (
        <PratosForm
            id={id && id[0]}
            data={formData || data?.data}
            isFetching={isFetching}
            isPending={isPending}
            onSubmit={(data) => mutate(data)}
        />
    );
}
