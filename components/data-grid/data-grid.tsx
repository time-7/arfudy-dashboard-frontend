import { DataGrid as DataGridMui, DataGridProps } from '../../lib/mui';

export default function DataGrid(props: DataGridProps) {
  return (
    <DataGridMui
      disableRowSelectionOnClick
      {...props}
      sx={{
        color: 'secondary.dark',
        border: '2px solid #003271',
        borderRadius: 8,
        backgroundColor: 'secondary.light',
        '.MuiDataGrid-withBorderColor': {
          borderColor: '#003271',
        },
        '.MuiDataGrid-cell:focus, .MuiDataGrid-cell:focus-within, .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within ':
          {
            outline: '1px #003271 solid',
          },
        '.MuiDataGrid-row.Mui-selected, .MuiDataGrid-row.Mui-selected.Mui-hovered':
          {
            backgroundColor: 'secondary.light',
          },
        '.MuiDataGrid-virtualScroller': {
          backgroundColor: '#fff',
        },
      }}
    />
  );
}
