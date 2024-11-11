import { checkIsTokenValid } from "@/lib/utils";
import Cookies from "js-cookie";
import { useQuery } from "react-query";
import { toast } from "sonner";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type Categories = string[];

export const useGetCategories = () => {
  const getCategoriesRequest = async (): Promise<Categories> => {
    const isAuthenticate = checkIsTokenValid();

    if (!isAuthenticate) {
      throw new Error("Session timed out or token invalid. Login first!");
    }

    const token = Cookies.get("accessToken");

    const response = await fetch(`${VITE_API_BASE_URL}/api/category`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    // Assuming the actual categories are in `data.categories`
    if (Array.isArray(data.categories)) {
      return data.categories;
    } else {
      throw new Error("Unexpected data format");
    }
  };

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery("fetchCategories", getCategoriesRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { categories, isLoading };
};
