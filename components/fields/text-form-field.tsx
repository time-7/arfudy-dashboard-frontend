import {
	Control,
	Controller,
	FieldError,
	FieldValues,
	Path
} from 'react-hook-form';

import SkeletonFormField from '../skeletons/skeleton-form-field';

import { SxProps, TextField } from '@mui/material';

type TInputField<TFieldValues extends FieldValues> = {
	label: string;
	error?: FieldError;
	name: Path<TFieldValues>;
	control: Control<TFieldValues, unknown>;
	sx?: SxProps;
	showSkeleton?: boolean;
	disabled?: boolean;
};

export default function TextFormField<TFieldValues extends FieldValues>({
	control,
	sx,
	name,
	label,
	error,
	showSkeleton,
	disabled
}: TInputField<TFieldValues>) {
	if (showSkeleton) {
		return <SkeletonFormField />;
	}

	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value } }) => (
				<TextField
					size="small"
					sx={sx}
					variant="filled"
					disabled={disabled}
					label={label}
					value={value || null}
					error={!!error}
					helperText={error ? error?.message : ''}
					onChange={(e) => onChange(e.target.value)}
				/>
			)}
		/>
	);
}
