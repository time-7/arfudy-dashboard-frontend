import { useRouter } from 'next/navigation';

import { Api } from '@/utils/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import ConfirmModal from '../modal/confirm-modal';
import { useState } from 'react';

type GridActionButtons = {
  editRoute: string;
  deleteUrl: string;
};

export default function GridActionButtons({
  editRoute,
  deleteUrl,
}: GridActionButtons) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { mutate } = useMutation(['postProduct'], () => Api.delete(deleteUrl), {
    onSuccess: () => {
      enqueueSnackbar('Deletadoooo', { variant: 'success' });

      queryClient.invalidateQueries(['getProductList']);
    },
  });

  return (
    <>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        handleConfirm={() => mutate()}
        text="Você tem certeza que deseja excluir esse item?"
        title="Confirmação"
      />

      <Box sx={{ display: 'flex' }}>
        <IconButton onClick={() => router.push(editRoute)}>
          <EditIcon />
        </IconButton>

        <IconButton onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </>
  );
}
