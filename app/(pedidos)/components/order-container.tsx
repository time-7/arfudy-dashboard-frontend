'use client';

import { useDroppable } from '@dnd-kit/core';

import Loading from '@/components/loader';
import { cn } from '@/lib/utils';

import { useOrderContext } from '../contexts/order-context';
import { useFilteredOrders } from '../hooks/use-filtered-orders';
import { TOrderStatus } from '../types';
import OrderCard from './order-card';

type TOrderContainer = {
    title: string;
    orderStatus: TOrderStatus;
    backgroundColor: string;
};

export default function OrderContainer({
    title,
    orderStatus,
    backgroundColor
}: TOrderContainer) {
    const { isFetching } = useOrderContext();
    const { groupedOrders } = useFilteredOrders({ orderStatus });

    const { setNodeRef } = useDroppable({
        id: orderStatus
    });

    return (
        <div
            ref={setNodeRef}
            className="flex flex-1 flex-col rounded-xl shadow-sm"
        >
            <div
                className={cn(
                    'text-md h-10 rounded-t-xl text-center font-semibold leading-10 text-white',
                    backgroundColor
                )}
            >
                {title}
            </div>

            <div className="flex flex-1 flex-col gap-4 rounded-b-xl border p-2">
                {isFetching && <Loading />}

                {!isFetching && groupedOrders.length === 0 && (
                    <div className="flex flex-1 items-center justify-center text-gray-400">
                        Sem pedidos
                    </div>
                )}

                {!isFetching &&
                    groupedOrders.map((order, index) => (
                        <OrderCard key={index} orders={order} />
                    ))}
            </div>
        </div>
    );
}
