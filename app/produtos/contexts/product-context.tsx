import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    use,
    useEffect,
    useState
} from 'react';

import { useQueryProducts } from '../hooks/use-query-products';
import { TProduct } from '../types';

export type TProductContext = {
    isFetching: boolean;

    products: TProduct[];
    setProducts: Dispatch<SetStateAction<TProduct[]>>;

    productView: TProduct | null;
    setProductView: Dispatch<SetStateAction<TProduct | null>>;

    productEdit: TProduct | null;
    setProductEdit: Dispatch<SetStateAction<TProduct | null>>;

    showProducts: boolean;
    setShowProducts: Dispatch<SetStateAction<boolean>>;
};

const ProductContext = createContext<TProductContext>({} as TProductContext);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [productView, setProductView] = useState<TProduct | null>(null);
    const [productEdit, setProductEdit] = useState<TProduct | null>(null);
    const [products, setProducts] = useState<TProduct[]>([]);
    const [showProducts, setShowProducts] = useState<boolean>(true);

    const { data = [], isFetching, isSuccess } = useQueryProducts();

    /**
     * Adiciona os produtos ao state.
     */
    const addInitialProducts = () => {
        if (isSuccess) {
            setProducts(data);
        }
    };

    useEffect(addInitialProducts, [data]);

    return (
        <ProductContext.Provider
            value={{
                isFetching,
                products,
                setProducts,
                productView,
                setProductView,
                productEdit,
                setProductEdit,
                showProducts,
                setShowProducts
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export const useProductContext = (): TProductContext => use(ProductContext);
