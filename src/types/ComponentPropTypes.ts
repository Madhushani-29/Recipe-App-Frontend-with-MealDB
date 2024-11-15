import { ReactNode } from "react";
import { RecipeListType } from "./RecipeTypes";

export type CategotyListPropType = {
  categories: string[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
};

export type HeaderPropType = {
  children?: ReactNode;
};

export type LoadingButtonPropType = {
  className?: string;
};

export type PasswordInputPropType = {
  FieldName: string;
  label: string;
  className?: string;
};

export type RecipeCardPropType = {
  title: string;
  image: string;
  category: string;
  id: string;
  onClickRecipe: (id: string) => void;
  onClickAddOrRemove: (id: string) => void;
  isFavourite: boolean;
};

export type RecipeListPropType = {
  onClickRecipe: (id: string) => void;
  onClickAddOrRemove: (id: string) => void;
  recipes: RecipeListType;
  category?: string;
  isFavourite: boolean;
};

export type InstructionsListPropType = {
  instructions: string;
};
