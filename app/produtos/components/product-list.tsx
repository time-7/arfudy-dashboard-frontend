'use client';

import Image from 'next/image';

import { X } from 'lucide-react';

import Loading from '@/components/loader';
import { Button } from '@/components/ui/button';
import { money } from '@/utils/format';

import { useProductContext } from '../contexts/product-context';
import ProductCard from './product-card';

export default function ProductList() {
    const { products, isFetching, productView, setProductView } =
        useProductContext();

    if (isFetching) {
        return <Loading />;
    }

    if (productView) {
        return (
            <div className="flex h-1 flex-1 gap-4">
                <div className="grid h-full w-72 auto-rows-min grid-cols-1 gap-4 overflow-y-auto rounded-xl border p-2 lg:w-96">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="flex-1 overflow-auto rounded-xl border">
                    <div className="flex h-12 items-center justify-between bg-secondary-main px-4">
                        <h2 className="text-md text-xl font-bold leading-[48px] text-white">
                            {productView.name}
                        </h2>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-secondary-dark [&_svg]:size-6"
                            onClick={() => setProductView(null)}
                        >
                            <X color="white" />
                        </Button>
                    </div>

                    <div className="flex flex-col gap-3 p-3">
                        <div className="flex gap-3">
                            <div className="relative size-[220px] object-contain">
                                <Image
                                    fill
                                    src={productView.imageUrl}
                                    alt="Imagem do produto"
                                    className="rounded-xl border"
                                />
                            </div>

                            <div className="flex flex-1 flex-col gap-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">
                                            Preço
                                        </p>

                                        <p className="text-lg">
                                            {money(productView.price)}
                                        </p>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">
                                            Modelo 3D
                                        </p>

                                        <p className="text-lg">
                                            {productView.has3dModel
                                                ? 'Sim'
                                                : 'Não'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 grid-rows-2 gap-3">
                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">
                                            Carboidratos
                                        </p>

                                        <p className="text-lg">
                                            {
                                                productView.nutritionFacts
                                                    .carbohydrate
                                            }{' '}
                                            g
                                        </p>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">
                                            Proteínas
                                        </p>

                                        <p className="text-lg">
                                            {productView.nutritionFacts.protein}{' '}
                                            g
                                        </p>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">
                                            Gorduras totais
                                        </p>

                                        <p className="text-lg">
                                            {
                                                productView.nutritionFacts
                                                    .totalFat
                                            }{' '}
                                            g
                                        </p>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-sm text-gray-500">
                                            Calorías totais
                                        </p>

                                        <p className="text-lg">
                                            {
                                                productView.nutritionFacts
                                                    .totalCalories
                                            }{' '}
                                            kcal
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <p className="text-sm text-gray-500">Descrição</p>

                            <p className="text-lg">{productView.description}</p>
                        </div>

                        {productView.ingredients.length > 0 && (
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-500">
                                    Ingredientes
                                </p>

                                <div className="flex flex-col gap-1">
                                    {productView.ingredients.map(
                                        (ingredient, index) => (
                                            <p key={index} className="text-lg">
                                                {ingredient.quantity}x{' '}
                                                {ingredient.name}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="grid flex-1 auto-rows-min grid-cols-1 gap-4 overflow-y-auto rounded-xl border p-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}

            {products.length === 0 && (
                <div className="flex flex-1 items-center justify-center text-gray-400">
                    Nenhum produto encontrado
                </div>
            )}
        </div>
    );
}
