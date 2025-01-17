'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { produtoSchema } from '@/utils/validators';

import { useProductContext } from '../../contexts/product-context';

export default function ProductEditContent() {
    const { productEdit } = useProductContext();

    const form = useForm<z.infer<typeof produtoSchema>>({
        resolver: zodResolver(produtoSchema),
        defaultValues: {
            ...productEdit
        }
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof produtoSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    if (!productEdit) return;

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-1 flex-col gap-3 overflow-y-auto p-3"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>

                            <FormControl>
                                <Input placeholder="produto" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="produto com ingreditene x,y e z"
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
                            <FormLabel>Descrição</FormLabel>

                            <FormControl>
                                <Input placeholder="R$ 12,34" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="sticky bottom-0 -mx-3 mt-auto">
                    <div className="mt-auto flex items-center justify-end px-3">
                        <Button
                            variant="secondary"
                            type="submit"
                            className="bg-primary font-bold text-white shadow-xl transition-opacity hover:bg-primary hover:opacity-90"
                        >
                            <Save /> Salvar
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
