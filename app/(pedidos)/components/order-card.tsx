import { useDraggable } from '@dnd-kit/core';
import { GripVertical } from 'lucide-react';

import { TOrder } from '../types';

type TOrderCard = {
    order: TOrder;
};

export default function OrderCard({ order }: TOrderCard) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: order.id
    });

    const style = transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="z-20 flex rounded-md border bg-white text-lg shadow-md"
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
