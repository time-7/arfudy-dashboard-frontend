'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ConfirmModal from '../modal/confirm-modal';

import { Api } from '@/lib/axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

type DataGridActionButtons = {
	editRoute?: string;
	deleteUrl?: string;
	onEdit?: () => void;
	onDelete?: () => void;
};

export default function DataGridActionButtons({
	editRoute = '',
	deleteUrl = '',
	onDelete,
	onEdit
}: DataGridActionButtons) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = useState<boolean>(false);

	const { mutate, isPending } = useMutation({
		mutationFn: () => Api.delete(deleteUrl),
		onSuccess: () => {
			enqueueSnackbar('Deletadoooo', { variant: 'success' });

			queryClient.invalidateQueries({ queryKey: ['getProductList'] });

			setOpen(false);
		}
	});

	return (
		<>
			<ConfirmModal
				open={open}
				setOpen={setOpen}
				handleConfirm={() => {
					if (onDelete) {
						onDelete();

						setOpen(false);
					} else if (deleteUrl) {
						mutate();
					}
				}}
				text="Você tem certeza que deseja excluir esse item?"
				title="Confirmação"
				loading={isPending}
			/>

			<Box sx={{ display: 'flex' }}>
				<Tooltip title="Editar">
					<IconButton
						onClick={() =>
							onEdit
								? onEdit()
								: editRoute && router.push(editRoute)
						}
					>
						<EditIcon />
					</IconButton>
				</Tooltip>

				<Tooltip title="Excluir">
					<IconButton onClick={() => setOpen(true)}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			</Box>
		</>
	);
}
