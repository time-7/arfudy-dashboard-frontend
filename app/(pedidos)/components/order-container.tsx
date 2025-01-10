'use client';

import { useDroppable } from '@dnd-kit/core';

import Loading from '@/components/loader';

import { useOrderContext } from '../contexts/order-context';
import { useFilteredOrders } from '../hooks/use-filtered-orders';
import { TOrderStatus } from '../types';
import OrderCard from './order-card';

type TOrderContainer = {
    title: string;
    orderStatus: TOrderStatus;
};

export default function OrderContainer({
    title,
    orderStatus
}: TOrderContainer) {
    const { isFetching, isFetched } = useOrderContext();
    const { groupedOrders } = useFilteredOrders({ orderStatus });

    const { setNodeRef } = useDroppable({
        id: orderStatus
    });

    return (
        <div ref={setNodeRef} className="flex flex-1 flex-col">
            <div className="text-md h-10 rounded-t-lg bg-primary text-center font-semibold leading-10 text-white">
                {title}
            </div>

            <div className="flex flex-1 flex-col gap-4 rounded-b-lg border p-2">
                {isFetching && <Loading />}

                {isFetched && groupedOrders.length === 0 && (
                    <div className="flex flex-1 items-center justify-center text-gray-400">
                        Sem pedidos
                    </div>
                )}

                {groupedOrders.map((order, index) => (
                    <OrderCard key={index} orders={order} />
                ))}
            </div>
        </div>
    );
}
