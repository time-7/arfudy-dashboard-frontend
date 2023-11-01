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
  ingredientId: number | null;
};

export default function IngredientModal({
  open,
  setOpen,
  getValues,
  setValue,
  ingredientId,
}: TIngredientModal) {
  const isIngredientIdNumber = typeof ingredientId === 'number';

  const onSubmit = (data: TIngredient) => {
    const ingredients = getValues('ingredients') || [];

    let newIngredients: typeof ingredients = [];

    if (isIngredientIdNumber) {
      newIngredients = ingredients.toSpliced(ingredientId, 1, data);
    } else {
      newIngredients = [...ingredients, data];
    }

    setValue('ingredients', newIngredients);

    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
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
        <IngredientForm
          onSubmit={onSubmit}
          setOpen={setOpen}
          data={
            isIngredientIdNumber && getValues('ingredients')
              ? getValues('ingredients')[ingredientId]
              : undefined
          }
        />
      </DialogContent>
    </Dialog>
  );
}
