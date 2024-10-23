import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import SkeletonFormField from '../skeletons/skeleton-form-field';

import { Checkbox, FormControlLabel } from '@mui/material';

type TInputField<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues, unknown>;
  showSkeleton?: boolean;
  disabled?: boolean;
};

export default function CheckboxFormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  showSkeleton,
  disabled,
}: TInputField<TFieldValues>) {
  if (showSkeleton) {
    return <SkeletonFormField />;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          label={label}
          disabled={disabled}
          control={<Checkbox value={value} onChange={onChange} />}
        />
      )}
    />
  );
}
