import { Control, Controller, FieldValues, Path } from 'react-hook-form';

import { Checkbox, FormControlLabel } from '@mui/material';

type TInputField<TFieldValues extends FieldValues> = {
  label: string;
  name: Path<TFieldValues>;
  control: Control<TFieldValues, unknown>;
};

export default function CheckboxFormField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
}: TInputField<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          label={label}
          defaultChecked
          control={<Checkbox value={value} onChange={onChange} />}
        />
      )}
    />
  );
}
