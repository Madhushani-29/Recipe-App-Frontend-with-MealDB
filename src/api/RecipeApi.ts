import { checkIsTokenValid } from "@/lib/utils";
import {
  GetsRecipeRequest,
  RecipeDataType,
  RecipeListType,
} from "@/types/RecipeTypes";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { toast } from "sonner";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
  }: GetsRecipeRequest): Promise<RecipeDataType> => {
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

    return data.recipe || null;
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

  return { recipe: recipe || null, isLoading };
};

export const useGetFavouriteRecipes = () => {
  const getFavouriteRecipesRequest =
    async (): Promise<RecipeListType> => {
      const isAuthenticate = checkIsTokenValid();

      if (!isAuthenticate) {
        throw new Error("Session timed out or token invalid. Login first!");
      }

      const token = Cookies.get("accessToken");

      const response = await fetch(
        `${VITE_API_BASE_URL}/api/recipes/favourites`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text(); 
        throw new Error(errorMessage || "Failed to fetch favourites");
      }

      const data = await response.json();
      return data.favourites;
    };

  const {
    data: favourites,
    isLoading,
    error,
  } = useQuery("fetchFavouriteRecipes", getFavouriteRecipesRequest);

  if (error) {
    toast.error(error instanceof Error ? error.message : "An error occurred");
  }

  return { favourites, isLoading };
};
