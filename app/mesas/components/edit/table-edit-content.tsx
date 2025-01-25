'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import FormRow from '@/components/form/form-row';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { mesasFormSchema, TTable } from '@/utils/validators';

import { useTableContext } from '../../contexts/table-context';
import { useMutateTable } from '../../hooks/use-mutate-table';
import TableEditFooter from './table-edit-footer';

export default function TableEditContent() {
    const { tableEdit } = useTableContext();
    const { mutate, isPending } = useMutateTable();

    const form = useForm<TTable>({
        resolver: zodResolver(mesasFormSchema),
        values: tableEdit as TTable,
        disabled: isPending
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) => mutate(values))}
                className="flex flex-1 flex-col gap-3 overflow-y-auto p-3"
            >
                <FormRow>
                    <FormField
                        control={form.control}
                        name="tableNum"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mesa</FormLabel>

                                <FormControl>
                                    <NumericFormat
                                        {...field}
                                        placeholder="ex: 1"
                                        decimalScale={0}
                                        customInput={Input}
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
                        control={form.control}
                        name="seatNum"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número de lugares</FormLabel>

                                <FormControl>
                                    <NumericFormat
                                        {...field}
                                        placeholder="ex: 5"
                                        decimalScale={0}
                                        customInput={Input}
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
                </FormRow>

                <FormField
                    disabled
                    control={form.control}
                    name="activeToken"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Token</FormLabel>

                            <FormControl>
                                <Input {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <TableEditFooter isPending={isPending} />
            </form>
        </Form>
    );
}
