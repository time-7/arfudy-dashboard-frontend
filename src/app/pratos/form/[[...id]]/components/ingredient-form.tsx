'use client';

import { useForm } from 'react-hook-form';

import NumberFormField from '@/components/fields/number-form-field';
import TextFormField from '@/components/fields/text-form-field';

import { TIngredient } from '@/types';
import { ingredientZod } from '@/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Typography } from '@mui/material';

type IngredientForm = {
  onSubmit: (ingredient: TIngredient) => void;
};

export default function IngredientForm({ onSubmit }: IngredientForm) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TIngredient>({
    resolver: zodResolver(ingredientZod),
  });

  console.log(errors);

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
      }}
    >
      <Typography sx={{ color: 'white' }} variant="h5">
        Dados gerais
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <TextFormField<TIngredient>
          sx={{ flex: 1 }}
          name="name"
          label="Nome"
          control={control}
          error={errors.name}
        />

        <TextFormField<TIngredient>
          sx={{ flex: 1 }}
          name="quantity"
          label="Quantidade"
          control={control}
          error={errors.quantity}
        />
      </Box>

      <Typography sx={{ color: 'white' }} variant="h5">
        Fatores Nutricionais
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <NumberFormField<TIngredient>
          sx={{ flex: 1 }}
          name="nutritionFacts.carbohydrate"
          label="Carboidrato (g)"
          suffix=" grama(s)"
          control={control}
          error={errors.nutritionFacts?.carbohydrate}
        />

        <NumberFormField<TIngredient>
          sx={{ flex: 1 }}
          name="nutritionFacts.protein"
          label="Proteína (g)"
          suffix=" grama(s)"
          control={control}
          error={errors.nutritionFacts?.protein}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <NumberFormField<TIngredient>
          sx={{ flex: 1 }}
          name="nutritionFacts.totalFat"
          label="Total de gordura (g)"
          suffix=" grama(s)"
          control={control}
          error={errors.nutritionFacts?.totalFat}
        />

        <NumberFormField<TIngredient>
          sx={{ flex: 1 }}
          name="nutritionFacts.totalCalories"
          label="Total de calorías (kcal)"
          suffix=" kcal"
          control={control}
          error={errors.nutritionFacts?.totalCalories}
        />
      </Box>
    </Box>
  );
}
