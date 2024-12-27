import ProductList from './components/product-list';
import ProductTopBar from './components/product-top-bar';

export default function ProductPage() {
    return (
        <div className="mt-4 flex max-h-full flex-1 flex-col gap-4 rounded-2xl border bg-white p-4 shadow-xl">
            <ProductTopBar />

            <ProductList />
        </div>
    );
}
