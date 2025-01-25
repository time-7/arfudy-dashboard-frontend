'use client';

import Loading from '@/components/loader';

import { useProductContext } from '../contexts/product-context';
import ProductEdit from './edit/product-edit';
import ProductList from './list/product-list';
import ProductView from './view/product-view';

export default function ProductContainer() {
    const { isFetching, productView, productEdit } = useProductContext();

    if (isFetching) return <Loading />;

    if (productEdit) return <ProductEdit />;

    if (productView) return <ProductView />;

    return <ProductList />;
}
