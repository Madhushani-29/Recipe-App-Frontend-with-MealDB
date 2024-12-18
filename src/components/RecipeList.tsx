import { RecipeType } from "@/types/RecipeTypes"
import RecipeCard from "./RecipeCard"
import { RecipeListPropType } from "@/types/ComponentPropTypes"

const RecipeList = ({ recipes, onClickRecipe, category, isFavourite, onClickAddOrRemove }: RecipeListPropType) => {
    return (
        <div className="flex flex-row flex-wrap gap-10">
            {recipes.map((recipe: RecipeType) => (
                < RecipeCard
                    key={recipe.idMeal}
                    title={recipe.strMeal}
                    category={category || recipe.strCategory || ""}
                    image={recipe.strMealThumb}
                    id={recipe.idMeal}
                    isFavourite={isFavourite}
                    onClickRecipe={onClickRecipe}
                    onClickAddOrRemove={onClickAddOrRemove} />
            ))}
        </div>
    )
}

export default RecipeList