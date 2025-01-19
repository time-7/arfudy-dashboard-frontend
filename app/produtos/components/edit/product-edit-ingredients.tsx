'use client';

import { useRef, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import FormSubTitle from '@/components/form/form-subtitle';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { TIngredient, TProduct } from '@/utils/validators';

import ProductEditIngredientModal from './product-edit-ingredient-modal';

const columns: ColumnDef<TIngredient>[] = [
    {
        accessorKey: 'name',
        header: 'Nome'
    },
    {
        accessorKey: 'nutritionFacts.protein',
        header: 'Proteínas'
    },
    {
        accessorKey: 'nutritionFacts.carbohydrate',
        header: 'Carboidratos'
    },
    {
        accessorKey: 'nutritionFacts.totalFat',
        header: 'Gorduras totais'
    },
    {
        accessorKey: 'nutritionFacts.totalCalories',
        header: 'Calorías totais'
    }
];

export default function ProductEditIngredients() {
    const [open, setOpen] = useState(false);
    const ingredient = useRef<TIngredient | null>(null);
    const { watch } = useFormContext<TProduct>();

    /**
     * Abre o modal para adicionar um ingrediente.
     */
    const onAddIngredient = () => {
        setOpen(true);

        ingredient.current = {
            name: '',
            quantity: 1,
            nutritionFacts: {
                protein: 0,
                carbohydrate: 0,
                totalFat: 0,
                totalCalories: 0
            }
        };
    };

    return (
        <>
            <ProductEditIngredientModal open={open} onOpenChange={setOpen} />

            <div className="mt-4 flex items-center justify-between">
                <FormSubTitle className="mt-0">Ingredientes</FormSubTitle>

                <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={onAddIngredient}
                >
                    <Plus /> Adicionar ingrediente
                </Button>
            </div>

            <DataTable data={watch('ingredients')} columns={columns} />
        </>
    );
}
