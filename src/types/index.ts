import { pratosFormSchema, mesasFormSchema, ingredientZod } from '@/validators';
import { z } from 'zod';

export type TGet<TData> = {
  data: TData;
};

export type TRequestError = {
  message: string;
  status: number;
};

export type TPratosForm = {
  params: { id: string[] };
};

export type TProduct = z.infer<typeof pratosFormSchema>;

export type TTable = z.infer<typeof mesasFormSchema>;

export type TIngredient = z.infer<typeof ingredientZod>;

export type TPatch<TData> = {
  data: TData;
  id: string;
};

export type TPost<TPost> = {
  data: TPost;
};

export type TForm<TData> = {
  defaultValues?: TData;
  showSkeleton?: boolean;
  id: string | null;
};

export type TPostReturn = {
  message: string;
  data: {
    id: string;
  };
};

export type TPatchReturn = {
  message: string;
};
