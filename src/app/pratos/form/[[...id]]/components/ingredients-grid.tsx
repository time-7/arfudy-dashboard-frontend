import DataGrid from '@/components/data-grid/data-grid';
import DataGridActionButtons from '@/components/data-grid/data-grid-action-buttons';

import { TIngredient } from '@/types';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

type TIngredientsGrid = {
  data: TIngredient[] | undefined;
  loading: boolean;
};

const getRows = (ingredients: TIngredient[] | undefined): GridRowsProp => {
  if (ingredients?.length) {
    return ingredients.map((item, index) => ({
      id: index + 1,
      quantity: item.quantity,
      name: item.name,
      protein: item.nutritionFacts.protein,
      carbohydrate: item.nutritionFacts.carbohydrate,
      totalFat: item.nutritionFacts.totalFat,
      totalCalories: item.nutritionFacts.totalCalories,
    }));
  }

  return [];
};

export default function IngredientsGrid({ data, loading }: TIngredientsGrid) {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'quantity', headerName: 'Quantidade' },
    {
      field: 'carbohydrate',
      headerName: 'Carboidrato',
      valueFormatter: ({ value }) => `${value} grama(s)`,
    },
    {
      field: 'protein',
      headerName: 'Proteína',
      valueFormatter: ({ value }) => `${value} grama(s)`,
    },
    {
      field: 'totalFat',
      headerName: 'Total de gordura',
      valueFormatter: ({ value }) => `${value} grama(s)`,
    },
    { field: 'totalCalories', headerName: 'Total de calorías' },
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

  const rows = getRows(data);

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowCount={rows.length}
      loading={loading}
    />
  );
}
