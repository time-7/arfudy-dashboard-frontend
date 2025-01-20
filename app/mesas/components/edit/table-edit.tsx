'use client';

import { useTableContext } from '../../contexts/table-context';
import TableList from '../list/table-list';
import TableEditContent from './table-edit-content';
import TableEditHeader from './table-edit-header';

export default function TableEdit() {
    const { tableEdit, showTables } = useTableContext();

    if (!tableEdit) return;

    return (
        <div className="flex h-1 flex-1 gap-4">
            {showTables && (
                <TableList className="hidden max-w-96 lg:grid lg:grid-cols-1 xl:grid-cols-1" />
            )}

            <div className="flex flex-1 flex-col overflow-auto rounded-xl border">
                <TableEditHeader />

                <TableEditContent />
            </div>
        </div>
    );
}
