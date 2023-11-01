import DataGrid from '@/components/data-grid/data-grid';
import DataGridActionButtons from '@/components/data-grid/data-grid-action-buttons';

import { TIngredient } from '@/types';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

type TIngredientsGrid = {
  data: TIngredient[] | undefined;
  loading: boolean;
  editIngredient: (id: number) => void;
  removeIngredient: (id: number) => void;
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

export default function IngredientsGrid({
  data,
  loading,
  editIngredient,
  removeIngredient,
}: TIngredientsGrid) {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 150 },
    { field: 'quantity', headerName: 'Quantidade', width: 110 },
    {
      field: 'carbohydrate',
      headerName: 'Carboidrato',
      valueFormatter: ({ value }) => `${value} grama(s)`,
      width: 110,
    },
    {
      field: 'protein',
      headerName: 'Proteína',
      valueFormatter: ({ value }) => `${value} grama(s)`,
      width: 110,
    },
    {
      field: 'totalFat',
      headerName: 'Total de gordura',
      valueFormatter: ({ value }) => `${value} grama(s)`,
      width: 110,
    },
    {
      field: 'totalCalories',
      headerName: 'Total de calorías',
      width: 110,
    },
    {
      field: 'Ações',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      filterable: false,
      width: 110,
      renderCell: ({ row }) => (
        <DataGridActionButtons
          onEdit={() => editIngredient(row.id)}
          onDelete={() => removeIngredient(row.id)}
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
