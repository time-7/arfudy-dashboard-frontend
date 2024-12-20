import { DndContext } from '@dnd-kit/core';

import { useOrderContext } from '../contexts/order-context';
import { useDrag } from '../hooks/use-drag';
import OrderContainer from './order-container';

export default function OrderPanel() {
    const { currentFolder } = useOrderContext();
    const { handleDragEnd } = useDrag();
    const isService = currentFolder === 'SERVICE';

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="z-10 flex h-[calc(100%-32px)] flex-1 gap-4 rounded-b-2xl rounded-tr-2xl border bg-white p-4 shadow-xl">
                {!isService && (
                    <OrderContainer title="Aguardando" orderStatus="PENDING" />
                )}

                {!isService && (
                    <OrderContainer title="Fazendo" orderStatus="IN_PREPARE" />
                )}

                <OrderContainer title="Pronto" orderStatus="DONE" />

                {isService && (
                    <OrderContainer title="Entregue" orderStatus="DELIVERED" />
                )}
            </div>
        </DndContext>
    );
}
