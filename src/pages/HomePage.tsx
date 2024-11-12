import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useGetRecipesByCategory } from "@/api/RecipeApi";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLoading: isCategoriesLoading, categories } = useGetCategories();
  const [currentCategory, setCurrentCategory] = useState<string | undefined>();
  const { isLoading: isRecipesLoading, recipes } = useGetRecipesByCategory(currentCategory || "Beef");

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
                />
              )
            )}
          </TabsContent>

          <TabsContent value="favourites">
            <Card className="bg-transparent " >
              <CardHeader>
                <CardTitle>Favourites</CardTitle>
                <CardDescription>
                  Make changes to your account here. Click save when you're done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories?.map((category) => (
                  <p key={category}>{category}</p>
                ))}

              </CardContent>
              <CardFooter>
                <Button>Save changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default HomePage;
