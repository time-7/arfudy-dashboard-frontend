'use client';

import { DragEndEvent } from '@dnd-kit/core';

import { useOrderContext } from '../contexts/order-context';
import { TOrder, TOrderStatus } from '../types';
import { useMutateOrder } from './use-mutate-order';

export function useDrag() {
    const { mutate } = useMutateOrder();
    const { setOrders } = useOrderContext();

    /**
     * Atualiza o status do pedido informado.
     */
    const updateOrderStatus = (event: DragEndEvent) => {
        const orderId = event.active.id as string;
        const orderStatus = event.over?.id as TOrderStatus;
        const ordersId = orderId.split('-');

        setOrders((orders) =>
            orders.map((order) => {
                const isSameOrder = ordersId.includes(order.id);

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
     * Envia a request salvando a atualização do status do pedido.
     */
    const mutateOrders = (event: DragEndEvent) => {
        const orderId = event.active.id as string;
        const ordersId = orderId.split('-');

        ordersId.forEach((orderId) => {
            const order = (event.active.data?.current as TOrder[]).find(
                (item) => item.id === orderId
            );
            const changedStatus = order?.product.status !== event.over?.id;

            if (order && changedStatus) {
                mutate({
                    orderId: order.id,
                    productId: order.product.id,
                    status: event.over?.id as TOrderStatus
                });
            }
        });
    };

    /**
     * Ação ao soltar o pedido.
     * Atualiza o status do pedido e envia a requisição para o servidor.
     */
    const handleDragEnd = (event: DragEndEvent) => {
        if (!event.over) return;

        updateOrderStatus(event);

        mutateOrders(event);
    };

    return { handleDragEnd };
}
