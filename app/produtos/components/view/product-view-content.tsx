'use client';

import Image from 'next/image';

import { money } from '@/utils/format';

import { useProductContext } from '../../contexts/product-context';
import ProductViewTable from './product-view-table';

export default function ProductViewContent() {
    const { productView } = useProductContext();

    if (!productView) return;

    return (
        <div className="flex flex-col gap-3 p-3">
            <div className="flex flex-col-reverse gap-3 md:flex-row">
                <div className="flex flex-1 flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">Preço</p>

                            <p className="text-lg">
                                {money(productView.price)}
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">Modelo 3D</p>

                            <p className="text-lg">
                                {productView.has3dModel ? 'Sim' : 'Não'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 grid-rows-2 gap-3">
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">
                                Carboidratos
                            </p>

                            <p className="text-lg">
                                {productView.nutritionFacts.carbohydrate} g
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">Proteínas</p>

                            <p className="text-lg">
                                {productView.nutritionFacts.protein} g
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">
                                Gorduras totais
                            </p>

                            <p className="text-lg">
                                {productView.nutritionFacts.totalFat} g
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">
                                Calorías totais
                            </p>

                            <p className="text-lg">
                                {productView.nutritionFacts.totalCalories} kcal
                            </p>
                        </div>
                    </div>
                </div>

                <div className="relative size-[180px]">
                    <Image
                        fill
                        src={productView.imageUrl}
                        alt="Imagem do produto"
                        className="rounded-xl border"
                        style={{
                            objectFit: 'cover'
                        }}
                    />
                </div>
            </div>

            <div className="flex flex-col">
                <p className="text-sm text-gray-500">Descrição</p>

                <p className="text-lg">{productView.description}</p>
            </div>

            {productView.ingredients.length > 0 && <ProductViewTable />}
        </div>
    );
}
