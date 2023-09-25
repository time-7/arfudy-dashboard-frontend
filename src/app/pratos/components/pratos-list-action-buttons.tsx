import { useRouter } from 'next/navigation';

import { TProduct } from '@/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
// import { useMutation } from '@tanstack/react-query';
// import { Api } from '@/utils/axios';

type PratosListActionButtons = {
  row: TProduct;
};

export default function PratosListActionButtons({
  row,
}: PratosListActionButtons) {
  const { id } = row;
  const router = useRouter();

  // const { mutate } = useMutation(['postProduct'], () =>
  //   Api.delete(`/products/${id}`),
  // );

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton onClick={() => router.push(`/pratos/form/${id}`)}>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
