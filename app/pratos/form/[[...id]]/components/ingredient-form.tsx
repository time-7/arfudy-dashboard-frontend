'use client';

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import NumberFormField from '@/components/fields/number-form-field';
import TextFormField from '@/components/fields/text-form-field';

import { TIngredient } from '@/types';
import { ingredientZod } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';

type IngredientForm = {
	onSubmit: (ingredient: TIngredient) => void;
	setOpen: Dispatch<SetStateAction<boolean>>;
	data?: TIngredient;
};

export default function IngredientForm({
	onSubmit,
	setOpen,
	data
}: IngredientForm) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TIngredient>({
		resolver: zodResolver(ingredientZod)
	});

	useEffect(() => reset(data), [data]);

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
				height: '100%',
				backgroundColor: 'secondary.main'
			}}
		>
			<Typography sx={{ color: 'white' }} variant="h6">
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

				<NumberFormField<TIngredient>
					sx={{ flex: 1 }}
					name="quantity"
					label="Quantidade"
					control={control}
					error={errors.quantity}
				/>
			</Box>

			<Typography sx={{ color: 'white' }} variant="h6">
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
					disabled
				/>
			</Box>

			<Box
				sx={{
					mt: 'auto',
					display: 'flex',
					justifyContent: 'flex-end',
					gap: 2
				}}
			>
				<Button variant="contained" onClick={() => setOpen(false)}>
					Cancelar
				</Button>
				<Button variant="contained" size="large" type="submit">
					Salvar
				</Button>
			</Box>
		</Box>
	);
}
