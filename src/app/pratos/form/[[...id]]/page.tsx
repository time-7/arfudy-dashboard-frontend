import PratosForm from './components/pratos-form';

import { TGet, TPratosForm, TProduct } from '@/types';

export async function getProduct({
  id,
}: {
  id: string;
}): Promise<TGet<TProduct>> {
  'use server';
  return await fetch(
    `https://arfudy-nestjs-backend.onrender.com/api/products/${id}`,
    { cache: 'no-cache' },
  ).then((res) => res.json());
}

export default async function PratosFormPage({ params: { id } }: TPratosForm) {
  const data = id?.length ? await getProduct({ id: id[0] }) : null;

  return (
    <PratosForm
      id={id && id[0]}
      defaultValues={data?.data}
      showSkeleton={id && !data}
    />
  );
}
