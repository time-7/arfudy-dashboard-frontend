'use client';

import { Eye, Pencil, Trash } from 'lucide-react';

import { useTableContext } from '@/app/mesas/contexts/table-context';
import { Button } from '@/components/ui/button';
import { TTable } from '@/utils/validators';

import { useDeleteTable } from '../../hooks/use-delete-table';

export default function TableCard({ table }: { table: TTable }) {
    const { setTableView, setTableEdit } = useTableContext();
    const { mutate, isPending } = useDeleteTable();

    return (
        <div className="flex overflow-hidden rounded-lg border shadow-sm transition-all">
            <div className="w-2 bg-primary" />

            <div className="flex min-w-0 flex-1 flex-col px-3 py-2">
                <div className="flex items-center gap-2">
                    <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                        Mesa {table.tableNum}
                    </div>

                    <div className="flex gap-1">
                        <Button
                            size="icon"
                            variant="ghost"
                            disabled={isPending}
                            onClick={() => {
                                setTableView(table);
                                setTableEdit(null);
                            }}
                        >
                            <Eye className="h-5 w-5" />
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            disabled={isPending}
                            onClick={() => {
                                setTableEdit(table);
                                setTableView(null);
                            }}
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                            size="icon"
                            variant="ghost"
                            disabled={isPending}
                            onClick={() => mutate(table)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-600">
                        {table.seatNum} assento(s)
                    </div>
                </div>
            </div>
        </div>
    );
}
