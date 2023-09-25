'use client';

import { useRouter } from 'next/navigation';

import PratosForm from './components/pratos-form';

import { TPostReturn, TPratosForm, TProduct, TRequest } from '@/types';
import { Api } from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export default function PratosFormPage({ params: { id } }: TPratosForm) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isFetching } = useQuery(
    ['getProduct'],
    (): Promise<TRequest<TProduct>> => Api.get(`/products/${id.at(0)}`),
    {
      enabled: Array.isArray(id),
    },
  );

  const { mutate } = useMutation(['postProduct'], (data: TProduct) =>
    Api.post('/products', data),
  );

  const onSubmit = (data: TProduct) => {
    console.log(data);

    mutate(data, {
      onSuccess: ({ data: { data } }: TRequest<TPostReturn>) => {
        const { id } = data;

        router.push(`/pratos/form/${id}`);
        enqueueSnackbar('Request deu SUCESSO!!!!!!!', { variant: 'success' });
      },
      onError: () =>
        enqueueSnackbar('Request deu ERRO!!!!!!!', { variant: 'error' }),
    });
  };

  return (
    <PratosForm
      onSubmit={onSubmit}
      defaultValues={data?.data}
      showSkeleton={!data || isFetching}
    />
  );
}
