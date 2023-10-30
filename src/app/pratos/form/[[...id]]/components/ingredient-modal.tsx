'use client';

import { Dispatch, SetStateAction } from 'react';

import { TIngredient } from '@/types';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import IngredientForm from './ingredient-form';

type TIngredientModal = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  ingredient: TIngredient;
};

export default function IngredientModal({ open, setOpen }: TIngredientModal) {
  const onClose = () => setOpen(false);
  const handleConfirm = () => {};
  const onSubmit = () => {
    console.log('oi');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          backgroundColor: 'secondary.main',
          border: '2px solid #000',
        },
      }}
    >
      <DialogTitle sx={{ color: 'white' }}>Novo Ingrediente</DialogTitle>
      <DialogContent>
        <IngredientForm onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Cancelar
        </Button>
        <LoadingButton onClick={handleConfirm} autoFocus>
          Adicionar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
