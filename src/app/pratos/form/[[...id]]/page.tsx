'use client';

import { useRouter } from 'next/navigation';

import PratosForm from './components/pratos-form';

import {
  TPostReturn,
  TPratosForm,
  TProduct,
  TRequest,
  TRequestError,
} from '@/types';
import { Api } from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { useSnackbar } from 'notistack';

export default function PratosFormPage({ params: { id } }: TPratosForm) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const hasId = Array.isArray(id);

  const { data, isFetching } = useQuery<AxiosResponse<TRequest<TProduct>>>(
    ['getProduct'],
    () => Api.get(`/products/${id.at(0)}`),
    {
      enabled: hasId,
      cacheTime: 0,
    },
  );

  const { mutate, isLoading } = useMutation<
    TRequest<TPostReturn>,
    AxiosError<TRequestError>,
    TProduct
  >(
    ['postProduct'],
    (data) =>
      hasId
        ? Api.patch(`/products/${id.at(0)}`, data)
        : Api.post('/products', data),
    {
      onSuccess: ({ data: { data } }) => {
        debugger;
        if (!hasId) {
          const { id } = data;

          router.push(`/pratos/form/${id}`);
        }

        enqueueSnackbar('Prato salvo com sucesso!', { variant: 'success' });
      },
      onError: (error) => {
        enqueueSnackbar(
          error?.response?.data.message || 'Falha ao salvar o prato',
          { variant: 'error' },
        );
      },
    },
  );

  const onSubmit = (data: TProduct) => mutate(data);

  return (
    <PratosForm
      hasId={hasId}
      isSubmitting={isLoading}
      onSubmit={onSubmit}
      defaultValues={data?.data.data}
      showSkeleton={(hasId && !data) || isFetching}
    />
  );
}
