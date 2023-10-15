import { DataGrid, DataGridProps } from '@mui/x-data-grid';

export default function Grid(props: DataGridProps) {
  return (
    <DataGrid
      {...props}
      sx={{
        color: 'secondary.dark',
        border: '2px solid #003271',
        backgroundColor: 'secondary.light',
        '.MuiDataGrid-withBorderColor': { borderColor: '#003271' },
        '.MuiDataGrid-cell:focus': { outline: '1px #003271 solid' },
        '.MuiDataGrid-row.Mui-selected, .MuiDataGrid-row.Mui-selected.Mui-hovered':
          { backgroundColor: 'secondary.500' },
      }}
    />
  );
}
