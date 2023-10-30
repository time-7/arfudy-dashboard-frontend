'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import AddButton from '@/components/button/add-button';
import CheckboxFormField from '@/components/fields/checkbox-form-field';
import NumberFormField from '@/components/fields/number-form-field';
import TextFormField from '@/components/fields/text-form-field';

import IngredientsGrid from './ingredients-grid';

import { patchProduct, postProduct } from '@/api/api';
import { TProduct, TForm, TPostReturn, TPatchReturn } from '@/types';
import { pratosFormSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';

export default function PratosForm({
  defaultValues,
  showSkeleton,
  id,
}: TForm<TProduct>) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
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

  const onSubmit = (data: TProduct) => {
    setIsSubmitting(true);

    if (id) {
      patchProduct({ data, id })
        .then(async (response) => {
          const { message }: TPatchReturn = await response.json();

          enqueueSnackbar(message, { variant: 'success' });
        })
        .finally(() => setIsSubmitting(false));
    } else {
      postProduct({ data })
        .then(async (response) => {
          const { data, message }: TPostReturn = await response.json();

          router.push(`/pratos/form/${data.id}`);

          enqueueSnackbar(message, { variant: 'success' });
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        backgroundColor: 'secondary.main',
        height: '100%',
        margin: 2,
        padding: 5.5,
        borderRadius: 2,
      }}
    >
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
          label="Carboidrato (g)"
          suffix=" grama(s)"
          control={control}
          error={errors.nutritionFacts?.carbohydrate}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />

        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.protein"
          label="Proteína (g)"
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
          label="Total de gordura (g)"
          suffix=" grama(s)"
          control={control}
          error={errors.nutritionFacts?.totalFat}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />

        <NumberFormField<TProduct>
          sx={{ flex: 1 }}
          name="nutritionFacts.totalCalories"
          label="Total de calorías (kcal)"
          suffix=" kcal"
          control={control}
          error={errors.nutritionFacts?.totalCalories}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h5">Ingredientes</Typography>

        <AddButton
          text="Novo ingrediente"
          variant="contained"
          onClick={() => {}}
        />
      </Box>

      <Box
        sx={{
          minHeight: '200px',
          display: 'flex',
        }}
      >
        <IngredientsGrid />
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
