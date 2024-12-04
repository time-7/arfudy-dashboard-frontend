'use client';

import { DragEndEvent } from '@dnd-kit/core';

import { useOrderContext } from '../contexts/order-context';
import { TOrderStatus } from '../types';
import { useMutateOrder } from './use-mutate-order';

export function useDrag() {
    const { mutate } = useMutateOrder();
    const { setOrders } = useOrderContext();

    /**
     * Atualiza o status do pedido informado.
     */
    const updateOrderStatus = (orderId: string, orderStatus: TOrderStatus) => {
        setOrders((orders) =>
            orders.map((order) => {
                const isSameOrder = order.id === orderId;

                if (isSameOrder) {
                    return {
                        ...order,
                        product: { ...order.product, status: orderStatus }
                    };
                }

                return order;
            })
        );
    };

    /**
     * Ação ao soltar o pedido.
     * Atualiza o status do pedido e envia a requisição para o servidor.
     */
    const handleDragEnd = (event: DragEndEvent) => {
        if (!event.over) return;

        debugger;

        updateOrderStatus(
            event.active.id as string,
            event.over.id as TOrderStatus
        );

        mutate({
            orderId: event.active.data?.current?.id as string,
            productId: event.active.data?.current?.product.id as string,
            status: event.active.data?.current?.product.status as TOrderStatus
        });
    };

    return { handleDragEnd };
}
