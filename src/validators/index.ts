import { messages } from '@/utils/messages';
import { z } from 'zod';

const { noempty, required, url } = messages;

const nutritionFactsZod = z.object({
  carbohydrate: z.number({ required_error: required }),
  protein: z.number({ required_error: required }),
  totalFat: z.number({ required_error: required }),
  totalCalories: z.number().optional(),
});

export const pratosFormSchema = z.object({
  id: z.string().optional(),
  name: z.string({ required_error: required }).nonempty(noempty),
  description: z.string({ required_error: required }).nonempty(noempty),
  price: z.number({ required_error: required, invalid_type_error: required }),
  imageUrl: z.string({ required_error: required }).url(url).nonempty(noempty),
  unityModelId: z.string().nullish(),
  has3dModel: z.boolean().default(false),
  nutritionFacts: nutritionFactsZod,
  ingredients: z
    .array(
      z.object({
        name: z.string().nonempty(),
        quantity: z.number(),
        nutritionFacts: nutritionFactsZod,
      }),
    )
    .optional()
    .default([]),
});

export const mesasFormSchema = z.object({
  id: z.string().optional(),
  activeToken: z.string().optional(),
  tableNum: z.number({
    required_error: required,
    invalid_type_error: required,
  }),
  seatNum: z.number({
    required_error: required,
    invalid_type_error: required,
  }),
});
