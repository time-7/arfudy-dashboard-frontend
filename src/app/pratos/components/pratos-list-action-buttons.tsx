import { useRouter } from 'next/navigation';

import { TProduct } from '@/types';
import { Api } from '@/utils/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

type PratosListActionButtons = {
  row: TProduct;
};

export default function PratosListActionButtons({
  row,
}: PratosListActionButtons) {
  const { id } = row;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ['postProduct'],
    () => Api.delete(`/products/${id}`),
    {
      onSuccess: () => {
        enqueueSnackbar('Deletadoooo', { variant: 'success' });

        queryClient.invalidateQueries(['getProductList']);
      },
    },
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton onClick={() => router.push(`/pratos/form/${id}`)}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={() => mutate()}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
}
