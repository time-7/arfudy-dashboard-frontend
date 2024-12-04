'use client';

import { useOrderContext } from '../contexts/order-context';
import { TOrderStatus } from '../types';

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

    return { filteredOrders };
}
