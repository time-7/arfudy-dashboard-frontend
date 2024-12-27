import { ReactNode } from 'react';

import { DialogProps } from '@radix-ui/react-dialog';

import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

import { TOrder } from '../types';
import { ordersInfos } from '../utils/order';

type TOrderModal = DialogProps & {
    orders: TOrder[];
};

const Label = ({ children }: { children: ReactNode }) => (
    <span className="text-gray-400">{children}</span>
);

export default function OrderModal({
    orders,
    open,
    onOpenChange
}: TOrderModal) {
    return (
        <Dialog modal open={open} onOpenChange={onOpenChange}>
            <DialogContent className="gap-0 p-0">
                <DialogHeader className="px-6 py-4">
                    <DialogTitle className="text-xl font-semibold">
                        Mesa {orders[0].tableNum}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 p-6 pt-0">
                    <div className="flex justify-between">
                        <h3 className="text-xl font-semibold">Descrição</h3>

                        <Badge
                            variant="secondary"
                            className={`bg-${ordersInfos[orders[0].product.status].color} text-${ordersInfos[orders[0].product.status].color}-900`}
                        >
                            {ordersInfos[orders[0].product.status].name}
                        </Badge>
                    </div>

                    <div className="flex flex-col gap-2">
                        {orders.map((order, index) => (
                            <div
                                key={index}
                                className="flex flex-col [&>div]:flex [&>div]:justify-between"
                            >
                                <div>
                                    <p>
                                        <Label>Pedido - </Label>

                                        {order.product.name}
                                    </p>

                                    <p>
                                        <Label>Quantidade - </Label>
                                        {order.product.quantity} un
                                    </p>
                                </div>

                                <div>
                                    <p>
                                        <Label>Cliente - </Label>{' '}
                                        {order.clientName}
                                    </p>

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
