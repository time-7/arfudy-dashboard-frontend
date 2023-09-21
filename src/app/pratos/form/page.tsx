'use client';

import { useForm } from 'react-hook-form';

import { TProduct } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckBox } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import { z } from 'zod';

const pratosFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  imageUrl: z.string().url(),
  unityModelId: z.number(),
});

export default function PratosForm() {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<TProduct>({ resolver: zodResolver(pratosFormSchema) });

  const onSubmit = (data: TProduct) => {
    console.log(data);
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
