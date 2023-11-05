'use client';

import { useRouter } from 'next/navigation';

import MesasForm from './components/mesas-form';

import { Api } from '@/lib/axios';
import {
  TPratosForm,
  TGet,
  TTable,
  TPost,
  TPostReturn,
  TRequestError,
} from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useSnackbar } from 'notistack';

export default function MesasFormPage({ params: { id } }: TPratosForm) {
  const hasId = Boolean(id && id[0]);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { data, isFetching } = useQuery<TGet<TTable>>({
    queryKey: ['getTableList'],
    queryFn: () => Api.get(`/tables/${id[0]}`).then((res) => res.data),
    enabled: hasId,
  });

  const { mutate, isPending } = useMutation<
    TPost<TPostReturn<Pick<TTable, 'id'>>>,
    AxiosError<TRequestError>,
    TTable
  >({
    mutationFn: (data) =>
      hasId
        ? Api.patch(`/tables/${id.at(0)}`, data)
        : Api.post('/tables', data),
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
  });

  return (
    <MesasForm
      id={id && id[0]}
      data={data?.data}
      isFetching={isFetching}
      isPending={isPending}
      onSubmit={(data) => mutate(data)}
    />
  );
}
