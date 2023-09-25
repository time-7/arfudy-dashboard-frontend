'use client';

import { useForm } from 'react-hook-form';

import CheckboxFormField from '@/components/fields/checkbox-form-field';
import NumberFormField from '@/components/fields/number-form-field';
import TextFormField from '@/components/fields/text-form-field';

import { TProduct } from '@/types';
import { pratosFormSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';

type TPratosForm = {
  defaultValues?: TProduct;
  onSubmit: (data: TProduct) => void;
  showSkeleton: boolean;
};

export default function PratosForm({
  onSubmit,
  defaultValues,
  showSkeleton,
}: TPratosForm) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TProduct>({
    resolver: zodResolver(pratosFormSchema),
  });

  useEffect(() => reset(defaultValues), [defaultValues]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}
    >
      <Typography variant="h4">Cadastrar Prato</Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextFormField<TProduct>
          sx={{ flex: 1 }}
          name="name"
          label="Nome"
          control={control}
          error={errors.name}
          showSkeleton={showSkeleton}
        />

        <TextFormField<TProduct>
          sx={{ flex: 1 }}
          name="description"
          label="Descrição"
          control={control}
          error={errors.description}
          showSkeleton={showSkeleton}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="price"
          label="Preço"
          control={control}
          error={errors.price}
          showSkeleton={showSkeleton}
        />

        <TextFormField<TProduct>
          sx={{ flex: 1 }}
          name="imageUrl"
          label="URL da imagem"
          control={control}
          error={errors.imageUrl}
          showSkeleton={showSkeleton}
        />

        <TextFormField<TProduct>
          sx={{ flex: 1 }}
          name="unityModelId"
          label="ID modelo Unity"
          control={control}
          error={errors.unityModelId}
          showSkeleton={showSkeleton}
        />

        <CheckboxFormField<TProduct>
          control={control}
          label="Possui modelo 3D"
          name="has3dModel"
          showSkeleton={showSkeleton}
        />
      </Box>

      <Typography variant="h5">Fatores Nutricionais</Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.carbohydrate"
          label="Carboidrato"
          control={control}
          error={errors.nutritionFacts?.carbohydrate}
          showSkeleton={showSkeleton}
        />

        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.protein"
          label="Proteína"
          control={control}
          error={errors.nutritionFacts?.protein}
          showSkeleton={showSkeleton}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.totalFat"
          label="Total de gordura"
          control={control}
          error={errors.nutritionFacts?.totalFat}
          showSkeleton={showSkeleton}
        />

        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.totalCalories"
          label="Total de calorías"
          control={control}
          error={errors.nutritionFacts?.totalCalories}
          showSkeleton={showSkeleton}
        />
      </Box>

      <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={isSubmitting}
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
