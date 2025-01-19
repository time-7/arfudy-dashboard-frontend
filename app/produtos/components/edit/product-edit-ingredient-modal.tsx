import { ComponentProps, Dispatch, SetStateAction } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Save } from 'lucide-react';
import { useForm, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import FormRow from '@/components/form/form-row';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ingredientZod, TIngredient } from '@/utils/validators';

type TProductEditIngredientModal = {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    ingredient: TIngredient | null;
};

export default function ProductEditIngredientModal({
    open,
    onOpenChange,
    ingredient
}: TProductEditIngredientModal) {
    const form = useFormContext();

    const formModal = useForm<TIngredient>({
        resolver: zodResolver(ingredientZod),
        values: ingredient || {
            name: '',
            quantity: 1,
            nutritionFacts: {
                protein: 0,
                carbohydrate: 0,
                totalFat: 0,
                totalCalories: 0
            }
        }
    });

    const onSubmit = (data: TIngredient) => {
        const ingredients = form.getValues('ingredients') || [];
        const newIngredients = [...ingredients, data];

        form.setValue('ingredients', newIngredients);
        form.setValue('nutritionFacts', {
            carbohydrate: null,
            protein: null,
            totalCalories: null,
            totalFat: null
        });

        form.clearErrors(['nutritionFacts']);

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal>
            <DialogContent
                aria-describedby="Modal de adição/edição de ingredientes"
                className="gap-0 overflow-hidden border-none p-0 [&>button]:text-white"
            >
                <DialogHeader className="flex h-12 bg-secondary-main px-4">
                    <DialogTitle className="leading-[48px] text-white">
                        {ingredient ? 'Editar' : 'Adicionar'} ingrediente
                    </DialogTitle>
                </DialogHeader>

                <Form {...formModal}>
                    <form
                        onSubmit={formModal.handleSubmit(onSubmit)}
                        className="flex flex-1 flex-col gap-3 overflow-y-auto p-3"
                    >
                        <FormRow>
                            <FormField
                                control={formModal.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>

                                        <FormControl>
                                            <Input
                                                placeholder="ex: Produto x"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formModal.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preço</FormLabel>

                                        <FormControl>
                                            <NumericFormat
                                                {...field}
                                                placeholder="ex: 1"
                                                decimalSeparator=","
                                                decimalScale={2}
                                                customInput={Input}
                                                onChange={() => {}}
                                                onValueChange={({
                                                    floatValue
                                                }) =>
                                                    field.onChange(floatValue)
                                                }
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </FormRow>

                        <FormRow>
                            <FormField
                                name="nutritionFacts.protein"
                                control={formModal.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Proteínas (g)</FormLabel>

                                        <FormControl>
                                            <NumericFormat
                                                {...field}
                                                suffix=" g"
                                                placeholder="ex: 50 g"
                                                decimalScale={2}
                                                decimalSeparator=","
                                                customInput={Input}
                                                onChange={() => {}}
                                                onValueChange={({
                                                    floatValue
                                                }) =>
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
                                control={formModal.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Carboidratos (g)</FormLabel>

                                        <FormControl>
                                            <NumericFormat
                                                {...field}
                                                suffix=" g"
                                                placeholder="ex: 50 g"
                                                decimalScale={2}
                                                decimalSeparator=","
                                                customInput={Input}
                                                onChange={() => {}}
                                                onValueChange={({
                                                    floatValue
                                                }) =>
                                                    field.onChange(floatValue)
                                                }
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </FormRow>

                        <FormRow>
                            <FormField
                                name="nutritionFacts.totalFat"
                                control={formModal.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Gorduras totais (g)
                                        </FormLabel>

                                        <FormControl>
                                            <NumericFormat
                                                {...field}
                                                suffix=" g"
                                                placeholder="ex: 50 g"
                                                decimalScale={2}
                                                decimalSeparator=","
                                                customInput={Input}
                                                onChange={() => {}}
                                                onValueChange={({
                                                    floatValue
                                                }) =>
                                                    field.onChange(floatValue)
                                                }
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formModal.control}
                                name="nutritionFacts.totalCalories"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Calorías totais (kcal)
                                        </FormLabel>

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

                        <DialogFooter className="justify-end">
                            <Button
                                type="submit"
                                variant="secondary"
                                className='hover:opacity-90" bg-primary font-bold text-white shadow-2xl shadow-primary transition-all hover:scale-105 hover:bg-primary'
                            >
                                <Save />
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
