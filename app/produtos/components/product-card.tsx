'use client';

import { Eye, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useProductContext } from '../contexts/product-context';
import { TProduct } from '../types';

export default function ProductCard({ product }: { product: TProduct }) {
    const { setProductView } = useProductContext();

    return (
        <div className="flex overflow-hidden rounded-lg border shadow-sm transition-all">
            <div className="w-2 bg-secondary-main" />

            <div className="flex min-w-0 flex-1 flex-col p-3">
                <div className="flex items-center justify-between">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                        {product.name}
                    </div>

                    <div className="flex gap-1">
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setProductView(product)}
                        >
                            <Eye className="h-5 w-5" />
                        </Button>

                        <Button size="icon" variant="ghost">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-600">
                    {product.description}
                </div>
            </div>
        </div>
    );
}
