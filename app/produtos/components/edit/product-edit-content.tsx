'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormRow from '@/components/form/form-row';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { produtoSchema, TIngredient } from '@/utils/validators';

import { useProductContext } from '../../contexts/product-context';
import ProductEditFooter from './product-edit-footer';
import ProductEditIngredients from './product-edit-ingredients';
import ProductEditNutritionFacts from './product-edit-nutrition-facts';

export default function ProductEditContent() {
    const { productEdit } = useProductContext();

    const form = useForm<z.infer<typeof produtoSchema>>({
        resolver: zodResolver(produtoSchema),
        defaultValues: {
            ...productEdit
        }
    });

    function onSubmit(values: z.infer<typeof produtoSchema>) {
        console.log(values);
    }

    useEffect(() => {
        if (productEdit) {
            form.reset(productEdit);
        }
    }, [productEdit]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-1 flex-col gap-3 overflow-y-auto p-3"
            >
                <FormRow>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>

                                <FormControl>
                                    <Input placeholder="Produto x" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Preço</FormLabel>

                                <FormControl>
                                    <Input placeholder="R$ 12,34" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormRow>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>

                            <FormControl>
                                <Textarea
                                    placeholder="Produto com ingredientes x, y e z"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormRow flexItems={false}>
                    <Button variant="secondary" className="mt-[32px] w-64">
                        <ImageUp /> Importar imagem
                    </Button>

                    <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>URL da imagem</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="https://minha-imagem.jpg"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormRow>

                <FormRow flexItems={false}>
                    <FormField
                        control={form.control}
                        name="has3dModel"
                        render={({ field }) => (
                            <FormItem className="mt-10 flex flex-row items-start gap-3 space-y-0 rounded-md">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>

                                <FormLabel className="leading-4">
                                    Possui modelo 3D
                                </FormLabel>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        disabled={!form.watch('has3dModel')}
                        name="unityModelId"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Código do modelo Unity</FormLabel>

                                <FormControl>
                                    <Input placeholder="12345678" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </FormRow>

                <ProductEditNutritionFacts />

                <ProductEditIngredients />

                <ProductEditFooter />
            </form>
        </Form>
    );
}

// const { mutate, isPending } = useMutation<
//     AxiosResponse<TPostReturn<TProduct>>,
//     AxiosError<TRequestError>,
//     TProduct
//   >({
//     mutationFn: (data) => {
//       const formattedData = formatData(data);

//       return hasId
//         ? Api.patch(`/products/${id.at(0)}`, formattedData)
//         : Api.post('/products', formattedData);
//     },
//     onSuccess: ({ data: responseData }) => {
//       const { data, message } = responseData;

//       if (!hasId) {
//         const { id } = data;

//         router.push(`/pratos/form/${id}`);
//       } else {
//         setFormData(data);
//       }

//       enqueueSnackbar(message, { variant: 'success' });
//     },
//     onError: (error) => {
//       enqueueSnackbar(
//         error?.response?.data.message || 'Falha ao salvar a mesa',
//         {
//           variant: 'error',
//         },
//       );
//     },
//   });
