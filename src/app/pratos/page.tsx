'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import PratosListActionButtons from './components/pratos-list-action-buttons';

import { TProduct, TRequest } from '@/types';
import { Api } from '@/utils/axios';
import { money } from '@/utils/format';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

export default function Pratos() {
  const router = useRouter();

  const { data, isFetching } = useQuery(
    ['getProductList'],
    (): Promise<TRequest<TProduct[]>> => Api.get('/products'),
  );

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
      valueFormatter: ({ value }) => money(value),
    },
    {
      field: 'Ações',
      headerAlign: 'center',
      align: 'center',
      renderCell: ({ row }) => <PratosListActionButtons row={row} />,
    },
  ];

  console.log(data);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Pratos</Typography>
        <Button variant="contained" onClick={() => router.push('/pratos/form')}>
          + Novo
        </Button>
      </Box>

      <DataGrid
        columns={columns}
        rows={data?.data || []}
        rowCount={data?.data.length || 0}
        loading={isFetching}
      />
    </Box>
  );
}
