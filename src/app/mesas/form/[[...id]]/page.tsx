'use client';

import { useRouter } from 'next/navigation';

import MesasForm from './components/mesas-form';

import {
  TPostReturn,
  TPratosForm,
  TTable,
  TRequest,
  TRequestError,
} from '@/types';
import { Api } from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

export default function MesasFormPage({ params: { id } }: TPratosForm) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const hasId = Array.isArray(id);

  const { data, isFetching } = useQuery<TRequest<TTable>>(
    ['getTable'],
    () => Api.get(`/tables/${id.at(0)}`),
    {
      enabled: hasId,
      cacheTime: 0,
    },
  );

  const { mutate, isLoading } = useMutation<
    TRequest<TPostReturn>,
    AxiosError<TRequestError>,
    TTable
  >(
    ['postTable'],
    (data) =>
      hasId
        ? Api.patch(`/tables/${id.at(0)}`, data)
        : Api.post('/tables', data),
    {
      onSuccess: ({ data: { data } }) => {
        if (!hasId) {
          const { id } = data;

          router.push(`/mesas/form/${id}`);
        }

        enqueueSnackbar('Mesa salva com sucesso!', { variant: 'success' });
      },
      onError: (error) => {
        enqueueSnackbar(
          error?.response?.data.message || 'Falha ao salvar a mesa',
          {
            variant: 'error',
          },
        );
      },
    },
  );

  const onSubmit = (data: TTable) => mutate(data);

  return (
    <MesasForm
      hasId={hasId}
      isSubmitting={isLoading}
      onSubmit={onSubmit}
      defaultValues={data?.data}
      showSkeleton={(hasId && !data) || isFetching}
    />
  );
}
