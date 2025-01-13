'use client';

import ProductList from './components/product-list';
import ProductTopBar from './components/product-top-bar';
import { ProductProvider } from './contexts/product-context';

export default function ProductPage() {
    return (
        <ProductProvider>
            <ProductTopBar />

            <ProductList />
        </ProductProvider>
    );
}
