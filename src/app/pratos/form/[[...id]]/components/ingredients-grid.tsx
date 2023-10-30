import DataGrid from '@/components/data-grid/data-grid';
import DataGridActionButtons from '@/components/data-grid/data-grid-action-buttons';
import { GridColDef } from '@mui/x-data-grid';
import React from 'react';

export default function IngredientsGrid() {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'quantity', headerName: 'Quantidade', flex: 1 },
    {
      field: 'carbohydrate',
      headerName: 'Carboidrato',
      valueFormatter: ({ value }) => `${value} grama(s)`,
      flex: 1,
    },
    {
      field: 'protein',
      headerName: 'Proteína',
      valueFormatter: ({ value }) => `${value} grama(s)`,
      flex: 1,
    },
    {
      field: 'totalFat',
      headerName: 'Total de gordura',
      valueFormatter: ({ value }) => `${value} grama(s)`,
      flex: 1,
    },
    { field: 'totalCalories', headerName: 'Total de calorías', flex: 1 },
    {
      field: 'Ações',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      renderCell: ({ row }) => (
        <DataGridActionButtons
          deleteUrl={`/products/${row.id}`}
          editRoute={`/pratos/form/${row.id}`}
        />
      ),
    },
  ];

  return <DataGrid columns={columns} rows={[]} rowCount={0} />;
}
