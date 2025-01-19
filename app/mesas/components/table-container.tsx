'use client';

import Loading from '@/components/loader';

import { useTableContext } from '../contexts/table-context';
import TableList from './list/table-list';
import TableView from './view/table-view';

// import ProductEdit from './edit/product-edit';

// import ProductView from './view/product-view';

export default function TableContainer() {
    const { isFetching, tableView, tableEdit } = useTableContext();

    if (isFetching) return <Loading />;

    // if (productEdit) return <ProductEdit />;

    if (tableView) return <TableView />;

    return <TableList />;
}
