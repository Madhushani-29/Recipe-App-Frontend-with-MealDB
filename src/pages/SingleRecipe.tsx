import { useGetSingleRecipe } from "@/api/RecipeApi";
import Header from "@/components/Header"
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleRecipe = () => {
    const { id } = useParams();
    const { isLoading, recipe } = useGetSingleRecipe(id || "");

    useEffect(() => {
        console.log("recipes are: ", recipe);
    }, [recipe]);

    return (
        <div className="bg-primary-100 min-h-screen flex flex-col items-stretch">
            <Header />
            <div className="mt-8  px-8 md:px-14 lg:px-28 ">
                {isLoading
                    ? <p>Loading</p>
                    : <p>{id}</p>}
            </div>
        </div>
    )
}

export default SingleRecipe