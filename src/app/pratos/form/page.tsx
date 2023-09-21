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
import { z } from 'zod';
import { useSnackbar } from 'notistack';

const pratosFormSchema = z.object({
  name: z.string(),
  // description: z.string().optional(),
  // price: z.number().optional(),
  // imageUrl: z.string().url().optional(),
  // unityModelId: z.number().optional(),
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
  } = useForm<TProduct>({ resolver: zodResolver(pratosFormSchema) });

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
          type="decimal"
          label="Nome"
          {...register('name')}
          error={Boolean(errors.name)}
          helperText={`${errors.name?.message}`}
        />

        <TextField
          sx={{ flex: 2 }}
          label="Descrição"
          {...register('description')}
          error={Boolean(errors.description)}
          helperText={`${errors.description?.message}`}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextField
          sx={{ flex: 1 }}
          label="Preço"
          {...register('price')}
          error={Boolean(errors.price)}
          helperText={`${errors.price?.message}`}
        />

        <TextField
          sx={{ flex: 1 }}
          label="URL da imagem"
          {...register('imageUrl')}
          error={Boolean(errors.imageUrl)}
          helperText={`${errors.imageUrl?.message}`}
        />
        <TextField
          sx={{ flex: 1 }}
          label="ID modelo Unity"
          {...register('unityModelId')}
          error={Boolean(errors.unityModelId)}
          helperText={`${errors.unityModelId?.message}`}
        />

        <FormControlLabel
          control={<CheckBox {...register('has3dModel')} />}
          label="Possui modelo 3D"
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextField sx={{ flex: 1 }} label="Nome" />
        <TextField sx={{ flex: 1 }} label="Não sei" />
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
