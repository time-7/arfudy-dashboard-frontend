import { ColumnDef } from '@tanstack/react-table';
import { useFormContext } from 'react-hook-form';

import { DataTable } from '@/components/ui/data-table';

import { TIngredient } from '../../types';

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

export default function ProductEditTable() {
    const { watch } = useFormContext();

    return <DataTable data={watch('ingredients')} columns={columns} />;
}
