'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Image, ImageUp, Plus, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { produtoSchema } from '@/utils/validators';

import { useProductContext } from '../../contexts/product-context';
import ProductEditTable from './product-edit-table';

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

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-1 flex-col gap-3 overflow-y-auto p-3"
            >
                <div className="flex gap-3 [&>div]:flex-1">
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
                </div>

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

                <div className="flex gap-3">
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
                </div>

                <div className="flex gap-3">
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
                </div>

                <h2 className="mt-2 text-lg font-bold">
                    Informações nutricionais
                </h2>

                <div className="flex gap-3 [&>div]:flex-1">
                    <FormField
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
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
                </div>

                <div className="flex items-center justify-between">
                    <h2 className="mt-2 text-lg font-bold">Ingredientes</h2>

                    <Button variant="secondary" >
                        <Plus /> Adicionar ingrediente
                    </Button>
                </div>

                <ProductEditTable />

                <div className="sticky bottom-0 -mx-3 mt-auto">
                    <div className="mt-auto flex items-center justify-end px-3">
                        <Button
                            variant="secondary"
                            type="submit"
                            className="bg-primary font-bold text-white shadow-2xl shadow-primary transition-opacity hover:bg-primary hover:opacity-90"
                        >
                            <Save /> Salvar
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
