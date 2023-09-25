'use client';

import PratosListActionButtons from './components/pratos-list-action-buttons';

import { TProduct, TRequest } from '@/types';
import { Api } from '@/utils/axios';
import { money } from '@/utils/format';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

export default function Pratos() {
  const { data, isFetching } = useQuery(
    ['getProductList'],
    (): Promise<TRequest<TProduct[]>> => Api.get('/products'),
  );

  const columns: GridColDef[] = [
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
