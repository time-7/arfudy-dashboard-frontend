'use client';

import { Loader } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

import { useTableContext } from '../../contexts/table-context';
import { useQueryTableOrders } from '../../hooks/use-query-table-orders';

export default function TableViewTable() {
    const { tableView } = useTableContext();

    const { data: orders = [], isFetching } = useQueryTableOrders({
        id: tableView?.id as string
    });

    console.log(orders);
    if (!tableView) return;

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">Pedidos</p>

            <div className="rounded-xl border">
                <Table>
                    <TableHeader className="">
                        <TableRow>
                            <TableHead>Produto</TableHead>

                            <TableHead className="text-right">
                                Quantidade
                            </TableHead>

                            <TableHead>Cliente</TableHead>

                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {orders.length > 0 &&
                            orders.flat().map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {order.product.name}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        {order.product.quantity} un
                                    </TableCell>

                                    <TableCell>{order.clientName}</TableCell>

                                    <TableCell>
                                        {order.product.status}
                                    </TableCell>
                                </TableRow>
                            ))}

                        {orders.length === 0 && (
                            <TableRow>
                                <TableCell className="col-auto flex h-24 flex-1 items-center justify-center">
                                    {isFetching ? (
                                        <Loader className="animate-spin" />
                                    ) : (
                                        'Sem registros'
                                    )}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
