import { checkIsTokenValid } from "@/lib/utils";
import {
  GetsRecipeRequest,
  RecipeDataType,
  RecipeListType,
} from "@/types/RecipeTypes";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const getFavouriteRecipesRequest = async (): Promise<RecipeListType> => {
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

export const useAddToFavourites = () => {
  // initialize queryClient
  // hook gives you access to the query client, which allows you to access cache and trigger refetching or invalidating queries
  const queryClient = useQueryClient();
  const addToFavouritesRequest = async (recipeId: string) => {
    const isAuthenticate = checkIsTokenValid();

    if (!isAuthenticate) {
      throw new Error("Session timed out or token invalid. Login first!");
    }

    const token = Cookies.get("accessToken");

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/recipes/favourites/add`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to add to favourites!");
    }

    return response.json();
  };

  const {
    mutateAsync: addToFavourites,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(addToFavouritesRequest, {
    // once the mutation is successful, trigger a refetch of the useGetFavouriteRecipes query
    // which will give you the updated list of favourite recipes
    // invalidateQueries method marks the query with the key "fetchFavouriteRecipes" as stale
    // React Query will refetch the data the next time this query is accessed
    onSuccess: () => {
      queryClient.invalidateQueries("fetchFavouriteRecipes");
      toast.success("Recipe added to favourites!");
    },
    onError: () => {
      toast.error("Failed to add to favourites!");
      reset();
    },
  });

  return { addToFavourites, isLoading, isSuccess, error };
};

export const useRemoveFromFavourites = () => {
  const queryClient = useQueryClient();
  const removeFromFavouritesRequest = async (recipeId: string) => {
    const isAuthenticate = checkIsTokenValid();

    if (!isAuthenticate) {
      throw new Error("Session timed out or token invalid. Login first!");
    }

    const token = Cookies.get("accessToken");

    const response = await fetch(
      `${VITE_API_BASE_URL}/api/recipes/favourites/remove`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to remove from favourites!");
    }

    return response.json();
  };

  const {
    mutateAsync: removeFromFavourites,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(removeFromFavouritesRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchFavouriteRecipes");
      toast.success("Recipe removed from favourites!");
    },
    onError: () => {
      toast.error("Failed to remove from favourites!");
      reset();
    },
  });

  return { removeFromFavourites, isLoading, isSuccess, error };
};
