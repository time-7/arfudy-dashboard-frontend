'use client';

import { useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

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
    const { control, watch } = useFormContext();

    return (
        <>
            <FormSubTitle>Informações nutricionais</FormSubTitle>

            <FormRow>
                <FormField
                    name="nutritionFacts.protein"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Proteínas (g)</FormLabel>

                            <FormControl>
                                <NumericFormat
                                    {...field}
                                    suffix=" g"
                                    placeholder="50 g"
                                    decimalScale={2}
                                    decimalSeparator=","
                                    customInput={Input}
                                    disabled={watch('ingredients').length}
                                    onChange={() => {}}
                                    onValueChange={({ floatValue }) =>
                                        field.onChange(floatValue)
                                    }
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="nutritionFacts.carbohydrate"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Carboidratos (g)</FormLabel>

                            <FormControl>
                                <NumericFormat
                                    {...field}
                                    suffix=" g"
                                    placeholder="50 g"
                                    decimalScale={2}
                                    decimalSeparator=","
                                    customInput={Input}
                                    disabled={watch('ingredients').length}
                                    onChange={() => {}}
                                    onValueChange={({ floatValue }) =>
                                        field.onChange(floatValue)
                                    }
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="nutritionFacts.totalFat"
                    control={control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Gorduras totais (g)</FormLabel>

                            <FormControl>
                                <NumericFormat
                                    {...field}
                                    suffix=" g"
                                    placeholder="50 g"
                                    decimalScale={2}
                                    decimalSeparator=","
                                    customInput={Input}
                                    disabled={watch('ingredients').length}
                                    onChange={() => {}}
                                    onValueChange={({ floatValue }) =>
                                        field.onChange(floatValue)
                                    }
                                />
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
                                <NumericFormat
                                    disabled
                                    suffix=" kcal"
                                    decimalScale={2}
                                    decimalSeparator=","
                                    customInput={Input}
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
            </FormRow>
        </>
    );
}
