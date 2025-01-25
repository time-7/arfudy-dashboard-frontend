'use client';

import { useProductContext } from '../../contexts/product-context';
import ProductList from '../list/product-list';
import ProductEditContent from './product-edit-content';
import ProductEditHeader from './product-edit-header';

export default function ProductEdit() {
    const { productEdit, showProducts } = useProductContext();

    if (!productEdit) return;

    return (
        <div className="flex h-1 flex-1 gap-4">
            {showProducts && (
                <ProductList className="hidden max-w-96 lg:grid lg:grid-cols-1 xl:grid-cols-1" />
            )}

            <div className="flex flex-1 flex-col overflow-auto rounded-xl border">
                <ProductEditHeader />

                <ProductEditContent />
            </div>
        </div>
    );
}
