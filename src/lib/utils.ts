import { clsx, type ClassValue } from "clsx";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkIsTokenValid = (): boolean => {
  const token = Cookies.get("accessToken");

  if (!token) {
    return false;
  }

  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    // Check if token is expired
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp > currentTime) {
      toast.error("Session timed out!");
    }

    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Error decoding token", error);
    return false;
  }
};
