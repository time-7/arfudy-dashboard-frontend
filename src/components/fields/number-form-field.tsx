import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import SkeletonFormField from '../skeletons/skeleton-form-field';

import { SxProps, TextField } from '@mui/material';

type TInputField<TFieldValues extends FieldValues> = {
  label: string;
  error?: FieldError;
  name: Path<TFieldValues>;
  control: Control<TFieldValues, unknown>;
  sx?: SxProps;
  showSkeleton?: boolean;
  isSubmitting: boolean;
  suffix?: string;
  prefix?: string;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
};

export default function NumberFormField<TFieldValues extends FieldValues>({
  control,
  sx,
  name,
  label,
  error,
  showSkeleton,
  suffix,
  isSubmitting,
  decimalScale,
  fixedDecimalScale,
  prefix,
}: TInputField<TFieldValues>) {
  if (showSkeleton) {
    return <SkeletonFormField />;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <NumericFormat
          size="small"
          disabled={isSubmitting}
          suffix={suffix}
          prefix={prefix}
          value={value}
          label={label}
          decimalScale={decimalScale}
          fixedDecimalScale={fixedDecimalScale}
          decimalSeparator=","
          variant="filled"
          sx={sx}
          error={!!error}
          helperText={error ? error?.message : ''}
          onValueChange={(values) => onChange(values.floatValue)}
          customInput={TextField}
        />
      )}
    />
  );
}
