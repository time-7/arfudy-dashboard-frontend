'use client';

import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import { useProductContext } from '../../contexts/product-context';
import ProductCard from './product-card';

type TProductList = {
    className?: ComponentProps<'div'>['className'];
};

export default function ProductList({ className }: TProductList) {
    const { products } = useProductContext();

    return (
        <div
            className={cn(
                'grid flex-1 auto-rows-min grid-cols-1 gap-3 overflow-y-auto rounded-xl border p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
                className
            )}
        >
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
