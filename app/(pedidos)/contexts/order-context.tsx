import {
    createContext,
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction,
    use,
    useEffect,
    useRef,
    useState
} from 'react';

import { socketOrder } from '@/lib/socket';

import { useQueryOrders } from '../hooks/use-query-orders';
import { TFolder, TOrder } from '../types';

export type TOrderContext = {
    isFetching: boolean;

    currentFolder: TFolder;
    setCurrentFolder: Dispatch<SetStateAction<TFolder>>;

    orders: TOrder[];
    setOrders: Dispatch<SetStateAction<TOrder[]>>;

    openOrderModal: boolean;
    setOpenOrderModal: Dispatch<SetStateAction<boolean>>;

    ordersModal: RefObject<TOrder[]>;
};

const OrderContext = createContext<TOrderContext>({} as TOrderContext);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [currentFolder, setCurrentFolder] = useState<TFolder>('FOOD');
    const [orders, setOrders] = useState<TOrder[]>([]);
    const [openOrderModal, setOpenOrderModal] = useState<boolean>(false);
    const ordersModal = useRef<TOrder[]>([]);

    const { data, isFetching, isSuccess } = useQueryOrders();

    /**
     * Adiciona os pedidos iniciais.
     */
    const addInitialOrders = () => {
        if (isSuccess) {
            setOrders(data);
        }
    };

    /**
     * Implementa o socket para ouvir novos pedidos.
     */
    const implementSocket = () => {
        socketOrder.on('onOrder', (data: { data: TOrder[] }) =>
            setOrders((prev) => [...prev, ...data.data])
        );

        return () => {
            socketOrder.off();
        };
    };

    useEffect(addInitialOrders, [data]);

    useEffect(implementSocket, []);

    return (
        <OrderContext.Provider
            value={{
                isFetching,
                currentFolder,
                setCurrentFolder,
                orders,
                setOrders,
                openOrderModal,
                setOpenOrderModal,
                ordersModal
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export const useOrderContext = (): TOrderContext => use(OrderContext);
