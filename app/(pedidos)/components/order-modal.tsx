import { ReactNode } from 'react';

import { DialogProps } from '@radix-ui/react-dialog';

import OrderStatusSelect from '@/components/order-status-select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

import { useOrderContext } from '../contexts/order-context';
import { ordersInfos } from '../utils/order';

const Label = ({ children }: { children: ReactNode }) => (
    <span className="text-gray-400">{children}</span>
);

export default function OrderModal() {
    const { openOrderModal, setOpenOrderModal, ordersModal } =
        useOrderContext();
    const orders = ordersModal.current;

    if (!orders.length) return null;

    return (
        <Dialog modal open={openOrderModal} onOpenChange={setOpenOrderModal}>
            <DialogContent
                onOpenAutoFocus={(e) => e.preventDefault()}
                className="gap-0 overflow-hidden border-none p-0 [&>button]:right-4 [&>button]:top-3 [&>button]:text-white"
            >
                <DialogHeader
                    className={cn(
                        'flex p-3',
                        ordersInfos[orders[0].product.status].backgroundColor
                    )}
                >
                    <DialogTitle className="font-semibold text-white">
                        Mesa {orders[0].tableNum}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2 p-6 pt-4">
                    <h2 className="text-xl font-semibold">Pedidos</h2>

                    <div className="flex flex-col gap-2">
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="flex flex-col [&>div]:flex [&>div]:justify-between [&>div]:gap-2"
                            >
                                <div className="mb-2">
                                    <h3 className="w-1 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-medium">
                                        {order.product.name}
                                    </h3>

                                    <OrderStatusSelect order={order} />
                                </div>

                                <div>
                                    <p>
                                        <Label>Cliente - </Label>{' '}
                                        {order.clientName}
                                    </p>

                                    <p>
                                        <Label>Quantidade - </Label>
                                        {order.product.quantity} un
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        <Label>Data - </Label>{' '}
                                        {new Date(
                                            order.product.date.slice(0, -1)
                                        ).toLocaleTimeString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}
                                    </p>
                                </div>

                                {index < orders.length - 1 && (
                                    <hr className="mb-2 mt-4 border-gray-200" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
