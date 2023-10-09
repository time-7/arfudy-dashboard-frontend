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
  const hasId = Array.isArray(id);

  const { data, isFetching } = useQuery(
    ['getProduct'],
    (): Promise<TRequest<TProduct>> => Api.get(`/products/${id.at(0)}`),
    {
      enabled: hasId,
      cacheTime: 0,
    },
  );

  const { mutate, isLoading } = useMutation(
    ['postProduct'],
    (data: TProduct) =>
      hasId
        ? Api.patch(`/products/${id.at(0)}`, data)
        : Api.post('/products', data),
  );

  const onSubmit = (data: TProduct) =>
    mutate(data, {
      onSuccess: ({ data: { data } }: TRequest<TPostReturn>) => {
        if (!hasId) {
          const { id } = data;

          router.push(`/pratos/form/${id}`);
        }

        enqueueSnackbar('Prato salvo com sucesso!', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('Falha ao salvar o prato', { variant: 'error' });
      },
    });

  return (
    <PratosForm
      hasId={hasId}
      isSubmitting={isLoading}
      onSubmit={onSubmit}
      defaultValues={data?.data}
      showSkeleton={(hasId && !data) || isFetching}
    />
  );
}
