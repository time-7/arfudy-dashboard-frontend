'use client';

import { TProduct, TRequest } from '@/types';
import { Api } from '@/utils/axios';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import PratosListActionButtons from './components/pratos-list-action-buttons';

export default function Pratos() {
  const { data, isFetching } = useQuery(
    ['getProduct'],
    (): Promise<TRequest<TProduct[]>> => Api.get('/products'),
  );

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
    },
    {
      field: 'description',
      headerName: 'Descrição',
    },
    {
      field: 'price',
      headerName: 'Preço',
    },
    {
      field: 'Ações',
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
      <Typography variant="h4">Pratos</Typography>

      <DataGrid
        columns={columns}
        rows={data?.data || []}
        rowCount={data?.data.length || 0}
        loading={isFetching}
      />
    </Box>
  );
}
