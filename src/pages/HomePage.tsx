import icons from "@/constants/icons";
import { useLogout } from "@/hooks/useLogout";
import { LogOut } from "lucide-react";
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
import RecipeCard from "@/components/RecipeCard";

const HomePage = () => {
  const logout = useLogout();
  const { isLoading, categories } = useGetCategories();
  const [currentCategory, setCurrentCategory] = useState<string>();

  // only run when loading
  useEffect(() => {
    // set currentCategory to the first item in categories once categories are loaded
    if (categories && categories.length > 0) {
      setCurrentCategory(categories[0]);
    }
  }, [categories]);

  const onClickLogout = () => {
    const confirm = window.confirm("Are you sure want to logout?");
    if (confirm) {
      logout();
    }
  };

  if (isLoading) {
    return (
      <div>Loading</div>
    )
  }

  return (
    <div className="bg-primary-100 h-screen">
      <Tabs defaultValue="home">
        <div className="bg-white w-screen py-3 flex justify-between items-center h-full flex-wrap gap-4  px-5 md:px-10 lg:px-24 ">
          <img src={icons.themeIcon} alt="theme icon" className="w-30" />
          <TabsList className="grid grid-cols-2 bg-transparent">
            <TabsTrigger className="text-base font-semibold" value="home">HOME</TabsTrigger>
            <TabsTrigger className="text-base font-semibold" value="favourites">FAVOURITE</TabsTrigger>
          </TabsList>
          <LogOut onClick={onClickLogout} />
        </div>

        <div className="mt-8  px-8 md:px-14 lg:px-28 ">
          <TabsContent value="home">
            {categories && currentCategory &&
              <CategotyList
                categories={categories}
                currentCategory={currentCategory}
                setCurrentCategory={setCurrentCategory} />
            }
            <RecipeCard
              title="Chicken Noodle Soup"
              category="Soup"
              image="https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg" />
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
