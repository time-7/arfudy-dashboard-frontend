'use client';

import { useTableContext } from '../../contexts/table-context';
import TableList from '../list/table-list';
import TableViewContent from './table-view-content';
import TableViewHeader from './table-view-header';

export default function TableView() {
    const { tableView, showTables } = useTableContext();

    if (!tableView) return;

    return (
        <div className="flex h-1 flex-1 gap-4">
            {showTables && (
                <TableList className="hidden max-w-96 lg:grid lg:grid-cols-1 xl:grid-cols-1" />
            )}

            <div className="flex-1 overflow-auto rounded-xl border">
                <TableViewHeader />

                <TableViewContent />
            </div>
        </div>
    );
}
