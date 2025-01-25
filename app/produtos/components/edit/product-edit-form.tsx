'use client';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

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
import UploadImageButton from '@/components/upload-image-button';
import { produtoSchema, TProduct } from '@/utils/validators';

import { useProductContext } from '../../contexts/product-context';
import { useMutateProduct } from '../../hooks/use-mutate-product';
import ProductEditFooter from './product-edit-footer';
import ProductEditIngredients from './product-edit-ingredients';
import ProductEditNutritionFacts from './product-edit-nutrition-facts';

export default function ProductEditForm() {
    const { productEdit } = useProductContext();
    const { mutate, isPending } = useMutateProduct();

    const form = useForm<TProduct>({
        resolver: zodResolver(produtoSchema),
        values: productEdit as TProduct,
        disabled: isPending
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => mutate(values))}
                className="flex flex-1 flex-col gap-3 overflow-y-auto p-3"
            >
                <div className="flex flex-col gap-3 md:flex-row">
                    <div className="flex flex-1 flex-col gap-3">
                        <FormRow>
                            <FormField
                                control={form.control}
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
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preço</FormLabel>

                                        <FormControl>
                                            <NumericFormat
                                                {...field}
                                                prefix="R$ "
                                                placeholder="ex: R$ 12,34"
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

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>

                                    <FormControl>
                                        <Textarea
                                            placeholder="ex: Produto com ingredientes x, y e z"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormRow flexItems={false}>
                            <FormField
                                control={form.control}
                                name="has3dModel"
                                disabled={isPending}
                                render={({ field }) => (
                                    <FormItem className="mt-10 flex flex-row items-start gap-3 space-y-0 rounded-md">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(value) => {
                                                    field.onChange(value);

                                                    if (!value) {
                                                        form.setValue(
                                                            'unityModelId',
                                                            ''
                                                        );
                                                    }
                                                }}
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
                                name="unityModelId"
                                disabled={!form.watch('has3dModel')}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>
                                            Código do modelo Unity
                                        </FormLabel>

                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="ex: 12345678"
                                                value={field.value || ''}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </FormRow>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="relative flex size-[204px] rounded-xl border overflow-hidden">
                            {form.watch('imageUrl') && (
                                <Image
                                    fill
                                    src={form.watch('imageUrl')}
                                    alt="Imagem do produto"
                                    style={{
                                        objectFit: 'cover'
                                    }}
                                />
                            )}

                            {!form.watch('imageUrl') && (
                                <ImageOff
                                    size={36}
                                    className="m-auto text-gray-400"
                                />
                            )}
                        </div>

                        <UploadImageButton
                            variant="secondary"
                            className="w-[204px]"
                            setImage={(url) => form.setValue('imageUrl', url)}
                        />
                    </div>
                </div>
                <ProductEditNutritionFacts />

                <ProductEditIngredients />

                <ProductEditFooter isPending={isPending} />
            </form>
        </Form>
    );
}
