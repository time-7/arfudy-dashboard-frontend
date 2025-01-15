'use client';

import Loading from '@/components/loader';

import { useProductContext } from '../contexts/product-context';
import ProductList from './list/product-list';
import ProductView from './view/product-view';

export default function ProductContainer() {
    const { isFetching, productView } = useProductContext();

    if (isFetching) {
        return <Loading />;
    }

    if (productView) {
        return <ProductView />;
    }

    return <ProductList />;
}
