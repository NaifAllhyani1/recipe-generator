import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { GenerateModal } from "./generate-modal";
import { useEffect, useState } from "react";
import CardSkeleton from "../../components/ui/card-skeleton";
import LoadingScreen from "@/components/loading-screen";
import CardItem from "@/components/card-item";
import { toast } from "sonner";

export type CookingStep = {
  step_number: number;
  step_description: string;
};

export type Recipe = {
  id: number;
  dish_name: string;
  cuisine: string | null;
  dish_description: string;
  ingredients: string[];
  cooking_steps: CookingStep[];
  image_url: string | null;
  user_id: string;
};

export default function MyRecipes() {
  const { isSignedIn } = useAuth();
  const [recipe, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/user`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        toast("I Successfully fetched your recipes", {
          style: {
            background: "#00C851",
            color: "#fff",
          },
        })
    
        setRecipes(data.data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        toast("Failed to fetch your recipes", {
          style: {
            background: "#FF4444",
            color: "#fff",
          },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [userId]);

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <main className=" bg-orange-200 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            My Recipes
          </h1>
          <GenerateModal
            setLoadingGenerate={setLoadingGenerate}
            loadingGenerate={loadingGenerate}
            setRecipes={setRecipes}
            recipes={recipe}
          />
        </div>

        {recipe.length === 0 && !loadingGenerate ? (
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
              You have no recipes yet
            </h2>
            <p className="text-gray-500 text-center mb-4">
              Start by generating a new recipe or adding your own!
            </p>
            <GenerateModal
              setLoadingGenerate={setLoadingGenerate}
              loadingGenerate={loadingGenerate}
              setRecipes={setRecipes}
              recipes={recipe}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-4 rounded-lg">
            {loading && <LoadingScreen />}
            {loadingGenerate && <CardSkeleton />}

            {recipe.map((recipe) => (
              <CardItem key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
