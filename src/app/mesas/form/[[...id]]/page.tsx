'use client';

import { useRouter } from 'next/navigation';

import MesasForm from './components/mesas-form';

import { TPostReturn, TPratosForm, TTable, TRequest } from '@/types';
import { Api } from '@/utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export default function MesasFormPage({ params: { id } }: TPratosForm) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const hasId = Array.isArray(id);

  const { data, isFetching } = useQuery(
    ['getTable'],
    (): Promise<TRequest<TTable>> => Api.get(`/tables/${id.at(0)}`),
    {
      enabled: hasId,
      cacheTime: 0,
    },
  );

  const { mutate, isLoading } = useMutation(['postTable'], (data: TTable) =>
    hasId ? Api.patch(`/tables/${id.at(0)}`, data) : Api.post('/tables', data),
  );

  const onSubmit = (data: TTable) =>
    mutate(data, {
      onSuccess: ({ data: { data } }: TRequest<TPostReturn>) => {
        if (!hasId) {
          const { id } = data;

          router.push(`/mesas/form/${id}`);
        }

        enqueueSnackbar('Mesa salva com sucesso!', { variant: 'success' });
      },
      onError: () => {
        enqueueSnackbar('Falha ao salvar a mesa', { variant: 'error' });
      },
    });

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
