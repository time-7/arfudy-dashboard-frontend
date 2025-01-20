'use client';

import { useTableContext } from '../../contexts/table-context';
import TableViewTable from './table-view-table';

export default function TableViewContent() {
    const { tableView } = useTableContext();

    if (!tableView) return;

    return (
        <div className="flex flex-col gap-3 overflow-y-auto p-3">
            <div className="flex flex-col">
                <p className="text-sm text-gray-500">Assentos</p>

                <p className="text-lg">{tableView.seatNum}</p>
            </div>

            <TableViewTable />
        </div>
    );
}
