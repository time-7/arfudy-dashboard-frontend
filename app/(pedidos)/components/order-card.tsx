import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

import { TOrder } from '../types';

type TOrderCard = {
    order: TOrder;
};

export default function OrderCard({ order }: TOrderCard) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: order.id
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

            <div className="flex flex-1 flex-col gap-1 p-4">
                <div className="flex justify-between">
                    <p className="font-semibold">Mesa</p>

                    <p className="font-semibold">01</p>
                </div>

                <div className="flex justify-between">
                    <p className="font-semibold text-gray-400">Código</p>

                    <p className="font-semibold text-gray-400">123</p>
                </div>

                <div className="flex justify-between">
                    <p className="font-semibold text-gray-400">Data</p>

                    <p className="font-semibold text-gray-400">
                        {new Date(
                            order.product.date.slice(0, -1)
                        ).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
