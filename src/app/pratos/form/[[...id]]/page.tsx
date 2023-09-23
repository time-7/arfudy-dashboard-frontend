'use client';

import { useForm } from 'react-hook-form';

import CheckboxFormField from '@/components/fields/checkbox-form-field';
import InputFormField from '@/components/fields/input-form-field';

import { TProduct } from '@/types';
import { Api } from '@/utils/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { z } from 'zod';

const pratosFormSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number(),
  imageUrl: z.string().url().nonempty(),
  unityModelId: z.number(),
  has3dModel: z.boolean(),
  nutritionFacts: z
    .object({
      carbohydrate: z.number().optional().nullable(),
      protein: z.number().optional().nullable(),
      totalFat: z.number().optional().nullable(),
      totalCalories: z.number().optional().nullable(),
    })
    .nullable(),
});

type TPratosForm = {
  params: { id: string };
};

export default function PratosForm({ params }: TPratosForm) {
  const { enqueueSnackbar } = useSnackbar();

  // const { data } = useQuery(['getProduct'], () => Api.get('/products'));
  console.log(params.id);

  const { mutate } = useMutation(['postProduct'], (data: TProduct) =>
    Api.post('/products', data),
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TProduct>({
    resolver: zodResolver(pratosFormSchema),
    defaultValues: { has3dModel: false },
  });

  const onSubmit = (data: TProduct) => {
    console.log(data);

    mutate(data, {
      onError: () =>
        enqueueSnackbar('Request deu ERRO!!!!!!!', { variant: 'error' }),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 4, height: '100%' }}
    >
      <Typography variant="h4">Cadastrar Prato</Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <InputFormField<TProduct>
          sx={{ flex: 1 }}
          name="name"
          label="Nome"
          control={control}
          error={errors.name}
        />

        <InputFormField<TProduct>
          sx={{ flex: 1 }}
          name="description"
          label="Descrição"
          control={control}
          error={errors.description}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <InputFormField<TProduct>
          sx={{ flex: 1 }}
          inputType="number"
          name="price"
          label="Preço"
          control={control}
          error={errors.price}
        />

        <InputFormField<TProduct>
          sx={{ flex: 1 }}
          name="imageUrl"
          label="URL da imagem"
          control={control}
          error={errors.imageUrl}
        />

        <InputFormField<TProduct>
          sx={{ flex: 1 }}
          inputType="number"
          name="unityModelId"
          label="ID modelo Unity"
          control={control}
          error={errors.unityModelId}
        />

        <CheckboxFormField<TProduct>
          control={control}
          label="Possui modelo 3D"
          name="has3dModel"
        />
      </Box>

      <Typography variant="h5">Fatores Nutricionais</Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <InputFormField<TProduct>
          sx={{ flex: 1 }}
          inputType="number"
          name="nutritionFacts.carbohydrate"
          label="Carboidrato"
          control={control}
          error={errors.nutritionFacts?.carbohydrate}
        />

        <InputFormField<TProduct>
          sx={{ flex: 1 }}
          inputType="number"
          name="nutritionFacts.protein"
          label="Proteína"
          control={control}
          error={errors.nutritionFacts?.protein}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <InputFormField<TProduct>
          sx={{ flex: 1 }}
          inputType="number"
          name="nutritionFacts.totalFat"
          label="Total de gordura"
          control={control}
          error={errors.nutritionFacts?.totalFat}
        />

        <InputFormField<TProduct>
          sx={{ flex: 1 }}
          inputType="number"
          name="nutritionFacts.totalCalories"
          label="Total de calorías"
          control={control}
          error={errors.nutritionFacts?.totalCalories}
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
