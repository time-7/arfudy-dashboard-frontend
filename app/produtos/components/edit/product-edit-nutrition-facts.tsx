'use client';

import { useFormContext } from 'react-hook-form';

import FormRow from '@/components/form/form-row';
import FormSubTitle from '@/components/form/form-subtitle';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export default function ProductEditNutritionFacts() {
    const { control } = useFormContext();

    return (
        <>
            <FormSubTitle>Informações nutricionais</FormSubTitle>

            <FormRow>
                <FormField
                    control={control}
                    name="nutritionFacts.protein"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Proteínas (g)</FormLabel>

                            <FormControl>
                                <Input placeholder="50 g" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="nutritionFacts.carbohydrate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Carboidratos (g)</FormLabel>

                            <FormControl>
                                <Input placeholder="50 g" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="nutritionFacts.totalFat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gorduras totais (g)</FormLabel>

                            <FormControl>
                                <Input placeholder="50 g" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="nutritionFacts.totalCalories"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Calorías totais (kcal)</FormLabel>

                            <FormControl>
                                <Input placeholder="100 kcal" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </FormRow>
        </>
    );
}
