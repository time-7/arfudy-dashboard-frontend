import { useOrderContext } from '../contexts/order-context';
import OrderContainer from './order-container';

export default function OrderPanel() {
    const {
        currentFolder,
        deliveredOrders,
        inPrepareOrders,
        doneOrders,
        pendingOrders
    } = useOrderContext();
    const isService = currentFolder === 'SERVICE';

    return (
        <div className="z-10 flex h-[calc(100%-32px)] flex-1 gap-4 rounded-b-2xl rounded-tr-2xl border bg-white p-4 shadow-xl">
            {!isService && (
                <OrderContainer title="Aguardando" orders={pendingOrders} />
            )}

            {!isService && (
                <OrderContainer title="Fazendo" orders={inPrepareOrders} />
            )}

            <OrderContainer title="Pronto" orders={doneOrders} />

            {isService && (
                <OrderContainer title="Entregue" orders={deliveredOrders} />
            )}
        </div>
    );
}
