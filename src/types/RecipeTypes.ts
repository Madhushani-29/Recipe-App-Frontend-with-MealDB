export type RecipeType = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type RecipeListType = RecipeType[];

export type GetsRecipeRequest = {
  id: string;
};

export type RecipeDataType = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  ingredients: IngredientType[];
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};

type IngredientType = {
  strIngredient: string;
  strMeasure: string;
};
