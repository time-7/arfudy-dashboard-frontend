import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useMutateOrder } from '@/app/(pedidos)/hooks/use-mutate-order';
import { TOrder, TOrderStatus } from '@/app/(pedidos)/types';
import { ordersInfos } from '@/app/(pedidos)/utils/order';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function OrderStatusSelect({ order }: { order: TOrder }) {
    const [orderStatus, setOrderStatus] = useState<TOrderStatus>(
        order.product.status
    );
    const orderItems = Object.entries(ordersInfos);
    const { mutate } = useMutateOrder();
    const queryClient = useQueryClient();

    /**
     * Realiza a mudança de status do pedido.
     */
    const changeOrderStatus = (status: TOrderStatus) => {
        mutate(
            {
                orderId: order.id,
                productId: order.product.id,
                status: status
            },
            {
                onSuccess: () =>
                    queryClient.invalidateQueries({
                        queryKey: ['queryOrders']
                    })
            }
        );
    };

    return (
        <Select
            onValueChange={(value: TOrderStatus) => {
                setOrderStatus(value);

                changeOrderStatus(value);
            }}
            value={orderStatus}
        >
            <SelectTrigger
                className={cn(
                    'h-7 w-32 rounded-2xl font-bold',
                    ordersInfos[orderStatus].backgroundColorChip,
                    ordersInfos[orderStatus].borderColor,
                    ordersInfos[orderStatus].textColor
                )}
            >
                <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent className="rounded-2xl">
                {orderItems.map(([key, value]) => (
                    <SelectItem className="rounded-xl" key={key} value={key}>
                        {value.title}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
