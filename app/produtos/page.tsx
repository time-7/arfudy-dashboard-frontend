import PageContainer from '@/components/page-container';

import ProductList from './components/product-list';
import ProductTopBar from './components/product-top-bar';

export default function ProductPage() {
    return (
        <>
            <ProductTopBar />

            <ProductList />
        </>
    );
}
