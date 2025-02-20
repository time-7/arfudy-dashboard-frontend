'use client';

import { ComponentProps } from 'react';

import { useDebounce } from '@uidotdev/usehooks';

import { cn } from '@/lib/utils';

import { useTableContext } from '../../contexts/table-context';
import TableCard from './table-card';

type TTableList = {
    className?: ComponentProps<'div'>['className'];
};

export default function TableList({ className }: TTableList) {
    const { tables, search } = useTableContext();
    const debouncedSearch = useDebounce(search, 500);
    const filteredTables = tables.filter(
        (item) =>
            debouncedSearch === '' || item.tableNum === Number(debouncedSearch)
    );

    return (
        <div
            className={cn(
                'grid flex-1 auto-rows-min grid-cols-1 gap-3 overflow-y-auto rounded-xl border p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
                className
            )}
        >
            {filteredTables.map((table) => (
                <TableCard key={table.id} table={table} />
            ))}

            {(tables.length === 0 || filteredTables.length === 0) && (
                <div className="col-span-full flex h-full flex-1 items-center justify-center text-gray-400">
                    Nenhum produto encontrado
                </div>
            )}
        </div>
    );
}
