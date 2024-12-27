'use client';

import Loading from '@/components/loader';

import { useQueryProducts } from '../hooks/use-query-products';
import ProductCard from './product-card';

export default function ProductList() {
    const { data = [], isFetching } = useQueryProducts();

    return (
        <>
            {isFetching && <Loading />}

            {!isFetching && (
                <div className="grid h-full flex-1 auto-rows-min grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}

            {!isFetching && data.length === 0 && (
                <div className="flex flex-1 items-center justify-center text-gray-400">
                    Nenhum produto encontrado
                </div>
            )}
        </>
    );
}
