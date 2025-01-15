'use client';

import { useProductContext } from '../../contexts/product-context';

export default function ProductEditContent() {
    const { productEdit } = useProductContext();

    if (!productEdit) return;

    return <div className="flex flex-1 flex-col gap-3 p-3">fd</div>;
}
