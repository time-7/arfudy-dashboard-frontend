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
    isFetched: boolean;
    isFetching: boolean;

    currentFolder: TFolder;
    setCurrentFolder: Dispatch<SetStateAction<TFolder>>;

    orders: TOrder[];
    setOrders: Dispatch<SetStateAction<TOrder[]>>;
};

const OrderContext = createContext<TOrderContext>({} as TOrderContext);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [currentFolder, setCurrentFolder] = useState<TFolder>('FOOD');

    const [orders, setOrders] = useState<TOrder[]>([]);

    const { data, isFetching, isFetched, isSuccess } = useQuery<TOrder[]>({
        queryKey: ['orders'],
        queryFn: () => Axios.get('/orders').then((res) => res.data.data.flat())
    });

    useEffect(() => {
        if (isSuccess) {
            setOrders(data);
        }
    }, [data]);

    return (
        <OrderContext.Provider
            value={{
                isFetched,
                isFetching,
                currentFolder,
                setCurrentFolder,
                orders,
                setOrders
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export const useOrderContext = (): TOrderContext => use(OrderContext);
