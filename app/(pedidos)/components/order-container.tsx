import Loading from '@/components/loader';

import { useOrderContext } from '../contexts/order-context';
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
    const { isFetching, isFetched, orders } = useOrderContext();

    const filteredOrders = orders.filter(
        (order) => order.product.status === orderStatus
    );

    return (
        <div className="flex flex-1 flex-col">
            <div className="text-md h-10 rounded-t-2xl bg-primary text-center font-semibold leading-10 text-white">
                {title}
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-b-2xl border p-4">
                {isFetching && <Loading />}

                {isFetched && filteredOrders.length === 0 && (
                    <div className="flex flex-1 items-center justify-center text-gray-400">
                        Sem pedidos
                    </div>
                )}

                {filteredOrders.map((order, index) => (
                    <OrderCard key={index} />
                ))}
            </div>
        </div>
    );
}
