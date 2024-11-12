import { clsx, type ClassValue } from "clsx";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
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

    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Error decoding token", error);
    return false;
  }
};

export const formatText = (text: string) => {
  const formattedText = text
    .replace(/[\r\n]+/g, "\n") // line breaks
    .replace(/^\d+\s*\.\s+/gm, "") // emove numbering at the start of each line
    .trim() // trim leading/trailing whitespace
    .split("\n") // split into lines based on newline characters
    .filter((_, index) => index % 2 === 0) // filter out lines where index cannot be divided by 2 (only keep even-indexed lines)
    .map((line, index) => {
      if (line) {
        const lineNumber = index + 1;
        // remove default line numbers
        // format them like step 1
        // make step no italic and semi bold
        return `<p class="pb-4"><i class="font-semibold">Step ${lineNumber} :</i> ${line}</p>`;
      }
      return "";
    })
    .join(""); // join all lines into one string
  return formattedText;
};
