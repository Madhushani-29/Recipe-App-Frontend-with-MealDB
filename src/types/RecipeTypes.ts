export type RecipeType = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
  strCategory?: string;
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
  strSource?: string;
  strImageSource?: null | string;
  // Add the index signature for ingredient and measure properties
  [key: string]: string | null | undefined; // Allows indexing with any string
};
