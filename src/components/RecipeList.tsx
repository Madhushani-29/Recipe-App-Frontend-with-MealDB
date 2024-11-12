import { Recipe, RecipeListType } from "@/api/CategoryApi";
import RecipeCard from "./RecipeCard"

type RecipeListPropType = {
    onClickRecipe: (id: string) => void;
    recipes: RecipeListType;
    category: string;
}

const RecipeList = ({ recipes, onClickRecipe, category }: RecipeListPropType) => {
    return (
        <div className="flex flex-row flex-wrap gap-10">
            {recipes.map((recipe: Recipe) => (
                < RecipeCard
                    key={recipe.idMeal}
                    title={recipe.strMeal}
                    category={category}
                    image={recipe.strMealThumb}
                    id={recipe.idMeal}
                    onClickRecipe={onClickRecipe} />
            ))}
        </div>
    )
}

export default RecipeList