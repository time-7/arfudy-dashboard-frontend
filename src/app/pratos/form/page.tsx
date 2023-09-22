'use client';

import { useForm } from 'react-hook-form';

import { TProduct } from '@/types';
import { Api } from '@/utils/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckBox } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { z } from 'zod';

const pratosFormSchema = z.object({
  name: z.string().nonempty('Campo é obrigatório'),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string().url('Informe uma URL válida'),
  unityModelId: z.number(),
  nutritionFacts: z.object({
    carbohydrate: z.number(),
    protein: z.number().optional(),
    totalFat: z.number(),
    totalCalories: z.number(),
  }),
});

export default function PratosForm() {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useMutation(['postProduct'], (data: TProduct) =>
    Api.post('/products', data),
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TProduct>({
    resolver: zodResolver(pratosFormSchema),
    defaultValues: { nutritionFacts: { carbohydrate: null } },
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
        <TextField
          sx={{ flex: 1 }}
          defaultValue={null}
          type="decimal"
          label="Nome"
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={errors.name ? `${errors.name?.message}` : null}
        />

        <TextField
          sx={{ flex: 2 }}
          defaultValue={null}
          label="Descrição"
          {...register('description')}
          error={Boolean(errors.description)}
          helperText={
            errors.description ? `${errors.description?.message}` : null
          }
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextField
          sx={{ flex: 1 }}
          defaultValue={null}
          label="Preço"
          {...register('price')}
          error={Boolean(errors.price)}
          helperText={errors.price ? `${errors.price?.message}` : null}
        />

        <TextField
          sx={{ flex: 1 }}
          label="URL da imagem"
          {...register('imageUrl')}
          error={Boolean(errors.imageUrl)}
          helperText={errors.imageUrl ? `${errors.imageUrl?.message}` : null}
        />
        <TextField
          sx={{ flex: 1 }}
          label="ID modelo Unity"
          {...register('unityModelId')}
          error={Boolean(errors.unityModelId)}
          helperText={
            errors.unityModelId ? `${errors.unityModelId?.message}` : null
          }
        />

        <FormControlLabel
          control={<CheckBox {...register('has3dModel')} />}
          label="Possui modelo 3D"
        />
      </Box>

      <Typography variant="h5">Fatores Nutricionais</Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextField
          sx={{ flex: 1 }}
          label="Carboidrato"
          {...register('nutritionFacts.carbohydrate')}
          error={Boolean(errors.nutritionFacts?.carbohydrate)}
          helperText={
            errors.nutritionFacts?.carbohydrate
              ? `${errors.nutritionFacts.carbohydrate?.message}`
              : null
          }
        />
        <TextField
          sx={{ flex: 1 }}
          defaultValue={null}
          label="Proteína"
          {...register('nutritionFacts.protein')}
          error={Boolean(errors.nutritionFacts?.protein)}
          helperText={
            errors.nutritionFacts?.protein
              ? `${errors.nutritionFacts.protein?.message}`
              : null
          }
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextField
          sx={{ flex: 1 }}
          type="number"
          label="Total de gordura"
          {...register('nutritionFacts.totalFat')}
          error={Boolean(errors.nutritionFacts?.totalFat)}
          helperText={
            errors.nutritionFacts?.totalFat
              ? `${errors.nutritionFacts.totalFat?.message}`
              : null
          }
        />
        <TextField
          sx={{ flex: 1 }}
          label="Total de calorías"
          {...register('nutritionFacts.totalCalories')}
          error={Boolean(errors.nutritionFacts?.totalCalories)}
          helperText={
            errors.nutritionFacts?.totalCalories
              ? `${errors.nutritionFacts.totalCalories?.message}`
              : null
          }
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
