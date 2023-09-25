import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Checkbox, FormControlLabel } from '@mui/material';
import SkeletonFormField from '../skeletons/skeleton-form-field';

type TInputField<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues, unknown>;
  showSkeleton?: boolean;
  isSubmitting: boolean;
};

export default function CheckboxFormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  showSkeleton,
  isSubmitting,
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
          disabled={isSubmitting}
          control={<Checkbox value={value} onChange={onChange} />}
        />
      )}
    />
  );
}
