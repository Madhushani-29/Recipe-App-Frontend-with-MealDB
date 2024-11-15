import { RecipeCardPropType } from "@/types/ComponentPropTypes";
import { Heart, Trash2 } from "lucide-react";

const RecipeCard = ({ title, image, category, id, onClickRecipe, isFavourite, onClickAddOrRemove }: RecipeCardPropType) => {
    return (
        <div className="w-44 h-60 rounded-3xl" >
            <img src={image} className="rounded-3xl" onClick={() => onClickRecipe(id)} />
            <div className="flex flex-row flex-wrap gap-2 pt-2 pb-1">
                <p>{category}</p>
                {isFavourite
                    ? <Trash2
                        className="w-5 text-primary"
                        onClick={() => onClickAddOrRemove(id)} />
                    : <Heart
                        className="w-5 text-primary"
                        onClick={() => onClickAddOrRemove(id)} />
                }
            </div>
            <p className="font-semibold">{title}</p>
        </div>
    )
}

export default RecipeCard