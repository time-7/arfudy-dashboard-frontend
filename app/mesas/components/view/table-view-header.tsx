'use client';

import { Pencil, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useTableContext } from '../../contexts/table-context';

export default function TableViewHeader() {
    const { tableView, setTableView, setTableEdit } = useTableContext();

    if (!tableView) return;

    return (
        <div className="flex h-12 items-center justify-between bg-primary px-4">
            <h2 className="text-md flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-[48px] text-white">
                Mesa {tableView.tableNum}
            </h2>

            <div className="flex gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-primary [&_svg]:size-5"
                    onClick={() => {
                        setTableView(null);

                        setTableEdit(tableView);
                    }}
                >
                    <Pencil color="white" />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    className="h hover:bg-primary [&_svg]:size-6"
                    onClick={() => setTableView(null)}
                >
                    <X color="white" />
                </Button>
            </div>
        </div>
    );
}
