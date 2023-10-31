'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ConfirmModal from '../modal/confirm-modal';

import { Api } from '@/utils/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

type DataGridActionButtons = {
  editRoute: string;
  deleteUrl: string;
};

export default function DataGridActionButtons({
  editRoute,
  deleteUrl,
}: DataGridActionButtons) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => Api.delete(deleteUrl),
    onSuccess: () => {
      enqueueSnackbar('Deletadoooo', { variant: 'success' });

      queryClient.invalidateQueries({ queryKey: ['getProductList'] });

      setOpen(false);
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
        loading={isPending}
      />

      <Box sx={{ display: 'flex' }}>
        <Tooltip title="Editar">
          <IconButton onClick={() => router.push(editRoute)}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Excluir">
          <IconButton onClick={() => setOpen(true)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
}
