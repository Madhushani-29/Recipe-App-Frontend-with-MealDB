import { Heart } from "lucide-react";

type RecipeCard = {
    title: string;
    image: string;
    category: string;
}
const RecipeCard = ({ title, image, category }: RecipeCard) => {
    return (
        <div className="w-44 h-60 rounded-3xl">
            <img src={image} className="rounded-3xl" />
            <div className="flex flex-row flex-wrap gap-2 pt-2 pb-1">
                <p>{category}</p>
                <Heart className="w-5 text-primary" />
            </div>
            <p className="font-semibold">{title}</p>
        </div>
    )
}

export default RecipeCard