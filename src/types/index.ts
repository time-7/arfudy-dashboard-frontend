import { pratosFormSchema, mesasFormSchema } from '@/validators';
import { z } from 'zod';

export type TRequest<TData> = {
  data: TData;
  status: number;
};

export type TRequestError = {
  message: string;
  status: number;
};

export type TPostReturn = {
  data: {
    id: string;
  };
};

export type TPratosForm = {
  params: { id: string };
};

export type TProduct = z.infer<typeof pratosFormSchema>;

export type TTable = z.infer<typeof mesasFormSchema>;

export type TForm<TData> = {
  defaultValues?: TData;
  onSubmit: (data: TData) => void;
  showSkeleton?: boolean;
  hasId: boolean;
  isSubmitting: boolean;
};
