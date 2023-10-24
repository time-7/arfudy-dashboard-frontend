'use client';

import Image from 'next/image';

import DataGrid from '@/components/data-grid/data-grid';
import DataGridActionButtons from '@/components/data-grid/data-grid-action-buttons';

import { money } from '@/utils/format';
import { GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

export default function PratosGrid({ data }: any) {
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
    <DataGrid
      columns={columns}
      rows={data?.data || []}
      rowCount={data?.data.length || 0}
      loading={false}
    />
  );
}
