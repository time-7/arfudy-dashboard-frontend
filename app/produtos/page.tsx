'use client';

import ProductContainer from './components/product-container';
import ProductHeader from './components/product-header';
import { ProductProvider } from './contexts/product-context';

export default function ProductPage() {
    return (
        <ProductProvider>
            <ProductHeader />

            <ProductContainer />
        </ProductProvider>
    );
}
