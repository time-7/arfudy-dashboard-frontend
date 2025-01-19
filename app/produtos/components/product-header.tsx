import { Eye, EyeClosed, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { useProductContext } from '../contexts/product-context';

export default function ProductHeader() {
    const { productEdit, productView, showProducts, setShowProducts } =
        useProductContext();

    return (
        <div className="flex items-center gap-4">
            <SidebarTrigger className="h-9 w-9 rounded-xl bg-white shadow" />

            <div className="flex gap-4">
                <Button variant="secondary">
                    <Plus /> Novo
                </Button>

                <Input placeholder="Pesquisar..." />

                {(productEdit || productView) && (
                    <Button
                        variant="secondary"
                        className="p-2 px-2.5"
                        onClick={() => setShowProducts(!showProducts)}
                    >
                        {showProducts ? (
                            <EyeClosed className="h-4 w-4" />
                        ) : (
                            <Eye className="h-4 w-4" />
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}
