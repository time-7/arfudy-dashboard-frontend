import { useState } from 'react';

import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

import { TOrder } from '../types';
import OrderModal from './order-modal';

type TOrderCard = {
    orders: TOrder[];
};

export default function OrderCard({ orders }: TOrderCard) {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        <>
            <OrderModal
                orders={orders}
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen(false)}
            />

            <div
                style={style}
                data-dragging={isDragging}
                onClick={() => setIsModalOpen(true)}
                className="z-50 flex cursor-pointer rounded-md border bg-white text-lg shadow-sm transition-[box-shadow,scale] hover:scale-[1.01] hover:shadow-xl data-[dragging=true]:cursor-grabbing"
            >
                <div
                    {...listeners}
                    {...attributes}
                    ref={setNodeRef}
                    className="flex w-5 cursor-grab items-center rounded-l-md bg-gray-200"
                >
                    <GripVertical size={20} strokeWidth={1} />
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex justify-between">
                        <p className="font-semibold">
                            Mesa {orders[0].tableNum}
                        </p>
                    </div>

                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex justify-between gap-1 rounded-md border p-2 text-sm"
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
        </>
    );
}
