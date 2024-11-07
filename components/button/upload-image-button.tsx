'use client';

import { useState } from 'react';

import { useEdgeStore } from '@/lib/edgestore';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { LoadingButton } from '@mui/lab';
import { SxProps } from '@mui/material';
import { useSnackbar } from 'notistack';

type TUploadImageButton = {
	sx?: SxProps;
	disabled?: boolean;
	setImage: (url: string) => void;
};

export default function UploadImageButton({
	sx,
	disabled,
	setImage
}: TUploadImageButton) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { edgestore } = useEdgeStore();
	const { enqueueSnackbar } = useSnackbar();

	return (
		<LoadingButton
			startIcon={<AddPhotoAlternateOutlinedIcon />}
			loading={isLoading}
			sx={sx}
			disabled={disabled}
			component="label"
			variant="contained"
		>
			<input
				accept="image/*"
				type="file"
				hidden
				onChange={(e) => {
					const file = e.target.files?.[0];

					if (file) {
						setIsLoading(true);
						edgestore.publicFiles
							.upload({ file })
							.then((response) => {
								setImage(response.url);

								enqueueSnackbar(
									'Imagem importada com sucesso!',
									{
										variant: 'success'
									}
								);
							})
							.finally(() => setIsLoading(false));
					}
				}}
			/>
			Importar Imagem
		</LoadingButton>
	);
}
