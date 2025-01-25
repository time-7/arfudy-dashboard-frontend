import { ComponentProps, Dispatch, SetStateAction, useEffect } from 'react';

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
import { ingredientZod, TIngredient, TProduct } from '@/utils/validators';

type TProductEditIngredientModal = {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    ingredientId: string | null;
};

export default function ProductEditIngredientModal({
    open,
    onOpenChange,
    ingredientId
}: TProductEditIngredientModal) {
    const form = useFormContext<TProduct>();

    /**
     * Retorna os valores do ingrediente a ser editado/adicionado.
     */
    const getValues = () => {
        if (ingredientId) {
            return form.getValues('ingredients')[Number(ingredientId)];
        }

        return {
            name: '',
            quantity: 1,
            nutritionFacts: {
                protein: 0,
                carbohydrate: 0,
                totalFat: 0,
                totalCalories: 0
            }
        };
    };

    const formModal = useForm<TIngredient>({
        resolver: zodResolver(ingredientZod),
        values: getValues()
    });

    /**
     * Ao editar um ingrediente, atualiza o mesmo na lista de ingredientes.
     */
    const onEditIngredient = (data: TIngredient) => {
        const ingredients = form.getValues('ingredients');

        const newIngredients = ingredients.map((ingredient, index) =>
            index === Number(ingredientId) ? data : ingredient
        );

        form.setValue('ingredients', newIngredients);

        onOpenChange(false);
    };

    /**
     * Ao adicionar um ingrediente, adiciona o mesmo na lista de ingredientes.
     */
    const onAddIngredient = (data: TIngredient) => {
        const ingredients = form.getValues('ingredients');
        const newIngredients = [...ingredients, data];

        form.setValue('nutritionFacts', {
            carbohydrate: 0,
            protein: 0,
            totalCalories: 0,
            totalFat: 0
        });

        form.setValue('ingredients', newIngredients);

        form.clearErrors(['nutritionFacts']);

        onOpenChange(false);
    };

    const onSubmit = (data: TIngredient) => {
        if (ingredientId) {
            onEditIngredient(data);
        } else {
            onAddIngredient(data);
        }
    };

    useEffect(() => {
        if (!open) {
            formModal.reset();
            formModal.clearErrors();
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal>
            <DialogContent
                aria-describedby="Modal de adição/edição de ingredientes"
                className="gap-0 overflow-hidden border-none p-0 [&>button]:right-4 [&>button]:top-[10px] [&>button]:text-white"
            >
                <DialogHeader className="flex bg-secondary-main p-3">
                    <DialogTitle className="text-white">
                        {ingredientId ? 'Editar' : 'Adicionar'} ingrediente
                    </DialogTitle>
                </DialogHeader>

                <Form {...formModal}>
                    <form className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
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
                                        <FormLabel>Quantidade</FormLabel>

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

                        <DialogFooter className="justify-end gap-4 sm:space-x-0">
                            <Button
                                variant="secondary"
                                onClick={() => onOpenChange(false)}
                            >
                                Fechar
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                className="bg-primary font-bold text-white shadow-2xl shadow-primary transition-all hover:scale-105 hover:bg-primary hover:opacity-90"
                                onClick={() =>
                                    formModal.handleSubmit(onSubmit)()
                                }
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
