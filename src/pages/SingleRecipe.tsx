import { useGetSingleRecipe } from "@/api/RecipeApi";
import Header from "@/components/Header";
import InstructionsList from "@/components/InstructionsList";
import { RecipeDataType } from "@/types/RecipeTypes";
import { Cookie, CupSoda, MapPin, ShoppingBasket, Tags, Youtube } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const SingleRecipe = () => {
    const { id } = useParams();
    const { isLoading, recipe }: { isLoading: boolean, recipe: RecipeDataType | null } = useGetSingleRecipe(id || "");

    useEffect(() => {
        console.log("recipes are: ", recipe);
    }, [recipe]);

    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe?.[`strIngredient${i}`];
        const measure = recipe?.[`strMeasure${i}`];
        if (ingredient) {
            ingredientsList.push(`${measure} ${ingredient}`);
        }
    }

    const ingredientsString = ingredientsList.join(', ');

    return (
        <div className="bg-primary-100 min-h-screen flex flex-col items-stretch">
            <Header />
            <div className="px-8 md:px-14 lg:px-28 mt-14">
                {isLoading && <div>Loading</div>}
                {recipe && (
                    <div>

                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2">
                                <img src={recipe.strMealThumb}
                                    alt="Image description"
                                    className="w-full h-full object-cover rounded-xl" />
                            </div>
                            <div className="w-full md:w-1/2 md:py-10 md:px-16">
                                <h2 className="text-6xl font-bold font-sour pb-5">{recipe.strMeal}</h2>
                                <div className="flex flex-row flex-wrap gap-3 pb-4">
                                    <Cookie color="#ae2d2d" />
                                    <p className="text-gray-700 text-lg"><strong>Category: </strong>{recipe.strCategory}</p>
                                </div>
                                <div className="flex flex-row flex-wrap gap-3 pb-4">
                                    <MapPin color="#145e71" />
                                    <p className="text-gray-700 text-lg"><strong>Area: </strong>{recipe.strArea}</p>
                                </div>
                                {recipe.strTags
                                    && <div className="flex flex-row flex-wrap gap-3 pb-4">
                                        <Tags color="#2dae72" />
                                        <p className="text-gray-700 text-lg"><strong>Tags: </strong>{recipe.strTags}</p>
                                    </div>}
                                {recipe.strDrinkAlternate
                                    && <div className="flex flex-row flex-wrap gap-3 pb-3">
                                        <CupSoda color="#ae782d" />
                                        <p className="text-gray-700 text-lg"><strong>Drink Alternatives: </strong>{recipe.strDrinkAlternate}</p>
                                    </div>}
                                <div className="flex flex-row flex-wrap gap-3 mb-3">
                                    <div className="flex flex-row flex-wrap gap-3">
                                        <ShoppingBasket color="#d4f434" />
                                        <p className="text-gray-700 text-lg"><strong>Ingredients: </strong></p>
                                    </div>
                                    <p className="text-gray-700 text-lg pl-9 -mt-3">{ingredientsString}</p>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <Youtube color="#e60000" />
                                    <Link to={recipe.strYoutube} className="text-base">{recipe.strYoutube}</Link>
                                </div>
                            </div>
                        </div>

                        <InstructionsList instructions={recipe.strInstructions} />

                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleRecipe;
