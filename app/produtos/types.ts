export type TNutritionFacts = {
    protein: number;
    totalFat: number;
    carbohydrate: number;
    totalCalories: number;
};

export type TIngredient = {
    name: string;
    quantity: number;
    nutritionFacts: TNutritionFacts;
};

export type TProduct = {
    id: string;
    name: string;
    imageUrl: string;
    description: string;
    unityModelId: string;
    price: number;
    isVisible: boolean;
    has3dModel: boolean;
    ingredients: TIngredient[];
    nutritionFacts: TNutritionFacts;
};
