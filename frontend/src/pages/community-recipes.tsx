import CardItem from "@/components/card-item";
import { Recipe } from "./my-recipes/myRecipes";
import { useEffect, useState } from "react";
import CardSkeleton from "@/components/ui/card-skeleton";

export default function CommunityRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
     const fetchRecipes = async () => {
       setLoading(true);

       try {
         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`);

         if (!response.ok) {
           throw new Error("Network response was not ok");
         }

         const data = await response.json();
         setRecipes(data.data);

       } catch (error) {
         console.error("Failed to fetch recipes:", error);
       } finally {
         setLoading(false);
       }
     };
     fetchRecipes();
   }, []);
  return (
    <main className=" bg-orange-200 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 ">
          Community Recipes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg ">
          {loading &&
            Array.from({ length: 10 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}

          {!loading && recipes.length === 0 && (
            <h2 className="text-2xl grid col-span-4 text-center font-semibold text-gray-600 py-8">
              there is no recipes in the community yet
            </h2>
          )}

          {recipes.map((recipe) => (
            <CardItem key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </main>
  );
}
