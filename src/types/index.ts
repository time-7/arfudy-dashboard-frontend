export type TIngredient = {
  name: string;
  quantity: number;
  nutritionFacts: {
    carbohydrate: number;
    protein: number;
    totalFat: number;
    totalCalories: number;
  };
};

export type TNutritionFacts = {
  carbohydrate?: number | null;
  protein?: number | null;
  totalFat?: number | null;
  totalCalories?: number | null;
};

export type TProduct = {
  description: string;
  name: string;
  imageUrl: string;
  has3dModel: false;
  unityModelId: string;
  price: number;
  ingredients: TIngredient[];
  nutritionFacts?: TNutritionFacts;
};
