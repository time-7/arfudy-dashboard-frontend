'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import FormSubTitle from '@/components/form/form-subtitle';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { TIngredient, TProduct } from '@/utils/validators';

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
    const { watch } = useFormContext<TProduct>();

    return (
        <>
            <div className="mt-4 flex items-center justify-between">
                <FormSubTitle className="mt-0">Ingredientes</FormSubTitle>

                <Button variant="secondary" size="sm">
                    <Plus /> Adicionar ingrediente
                </Button>
            </div>

            <DataTable data={watch('ingredients')} columns={columns} />
        </>
    );
}
