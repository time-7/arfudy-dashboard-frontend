'use client';

import { X } from 'lucide-react';

import Loading from '@/components/loader';
import { Button } from '@/components/ui/button';

import { useProductContext } from '../contexts/product-context';
import ProductCard from './product-card';

export default function ProductList() {
    const { products, isFetching, productView, setProductView } =
        useProductContext();

    if (isFetching) {
        return <Loading />;
    }

    if (productView) {
        return (
            <div className="flex h-1 flex-1 gap-4">
                <div className="grid h-full w-96 auto-rows-min grid-cols-1 gap-4 overflow-y-auto rounded-xl border p-2">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="flex-1 overflow-auto rounded-xl border">
                    <div className="flex h-12 items-center justify-between bg-secondary-main px-4">
                        <h2 className="text-md text-xl font-bold leading-[48px] text-white">
                            {productView.name}
                        </h2>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-[#ef9c00] [&_svg]:size-6"
                            onClick={() => setProductView(null)}
                        >
                            <X color="white" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid flex-1 auto-rows-min grid-cols-1 gap-4 overflow-y-auto rounded-xl border p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}

            {products.length === 0 && (
                <div className="flex flex-1 items-center justify-center text-gray-400">
                    Nenhum produto encontrado
                </div>
            )}
        </div>
    );
}
