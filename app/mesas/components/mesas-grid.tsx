'use client';

import DataGrid from '@/components/data-grid/data-grid';
import DataGridActionButtons from '@/components/data-grid/data-grid-action-buttons';

import { Api } from '@/lib/axios';
import { TGet, TTable } from '@/types';
import { GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';

export default function MesasGrid() {
  const { data } = useQuery<TGet<TTable[]>>({
    queryKey: ['getTableList'],
    queryFn: () => Api.get('/tables').then((res) => res.data),
  });

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
          deleteUrl={`/tables/${row.id}`}
          editRoute={`/mesas/form/${row.id}`}
        />
      ),
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={data?.data || []}
      rowCount={data?.data.length || 0}
    />
  );
}
