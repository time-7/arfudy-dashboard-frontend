'use client';

import { Dispatch, SetStateAction } from 'react';
import { UseFormSetValue, UseFormGetValues } from 'react-hook-form';

import IngredientForm from './ingredient-form';

import { TIngredient, TProduct } from '@/types';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

type TIngredientModal = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  getValues: UseFormGetValues<TProduct>;
  setValue: UseFormSetValue<TProduct>;
};

export default function IngredientModal({
  open,
  setOpen,
  getValues,
  setValue,
}: TIngredientModal) {
  const onClose = () => setOpen(false);

  const onSubmit = (data: TIngredient) => {
    const ingredients = getValues('ingredients');

    setValue('ingredients', [...ingredients, data]);

    onClose();
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
        <IngredientForm onSubmit={onSubmit} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
