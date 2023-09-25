import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

import SkeletonFormField from '../skeletons/skeleton-form-field';

import { SxProps, TextField } from '@mui/material';

type TInputField<TFieldValues extends FieldValues> = {
  label: string;
  error?: FieldError;
  name: Path<TFieldValues>;
  control: Control<TFieldValues, unknown>;
  inputType?: 'number';
  sx?: SxProps;
  showSkeleton?: boolean;
};

export default function TextFormField<TFieldValues extends FieldValues>({
  control,
  sx,
  name,
  label,
  error,
  inputType,
  showSkeleton,
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
          label={label}
          value={value || null}
          error={!!error}
          helperText={error ? error?.message : ''}
          onChange={(e) => {
            let inputValue: string | number | null = e.target.value;

            if (inputType === 'number') {
              // Remova todos os caracteres não numéricos
              inputValue = inputValue.replace(/[^0-9]/g, '');
              // Converte para número ou null
              inputValue = inputValue === '' ? null : parseInt(inputValue);
            }

            onChange(inputValue);
          }}
        />
      )}
    />
  );
}
