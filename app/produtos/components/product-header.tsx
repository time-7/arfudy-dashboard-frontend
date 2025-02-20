import { useDebounce } from '@uidotdev/usehooks';
import { Eye, EyeClosed, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';

import { useProductContext } from '../contexts/product-context';

export default function ProductHeader() {
    const {
        productEdit,
        productView,
        showProducts,
        setShowProducts,
        setProductEdit,
        search,
        setSearch
    } = useProductContext();

    return (
        <div className="flex items-center gap-4">
            <SidebarTrigger className="h-9 w-9 rounded-xl bg-white shadow" />

            <div className="flex gap-4">
                <Button
                    variant="secondary"
                    onClick={() =>
                        setProductEdit({
                            name: '',
                            price: 0,
                            description: '',
                            has3dModel: false,
                            imageUrl: '',
                            category: 'FOOD',
                            ingredients: [],
                            nutritionFacts: {
                                carbohydrate: 0,
                                protein: 0,
                                totalCalories: 0,
                                totalFat: 0
                            }
                        })
                    }
                >
                    <Plus /> Novo
                </Button>

                <Input
                    placeholder="Pesquisar..."
                    value={search}
                    onChange={(value) => setSearch(value.target.value)}
                />

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
