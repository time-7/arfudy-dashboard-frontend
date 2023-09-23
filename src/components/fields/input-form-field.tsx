import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

import { SxProps, TextField } from '@mui/material';

type TInputField<TFieldValues extends FieldValues> = {
  label: string;
  error?: FieldError;
  name: Path<TFieldValues>;
  control: Control<TFieldValues, unknown>;
  inputType?: 'string' | 'number';
  sx?: SxProps;
};

export default function InputFormField<TFieldValues extends FieldValues>({
  control,
  sx,
  name,
  label,
  error,
  inputType = 'string',
}: TInputField<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          sx={sx}
          label={label}
          value={value}
          error={!!error}
          helperText={error ? error?.message : ''}
          onChange={(e) => {
            let value: string | number | null = e.target.value;

            if (inputType === 'number') {
              value = value.replace(/[^0-9]/g, '');
              value = parseInt(value);

              if (isNaN(value)) {
                value = null;
              }
            }

            onChange(value);
          }}
        />
      )}
    />
  );
}
