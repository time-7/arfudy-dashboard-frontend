import { TOrder } from '../types';
import OrderCard from './order-card';

type TOrderContainer = {
    title: string;
    orders: TOrder[];
};

export default function OrderContainer({ title, orders }: TOrderContainer) {
    return (
        <div className="flex flex-1 flex-col">
            <div className="text-md h-10 rounded-t-2xl bg-primary text-center font-semibold leading-10 text-white">
                {title}
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-y-auto rounded-b-2xl border p-4">
                {orders.map((order, index) => (
                    <OrderCard key={index} />
                ))}
            </div>
        </div>
    );
}
