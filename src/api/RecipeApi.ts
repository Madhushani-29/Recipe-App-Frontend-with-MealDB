import { checkIsTokenValid } from "@/lib/utils";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { toast } from "sonner";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type Recipe = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type RecipeListType = Recipe[];

export type GetsRecipeRequest = {
  id: string;
};

export const useGetRecipesByCategory = (id: string) => {
  const getRecipesByCategoryRequest = async ({
    id,
  }: GetsRecipeRequest): Promise<RecipeListType> => {
    const isAuthenticate = checkIsTokenValid();

    if (!isAuthenticate) {
      throw new Error("Session timed out or token invalid. Login first!");
    }

    const token = Cookies.get("accessToken");

    const response = await fetch(`${VITE_API_BASE_URL}/api/category/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return response.json();
  };

  const {
    data: recipes,
    isLoading,
    error,
  } = useQuery(["fetchRecipes", id], () => getRecipesByCategoryRequest({ id }));

  if (error) {
    toast.error(error.toString());
  }

  return { recipes, isLoading };
};

export const useGetSingleRecipe = (id: string) => {
  const getSingleRecipeRequest = async ({
    id,
  }: GetsRecipeRequest): Promise<RecipeData> => {
    const isAuthenticate = checkIsTokenValid();

    if (!isAuthenticate) {
      throw new Error("Session timed out or token invalid. Login first!");
    }

    const token = Cookies.get("accessToken");

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/recipes/recipe/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    return data.recipe;
  };

  const {
    data: recipe,
    isLoading,
    error,
  } = useQuery(["fetchRecipeDetails", id], () =>
    getSingleRecipeRequest({ id })
  );

  if (error) {
    toast.error(error.toString());
  }

  return { recipe, isLoading };
};

type RecipeData = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  ingredients: Ingredient[];
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
};

type Ingredient = {
  strIngredient: string;
  strMeasure: string;
};
