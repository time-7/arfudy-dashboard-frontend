'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import AddButton from '@/components/button/add-button';
import UploadImageButton from '@/components/button/upload-image-button';
import PageContainer from '@/components/containers/page-container';
import CheckboxFormField from '@/components/fields/checkbox-form-field';
import NumberFormField from '@/components/fields/number-form-field';
import TextFormField from '@/components/fields/text-form-field';

import IngredientModal from './ingredient-modal';
import IngredientsGrid from './ingredients-grid';

import { TProduct, TForm } from '@/types';
import { pratosFormSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';

export default function PratosForm({
  id,
  data,
  onSubmit,
  isFetching,
  isPending,
}: TForm<TProduct>) {
  const [openIngredientModal, setOpenIngredientModal] =
    useState<boolean>(false);
  const ingredientIdRef = useRef<number | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<TProduct>({
    resolver: zodResolver(pratosFormSchema),
  });

  useEffect(() => reset(data), [data]);

  const removeIngredient = (id: number) => {
    const ingredients = getValues('ingredients');
    const newIngredients = ingredients.toSpliced(id - 1, 1);

    setValue('ingredients', newIngredients);
  };

  const editIngredient = (id: number) => {
    ingredientIdRef.current = id - 1;

    setOpenIngredientModal(true);
  };

  useEffect(() => {
    if (!openIngredientModal) {
      ingredientIdRef.current = null;
    }
  }, [openIngredientModal]);

  return (
    <>
      <IngredientModal
        setValue={setValue}
        getValues={getValues}
        clearErrors={clearErrors}
        open={openIngredientModal}
        setOpen={setOpenIngredientModal}
        ingredientId={ingredientIdRef.current}
      />

      <PageContainer component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4">
          {id?.length ? 'Editar' : 'Cadastrar'} prato
        </Typography>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <TextFormField<TProduct>
            sx={{ flex: 1 }}
            name="name"
            label="Nome"
            control={control}
            error={errors.name}
            showSkeleton={isFetching}
            disabled={isPending}
          />

          <TextFormField<TProduct>
            sx={{ flex: 1 }}
            name="description"
            label="Descrição"
            control={control}
            error={errors.description}
            showSkeleton={isFetching}
            disabled={isPending}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="price"
            label="Preço"
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            control={control}
            error={errors.price}
            showSkeleton={isFetching}
            disabled={isPending}
          />

          <TextFormField<TProduct>
            sx={{ flex: 1 }}
            name="imageUrl"
            label="URL da imagem"
            control={control}
            error={errors.imageUrl}
            showSkeleton={isFetching}
            disabled={isPending}
          />

          <UploadImageButton
            disabled={isFetching || isPending}
            sx={{ flex: 0.5 }}
            setImage={(url) => setValue('imageUrl', url)}
          />

          <CheckboxFormField<TProduct>
            control={control}
            label="Possui modelo 3D"
            name="has3dModel"
            showSkeleton={isFetching}
            disabled={isPending}
          />

          <TextFormField<TProduct>
            sx={{ flex: 1 }}
            name="unityModelId"
            label="ID modelo Unity"
            control={control}
            disabled={!watch('has3dModel') || isPending}
            error={errors.unityModelId}
            showSkeleton={isFetching}
          />
        </Box>

        <Typography variant="h5">Fatores Nutricionais</Typography>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="nutritionFacts.carbohydrate"
            label="Carboidrato (g)"
            suffix=" grama(s)"
            control={control}
            error={errors.nutritionFacts?.carbohydrate}
            showSkeleton={isFetching}
            disabled={isPending || Boolean(watch('ingredients')?.length)}
          />

          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="nutritionFacts.protein"
            label="Proteína (g)"
            suffix=" grama(s)"
            control={control}
            error={errors.nutritionFacts?.protein}
            showSkeleton={isFetching}
            disabled={isPending || Boolean(watch('ingredients')?.length)}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 4 }}>
          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="nutritionFacts.totalFat"
            label="Total de gordura (g)"
            suffix=" grama(s)"
            control={control}
            error={errors.nutritionFacts?.totalFat}
            showSkeleton={isFetching}
            disabled={isPending || Boolean(watch('ingredients')?.length)}
          />

          <NumberFormField<TProduct>
            sx={{ flex: 1 }}
            name="nutritionFacts.totalCalories"
            label="Total de calorías (kcal)"
            suffix=" kcal"
            control={control}
            error={errors.nutritionFacts?.totalCalories}
            showSkeleton={isFetching}
            disabled
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">Ingredientes</Typography>

          <AddButton
            text="Novo ingrediente"
            variant="contained"
            disabled={isFetching || isPending}
            onClick={() => setOpenIngredientModal(true)}
          />
        </Box>

        <Box
          sx={{
            height: '400px',
            maxWidth: '100%',
            display: 'flex',
          }}
        >
          <IngredientsGrid
            data={watch('ingredients')}
            loading={isFetching || isPending}
            removeIngredient={removeIngredient}
            editIngredient={editIngredient}
          />
        </Box>

        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <LoadingButton
            variant="contained"
            size="large"
            type="submit"
            loading={isPending}
          >
            Salvar
          </LoadingButton>
        </Box>
      </PageContainer>
    </>
  );
}
