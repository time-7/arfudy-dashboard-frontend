'use client';

import { useProductContext } from '../../contexts/product-context';
import ProductList from '../list/product-list';
import ProductEditContent from './product-edit-content';
import ProductEditFooter from './product-edit-footer';
import ProductEditHeader from './product-edit-header';

export default function ProductEdit() {
    const { productEdit } = useProductContext();

    if (!productEdit) return;

    return (
        <div className="flex h-1 flex-1 gap-4">
            <ProductList className="hidden max-w-96 lg:grid lg:grid-cols-1 xl:grid-cols-1" />

            <div className="flex flex-1 flex-col overflow-auto rounded-xl border">
                <ProductEditHeader />

                <ProductEditContent />

                <ProductEditFooter />
            </div>
        </div>
    );
}
