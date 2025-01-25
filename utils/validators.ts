import { z } from 'zod';

import { messages } from '@/utils/messages';

const { required, url } = messages;

const nutritionFactsZod = z.object({
    carbohydrate: z.number().nullish(),
    protein: z.number().nullish(),
    totalFat: z.number().nullish(),
    totalCalories: z.number().nullish()
});

export const ingredientZod = z.object({
    name: z
        .string({ required_error: required })
        .min(3, 'O campo deve ter no mínimo 3 caracteres'),
    quantity: z.number({
        required_error: required,
        invalid_type_error: required
    }),
    nutritionFacts: nutritionFactsZod
        .refine((data) => data.carbohydrate, {
            message: required,
            path: ['carbohydrate']
        })
        .refine((data) => data.protein, {
            message: required,
            path: ['protein']
        })
        .refine((data) => data.totalFat, {
            message: required,
            path: ['totalFat']
        })
});

export type TIngredient = z.infer<typeof ingredientZod>;

export const produtoSchema = z
    .object({
        id: z.string().optional(),
        name: z
            .string({ required_error: required })
            .min(3, 'O campo deve ter no mínimo 3 caracteres'),
        description: z.string({ required_error: required }),
        price: z
            .number({
                required_error: required,
                invalid_type_error: required
            })
            .min(0.01, 'O valor deve ser maior que 0'),
        imageUrl: z.string({ required_error: required }).url({ message: url }),
        unityModelId: z.string().nullish(),
        has3dModel: z.boolean().default(false),
        nutritionFacts: nutritionFactsZod.optional(),
        ingredients: z.array(ingredientZod).optional().default([])
    })
    .refine(
        (data) => data.ingredients?.length || data.nutritionFacts?.carbohydrate,
        {
            message: required,
            path: ['nutritionFacts.carbohydrate']
        }
    )
    .refine(
        (data) => data.ingredients?.length || data.nutritionFacts?.protein,
        {
            message: required,
            path: ['nutritionFacts.protein']
        }
    )
    .refine(
        (data) => data.ingredients?.length || data.nutritionFacts?.totalFat,
        {
            message: required,
            path: ['nutritionFacts.totalFat']
        }
    );

export type TProduct = z.infer<typeof produtoSchema>;

export const mesasFormSchema = z.object({
    id: z.string().optional(),
    activeToken: z.string().nullish(),
    tableNum: z.number({
        required_error: required,
        invalid_type_error: required
    }),
    seatNum: z.number({
        required_error: required,
        invalid_type_error: required
    })
});

export type TTable = z.infer<typeof mesasFormSchema>;
