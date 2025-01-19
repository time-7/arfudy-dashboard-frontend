'use client';

import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { useTableContext } from '../../contexts/table-context';
import TableCard from './table-card';

type TTableList = {
    className?: ComponentProps<'div'>['className'];
};

export default function TableList({ className }: TTableList) {
    const { tables } = useTableContext();

    return (
        <div
            className={cn(
                'grid flex-1 auto-rows-min grid-cols-1 gap-3 overflow-y-auto rounded-xl border p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
                className
            )}
        >
            {tables.map((table) => (
                <TableCard key={table.id} table={table} />
            ))}

            {tables.length === 0 && (
                <div className="flex flex-1 items-center justify-center text-gray-400">
                    Nenhum produto encontrado
                </div>
            )}
        </div>
    );
}
