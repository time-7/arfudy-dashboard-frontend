'use client';

import { useOrderContext } from '../contexts/order-context';
import { TOrder, TOrderStatus } from '../types';

type TUseFilteredOrders = {
    orderStatus: TOrderStatus;
};

export function useFilteredOrders({ orderStatus }: TUseFilteredOrders) {
    const { orders, currentFolder } = useOrderContext();

    /**
     * Filtra os pedidos de acordo com o status e a categoria atual.
     */
    const filteredOrders = orders.filter((order) => {
        const isSameOrderStatus = order.product.status === orderStatus;
        const isFolderService = currentFolder === 'SERVICE';
        const isSameFolder = order.product.category === currentFolder;

        return isSameOrderStatus && (isFolderService || isSameFolder);
    });

    /**
     * Agrupa os pedidos filtrados pelo status por sua respectiva mesa.
     */
    const groupedOrders = Object.values(
        filteredOrders.reduce((acc: Record<number, TOrder[]>, pedido) => {
            const { tableNum } = pedido;

            if (!acc[tableNum]) {
                acc[tableNum] = [];
            }

            acc[tableNum].push(pedido);

            return acc;
        }, {})
    );

    return { groupedOrders };
}
