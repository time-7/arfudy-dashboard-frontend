'use client';

import Image from 'next/image';

import DataGrid from '@/components/data-grid/data-grid';
import DataGridActionButtons from '@/components/data-grid/data-grid-action-buttons';

import { Api } from '@/lib/axios';
import { TGet, TProduct } from '@/types';
import { money } from '@/utils/format';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

export default function PratosGrid() {
  const { data, isFetching } = useQuery<TGet<TProduct[]>>({
    queryKey: ['getProductList'],
    queryFn: () => Api.get('/products').then((res) => res.data),
  });

  const columns: GridColDef[] = [
    {
      field: 'Imagem',
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => {
        const { imageUrl } = row;

        if (imageUrl) {
          return (
            <Box
              sx={{ padding: 1, position: 'relative', width: 40, height: 40 }}
            >
              <Image
                src={imageUrl}
                alt={imageUrl}
                unoptimized
                fill
                style={{ borderRadius: 4 }}
              />
            </Box>
          );
        }
      },
    },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
    },
    {
      field: 'description',
      headerName: 'Descrição',
      flex: 1,
    },
    {
      field: 'price',
      headerName: 'Preço',
      valueFormatter: ({ value }) => {
        return money(value);
      },
    },
    {
      field: 'Ações',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => {
        return (
          <DataGridActionButtons
            deleteUrl={`/products/${row.id}`}
            editRoute={`/pratos/form/${row.id}`}
          />
        );
      },
    },
  ];

  return (
    <DataGrid columns={columns} rows={data?.data || []} loading={isFetching} />
  );
}
