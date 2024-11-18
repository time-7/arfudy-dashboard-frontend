import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    use,
    useEffect,
    useState
} from 'react';

import { useQuery } from '@tanstack/react-query';

import { Axios } from '@/lib/axios';

import { TFolder, TOrder } from '../types';

export type TOrderContext = {
    currentFolder: TFolder;
    setCurrentFolder: Dispatch<SetStateAction<TFolder>>;

    pendingOrders: TOrder[];
    setPendingOrders: Dispatch<SetStateAction<TOrder[]>>;

    inPrepareOrders: TOrder[];
    setInPrepareOrders: Dispatch<SetStateAction<TOrder[]>>;

    doneOrders: TOrder[];
    setDoneOrders: Dispatch<SetStateAction<TOrder[]>>;

    deliveredOrders: TOrder[];
    setDeliveredOrders: Dispatch<SetStateAction<TOrder[]>>;
};

const OrderContext = createContext<TOrderContext>({} as TOrderContext);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [currentFolder, setCurrentFolder] = useState<TFolder>('FOOD');

    const [pendingOrders, setPendingOrders] = useState<TOrder[]>([]);
    const [inPrepareOrders, setInPrepareOrders] = useState<TOrder[]>([]);
    const [doneOrders, setDoneOrders] = useState<TOrder[]>([]);
    const [deliveredOrders, setDeliveredOrders] = useState<TOrder[]>([]);

    const { data, isFetching } = useQuery<TOrder[]>({
        queryKey: ['orders'],
        queryFn: () => Axios.get('/orders').then((res) => res.data.data.flat())
    });

    useEffect(() => {
        setPendingOrders(
            data?.filter((order) => order.product.status === 'PENDING') || []
        );
        setInPrepareOrders(
            data?.filter((order) => order.product.status === 'IN_PREPARE') || []
        );
        setDoneOrders(
            data?.filter((order) => order.product.status === 'DONE') || []
        );
        setDeliveredOrders(
            data?.filter((order) => order.product.status === 'DELIVERED') || []
        );
    }, [data]);

    return (
        <OrderContext.Provider
            value={{
                currentFolder,
                setCurrentFolder,
                pendingOrders,
                setPendingOrders,
                inPrepareOrders,
                setInPrepareOrders,
                doneOrders,
                setDoneOrders,
                deliveredOrders,
                setDeliveredOrders
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export const useOrderContext = (): TOrderContext => use(OrderContext);
