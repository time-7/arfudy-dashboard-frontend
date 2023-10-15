'use client';

import { useRouter } from 'next/navigation';

import DataGrid from '@/components/data-grid/data-grid';
import DataGridActionButtons from '@/components/data-grid/data-grid-action-buttons';

import { TTable, TRequest } from '@/types';
import { Api } from '@/utils/axios';
import { Box, Button, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

export default function Mesas() {
  const router = useRouter();

  const { data, isFetching } = useQuery(
    ['getTableList'],
    (): Promise<TRequest<TTable[]>> => Api.get('/tables'),
  );

  const columns: GridColDef[] = [
    {
      field: 'tableNum',
      headerName: 'Número da mesa',
      flex: 1,
    },
    {
      field: 'seatNum',
      headerName: 'Número de assentos',
      flex: 1,
    },
    {
      field: 'activeToken',
      headerName: 'Token',
      flex: 1,
    },
    {
      field: 'Ações',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <DataGridActionButtons
          deleteUrl={`/products/${row.id}`}
          editRoute={`/mesas/form/${row.id}`}
        />
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        height: '100%',
        margin: 2,
        padding: 5.5,
        borderRadius: 2,
        backgroundColor: 'secondary.main',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Mesas</Typography>

        <Button variant="contained" onClick={() => router.push('/mesas/form')}>
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
