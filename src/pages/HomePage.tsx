import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useGetCategories } from "@/api/CategoryApi";
import CategotyList from "@/components/CategotyList";
import { useEffect, useState } from "react";
import RecipeList from "@/components/RecipeList";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useAddToFavourites, useGetFavouriteRecipes, useGetRecipesByCategory, useRemoveFromFavourites } from "@/api/RecipeApi";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoading: isCategoriesLoading, categories } = useGetCategories();
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  const { isLoading: isRecipesLoading, recipes } = useGetRecipesByCategory(currentCategory || "Beef");
  const { isLoading: isFavouritesLoading, favourites } = useGetFavouriteRecipes();
  const { addToFavourites } = useAddToFavourites();
  const { removeFromFavourites } = useRemoveFromFavourites();

  // only run when loading
  useEffect(() => {
    // set currentCategory to the first item in categories once categories are loaded
    if (categories && categories.length > 0) {
      setCurrentCategory(categories[0]);
    }
  }, [categories]);

  const openFullRecipe = (id: string) => {
    navigate(`./recipe/${id}`);
  }

  return (
    <div className="bg-primary-100 h-screen">
      <Tabs defaultValue="home">
        <Header>
          <TabsList className="grid grid-cols-2 bg-transparent">
            <TabsTrigger className="text-base font-semibold" value="home">HOME</TabsTrigger>
            <TabsTrigger className="text-base font-semibold" value="favourites">FAVOURITE</TabsTrigger>
          </TabsList>
        </Header>

        <div className="mt-8  px-8 md:px-14 lg:px-28 ">
          <TabsContent value="home">
            {isCategoriesLoading ? (
              <div>Loading...</div>
            ) : (
              categories && currentCategory && (
                <CategotyList
                  categories={categories}
                  currentCategory={currentCategory}
                  setCurrentCategory={setCurrentCategory}
                />
              )
            )}

            {!isCategoriesLoading && isRecipesLoading ? (
              <div>Loading...</div>
            ) : (
              recipes && currentCategory && (
                <RecipeList
                  onClickRecipe={openFullRecipe}
                  recipes={recipes}
                  category={currentCategory}
                  isFavourite={false}
                  onClickAddOrRemove={addToFavourites}
                />
              )
            )}
          </TabsContent>

          <TabsContent value="favourites">
            {isFavouritesLoading ? (
              <div>Loading...</div>
            ) : (
              favourites && (
                <RecipeList
                  onClickRecipe={openFullRecipe}
                  recipes={favourites}
                  isFavourite={true}
                  onClickAddOrRemove={removeFromFavourites}
                />
              )
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default HomePage;
