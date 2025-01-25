'use client';

import { Pencil, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useProductContext } from '../../contexts/product-context';

export default function ProductViewHeader() {
    const { productView, setProductView, setProductEdit } = useProductContext();

    if (!productView) return;

    return (
        <div className="flex h-12 items-center justify-between bg-secondary-main px-4">
            <h2 className="text-md flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-[48px] text-white">
                {productView.name}
            </h2>

            <div className="flex gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-secondary-dark [&_svg]:size-5"
                    onClick={() => {
                        setProductView(null);

                        setProductEdit(productView);
                    }}
                >
                    <Pencil color="white" />
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-secondary-dark [&_svg]:size-6"
                    onClick={() => setProductView(null)}
                >
                    <X color="white" />
                </Button>
            </div>
        </div>
    );
}
