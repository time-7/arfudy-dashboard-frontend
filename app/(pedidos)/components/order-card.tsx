import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

import { TOrder } from '../types';

type TOrderCard = {
    orders: TOrder[];
};

export default function OrderCard({ orders }: TOrderCard) {
    const dragId = orders.map((order) => order.id).join('-');

    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: dragId,
            data: orders
        });

    const style = transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
        : undefined;

    return (
        <div
            {...listeners}
            {...attributes}
            ref={setNodeRef}
            style={style}
            data-dragging={isDragging}
            className="z-50 flex cursor-grab rounded-md border bg-white text-lg shadow-md hover:scale-[1.02] hover:shadow-xl hover:transition-shadow data-[dragging=true]:cursor-grabbing"
        >
            <div className="flex w-5 items-center rounded-l-md bg-gray-300">
                <GripVertical size={20} strokeWidth={1} />
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="flex justify-between">
                    <p className="font-semibold">Mesa {orders[0].tableNum}</p>
                </div>

                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="flex justify-between gap-1 rounded-md border-2 p-2 text-sm"
                    >
                        <p>
                            {order.product.name} - {order.clientName}
                        </p>

                        <p>
                            {new Date(
                                order.product.date.slice(0, -1)
                            ).toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
