import { TTable } from '@/types';
import { Box, Typography } from '@mui/material';

type TTableCard = {
  table: TTable;
};

export default function TableCard({ table }: TTableCard) {
  return (
    <Box
      sx={{
        width: 80,
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'secondary.light',
        border: '2px solid black',
        borderRadius: 6,
        cursor: 'pointer',
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: 'secondary.dark', fontWeight: 500 }}
      >
        {table.tableNum}
      </Typography>
    </Box>
  );
}
