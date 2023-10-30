import { TPatch, TPost, TProduct, TTable } from '@/types';

export async function patchProduct({ data, id }: TPatch<TProduct>) {
  return await fetch(
    `https://arfudy-nestjs-backend.onrender.com/api/products/${id}`,
    {
      body: JSON.stringify(data),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export async function postProduct({ data }: TPost<TProduct>) {
  return await fetch(
    'https://arfudy-nestjs-backend.onrender.com/api/products',
    {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export async function patchTable({ data, id }: TPatch<TTable>) {
  return await fetch(
    `https://arfudy-nestjs-backend.onrender.com/api/tables/${id}`,
    {
      body: JSON.stringify(data),
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export async function postTable({ data }: TPost<TTable>) {
  return await fetch('https://arfudy-nestjs-backend.onrender.com/api/tables', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
