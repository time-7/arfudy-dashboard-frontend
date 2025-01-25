'use client';

import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

import { useProductContext } from '../../contexts/product-context';

export default function ProductViewTable() {
    const { productView } = useProductContext();

    if (!productView) return;

    return (
        <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-500">Ingredientes</p>

            <div className="rounded-xl border">
                <Table>
                    <TableHeader className="">
                        <TableRow>
                            <TableHead>Nome</TableHead>

                            <TableHead className="text-right">
                                Quantidade
                            </TableHead>

                            <TableHead className="text-right">
                                Carboidratos
                            </TableHead>

                            <TableHead className="text-right">
                                Proteínas
                            </TableHead>

                            <TableHead className="text-right">
                                Gorduras totais
                            </TableHead>

                            <TableHead className="text-right">
                                Calorías totais
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {productView.ingredients.map((ingredient, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">
                                    {ingredient.name}
                                </TableCell>

                                <TableCell className="text-right">
                                    {ingredient.quantity}
                                </TableCell>

                                <TableCell className="text-right">
                                    {ingredient.nutritionFacts.carbohydrate} g
                                </TableCell>

                                <TableCell className="text-right">
                                    {ingredient.nutritionFacts.protein} g
                                </TableCell>

                                <TableCell className="text-right">
                                    {ingredient.nutritionFacts.totalFat} g
                                </TableCell>

                                <TableCell className="text-right">
                                    {ingredient.nutritionFacts.totalCalories}{' '}
                                    kcal
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
