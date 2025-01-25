'use client';

import { useProductContext } from '../../contexts/product-context';
import ProductList from '../list/product-list';
import ProductViewContent from './product-view-content';
import ProductViewHeader from './product-view-header';

export default function ProductView() {
    const { productView, showProducts } = useProductContext();

    if (!productView) return;

    return (
        <div className="flex h-1 flex-1 gap-4">
            {showProducts && (
                <ProductList className="hidden max-w-96 lg:grid lg:grid-cols-1 xl:grid-cols-1" />
            )}

            <div className="flex flex-1 flex-col overflow-auto rounded-xl border">
                <ProductViewHeader />

                <ProductViewContent />
            </div>
        </div>
    );
}
