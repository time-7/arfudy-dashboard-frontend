'use client';

import Loading from '@/components/loader';

import { useTableContext } from '../contexts/table-context';
import TableEdit from './edit/table-edit';
import TableList from './list/table-list';
import TableView from './view/table-view';

export default function TableContainer() {
    const { isFetching, tableView, tableEdit } = useTableContext();

    if (isFetching) return <Loading />;

    if (tableEdit) return <TableEdit />;

    if (tableView) return <TableView />;

    return <TableList />;
}
