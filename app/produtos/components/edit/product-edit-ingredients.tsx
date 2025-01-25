'use client';

import { useRef, useState } from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { Pencil, Plus, Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import ConfirmModal from '@/components/confirm-modal';
import FormSubTitle from '@/components/form/form-subtitle';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { TIngredient, TProduct } from '@/utils/validators';

import ProductEditIngredientModal from './product-edit-ingredient-modal';

export default function ProductEditIngredients() {
    const [openIngredientModal, setOpenIngredientModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const ingredientRef = useRef<string | null>(null);
    const { watch, getValues, setValue } = useFormContext<TProduct>();

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
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const ingredientId = row.id;

                return (
                    <div className="inline-flex items-center">
                        <Button
                            variant="ghost"
                            className="h-8 px-2 py-1"
                            onClick={() => {
                                ingredientRef.current = ingredientId;

                                setOpenIngredientModal(true);
                            }}
                        >
                            <Pencil />
                        </Button>

                        <Button
                            variant="ghost"
                            className="h-8 px-2 py-1 text-red-500 hover:text-red-600"
                            onClick={() => {
                                ingredientRef.current = ingredientId;

                                setOpenConfirmModal(true);
                            }}
                        >
                            <Trash />
                        </Button>
                    </div>
                );
            }
        }
    ];

    /**
     * Remove ingrediente da lista de ingredientes.
     */
    const removeIngredient = () => {
        const ingredients = getValues('ingredients');
        const newIngredients = ingredients.filter(
            (_, index) => index !== Number(ingredientRef.current)
        );

        setValue('ingredients', newIngredients);

        setOpenConfirmModal(false);
    };

    return (
        <>
            <ConfirmModal
                open={openConfirmModal}
                onOpenChange={setOpenConfirmModal}
                onConfirm={removeIngredient}
            />

            <ProductEditIngredientModal
                open={openIngredientModal}
                onOpenChange={setOpenIngredientModal}
                ingredientId={ingredientRef.current}
            />

            <div className="mt-4 flex items-center justify-between">
                <FormSubTitle className="mt-0">Ingredientes</FormSubTitle>

                <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={() => setOpenIngredientModal(true)}
                >
                    <Plus /> Adicionar ingrediente
                </Button>
            </div>

            <DataTable data={watch('ingredients')} columns={columns} />
        </>
    );
}
