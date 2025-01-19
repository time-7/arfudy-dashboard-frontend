'use client';

import TableContainer from './components/table-container';
import TableHeader from './components/table-header';
import { TableProvider } from './contexts/table-context';

export default function TablePage() {
    return (
        <TableProvider>
            <TableHeader />

            <TableContainer />
        </TableProvider>
    );
}
