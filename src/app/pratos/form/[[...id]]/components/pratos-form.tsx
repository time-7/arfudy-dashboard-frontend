'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import CheckboxFormField from '@/components/fields/checkbox-form-field';
import NumberFormField from '@/components/fields/number-form-field';
import TextFormField from '@/components/fields/text-form-field';

import { TProduct, TForm } from '@/types';
import { pratosFormSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';

export default function PratosForm({
  onSubmit,
  defaultValues,
  showSkeleton,
  hasId,
  isSubmitting,
}: TForm<TProduct>) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<TProduct>({
    resolver: zodResolver(pratosFormSchema),
  });

  useEffect(() => reset(defaultValues), [defaultValues]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        height: '100%',
        backgroundColor: 'secondary.main',
        margin: 2,
        padding: 5.5,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4">
        {hasId ? 'Editar' : 'Cadastrar'} Prato
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextFormField<TProduct>
          sx={{ flex: 1 }}
          name="name"
          label="Nome"
          control={control}
          error={errors.name}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />

        <TextFormField<TProduct>
          sx={{ flex: 1 }}
          name="description"
          label="Descrição"
          control={control}
          error={errors.description}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
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
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />

        <TextFormField<TProduct>
          sx={{ flex: 1 }}
          name="imageUrl"
          label="URL da imagem"
          control={control}
          error={errors.imageUrl}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />

        <CheckboxFormField<TProduct>
          control={control}
          label="Possui modelo 3D"
          name="has3dModel"
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />

        <TextFormField<TProduct>
          sx={{ flex: 1 }}
          name="unityModelId"
          label="ID modelo Unity"
          control={control}
          disabled={!watch('has3dModel')}
          error={errors.unityModelId}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />
      </Box>

      <Typography variant="h5">Fatores Nutricionais</Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.carbohydrate"
          label="Carboidrato"
          suffix=" grama(s)"
          control={control}
          error={errors.nutritionFacts?.carbohydrate}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />

        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.protein"
          label="Proteína"
          suffix=" grama(s)"
          control={control}
          error={errors.nutritionFacts?.protein}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.totalFat"
          label="Total de gordura"
          suffix=" grama(s)"
          control={control}
          error={errors.nutritionFacts?.totalFat}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />

        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.totalCalories"
          label="Total de calorías"
          control={control}
          error={errors.nutritionFacts?.totalCalories}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />
      </Box>

      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <LoadingButton
          variant="contained"
          size="large"
          type="submit"
          loading={isSubmitting}
        >
          Salvar
        </LoadingButton>
      </Box>
    </Box>
  );
}
