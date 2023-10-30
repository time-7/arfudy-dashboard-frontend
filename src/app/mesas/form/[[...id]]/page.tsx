import MesasForm from './components/mesas-form';

import { TPratosForm, TGet, TTable } from '@/types';

export async function getProduct({
  id,
}: {
  id: string;
}): Promise<TGet<TTable>> {
  'use server';
  return await fetch(
    `https://arfudy-nestjs-backend.onrender.com/api/tables/${id}`,
    { cache: 'no-cache' },
  ).then((res) => res.json());
}

export default async function MesasFormPage({ params: { id } }: TPratosForm) {
  const data = id?.length ? await getProduct({ id: id[0] }) : null;

  return (
    <MesasForm
      id={id && id[0]}
      defaultValues={data?.data}
      showSkeleton={id && !data}
    />
  );
}
