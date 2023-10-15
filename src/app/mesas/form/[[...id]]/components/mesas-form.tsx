'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import NumberFormField from '@/components/fields/number-form-field';
import TextFormField from '@/components/fields/text-form-field';

import { TTable, TForm } from '@/types';
import { mesasFormSchema } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';

export default function MesasForm({
  onSubmit,
  defaultValues,
  showSkeleton,
  hasId,
  isSubmitting,
}: TForm<TTable>) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTable>({
    resolver: zodResolver(mesasFormSchema),
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
        {hasId ? 'Editar' : 'Cadastrar'} Mesa
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <NumberFormField<TTable>
          sx={{ flex: 1 }}
          name="tableNum"
          label="Número da mesa"
          control={control}
          error={errors.tableNum}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />

        <NumberFormField<TTable>
          sx={{ flex: 1 }}
          name="seatNum"
          label="Número de assentos"
          control={control}
          error={errors.seatNum}
          showSkeleton={showSkeleton}
          isSubmitting={isSubmitting}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextFormField<TTable>
          sx={{ flex: 1 }}
          name="activeToken"
          label="Token"
          control={control}
          disabled
          error={errors.activeToken}
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
