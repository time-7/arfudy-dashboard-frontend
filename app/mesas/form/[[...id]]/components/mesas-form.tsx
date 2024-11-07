'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import PageContainer from '@/components/containers/page-container';
import NumberFormField from '@/components/fields/number-form-field';
import TextFormField from '@/components/fields/text-form-field';

import { TTable, TForm } from '@/types';
import { mesasFormSchema } from '@/utils/validators';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';

export default function MesasForm({
	id,
	data,
	onSubmit,
	isFetching,
	isPending
}: TForm<TTable>) {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<TTable>({
		resolver: zodResolver(mesasFormSchema)
	});

	useEffect(() => reset(data), [data]);

	return (
		<PageContainer component="form" onSubmit={handleSubmit(onSubmit)}>
			<Typography variant="h4">
				{id?.length ? 'Editar' : 'Cadastrar'} mesa
			</Typography>

			<Box sx={{ display: 'flex', gap: 4 }}>
				<NumberFormField<TTable>
					sx={{ flex: 1 }}
					name="tableNum"
					label="Número da mesa"
					control={control}
					error={errors.tableNum}
					showSkeleton={isFetching}
					disabled={isPending}
				/>

				<NumberFormField<TTable>
					sx={{ flex: 1 }}
					name="seatNum"
					label="Número de assentos"
					control={control}
					error={errors.seatNum}
					showSkeleton={isFetching}
					disabled={isPending}
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
					showSkeleton={isFetching}
				/>
			</Box>

			<Box
				sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}
			>
				<LoadingButton
					variant="contained"
					size="large"
					type="submit"
					loading={isPending}
				>
					Salvar
				</LoadingButton>
			</Box>
		</PageContainer>
	);
}
