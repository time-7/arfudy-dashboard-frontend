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
            <div className="flex flex-1 gap-4">
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
