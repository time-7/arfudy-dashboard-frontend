import { DndContext } from '@dnd-kit/core';

import { useOrderContext } from '../contexts/order-context';
import { useDrag } from '../hooks/use-drag';
import { ordersInfos } from '../utils/order';
import OrderContainer from './order-container';
import OrderModal from './order-modal';

export default function OrderPanel() {
    const { currentFolder } = useOrderContext();
    const { handleDragEnd } = useDrag();
    const isService = currentFolder === 'SERVICE';

    return (
        <>
            <OrderModal />
            
            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex flex-1 gap-4">
                    {!isService && (
                        <OrderContainer
                            orderStatus="PENDING"
                            title={ordersInfos.PENDING.title}
                            backgroundColor={
                                ordersInfos.PENDING.backgroundColor
                            }
                        />
                    )}

                    {!isService && (
                        <OrderContainer
                            orderStatus="IN_PREPARE"
                            title={ordersInfos.IN_PREPARE.title}
                            backgroundColor={
                                ordersInfos.IN_PREPARE.backgroundColor
                            }
                        />
                    )}

                    <OrderContainer
                        orderStatus="DONE"
                        title={ordersInfos.DONE.title}
                        backgroundColor={ordersInfos.DONE.backgroundColor}
                    />

                    {isService && (
                        <OrderContainer
                            orderStatus="DELIVERED"
                            title={ordersInfos.DELIVERED.title}
                            backgroundColor={
                                ordersInfos.DELIVERED.backgroundColor
                            }
                        />
                    )}
                </div>
            </DndContext>{' '}
        </>
    );
}
