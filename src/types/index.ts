import { pratosFormSchema } from '@/validators';
import { z } from 'zod';

export type TRequest<TData> = {
  data: TData;
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
