'use client';

import { Eye, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useTableContext } from '../../contexts/table-context';

export default function TableEditHeader() {
    const { tableEdit, setTableView, setTableEdit } = useTableContext();

    if (!tableEdit) return;

    console.log(tableEdit);

    return (
        <div className="flex h-12 items-center justify-between bg-primary px-4">
            <h2 className="text-md flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-[48px] text-white">
                {tableEdit.id
                    ? 'Editando mesa ' + tableEdit.tableNum
                    : 'Nova mesa'}
            </h2>

            <div className="flex gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-primary [&_svg]:size-5"
                    onClick={() => {
                        setTableEdit(null);

                        setTableView(tableEdit);
                    }}
                >
                    <Eye color="white" />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-primary [&_svg]:size-6"
                    onClick={() => setTableEdit(null)}
                >
                    <X color="white" />
                </Button>
            </div>
        </div>
    );
}
