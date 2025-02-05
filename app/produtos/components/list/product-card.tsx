'use client';

import { useState } from 'react';

import { Eye, Pencil, Trash } from 'lucide-react';

import ConfirmModal from '@/components/confirm-modal';
import { Button } from '@/components/ui/button';
import { money } from '@/utils/format';

import { useProductContext } from '../../contexts/product-context';
import { useDeleteProduct } from '../../hooks/use-delete-product';
import { TProduct } from '@/utils/validators';

export default function ProductCard({ product }: { product: TProduct }) {
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);
    const { setProductView, setProductEdit } = useProductContext();
    const { mutate, isPending } = useDeleteProduct();

    return (
        <>
            <ConfirmModal
                open={openConfirmModal}
                onOpenChange={setOpenConfirmModal}
                onConfirm={() => {
                    mutate(product);

                    setOpenConfirmModal(false);
                }}
            />
            <div className="flex overflow-hidden rounded-lg border shadow-sm transition-all">
                <div className="w-2 bg-secondary-main" />

                <div className="flex min-w-0 flex-1 flex-col gap-1 p-3">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                            {product.name}
                        </div>

                        <div className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                            {money(product.price)}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-gray-600">
                            {product.description}
                        </div>

                        <div className="flex">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-blue-500 hover:text-blue-600"
                                onClick={() => {
                                    setProductView(product);
                                    setProductEdit(null);
                                }}
                            >
                                <Eye className="h-5 w-5" />
                            </Button>

                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                    setProductEdit(product);
                                    setProductView(null);
                                }}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>

                            <Button
                                size="icon"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600"
                                disabled={isPending}
                                onClick={() => setOpenConfirmModal(true)}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
