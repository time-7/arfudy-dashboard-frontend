'use client';

import Link from 'next/link';

import { Eye, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { TProduct } from '../types';

export default function ProductCard({ product }: { product: TProduct }) {
    return (
        <div className="flex overflow-hidden rounded-md border shadow-sm transition-all hover:scale-[1.01] hover:shadow-lg">
            <div className="w-2 bg-secondary-main" />

            <div className="flex min-w-0 flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                        {product.name}
                    </div>

                    <div className="flex gap-1">
                        <Link href={`/produtos/view/${product.id}`}>
                            <Button size="icon" variant="ghost">
                                <Eye className="h-5 w-5" />
                            </Button>
                        </Link>

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
