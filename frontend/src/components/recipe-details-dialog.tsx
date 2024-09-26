import { Recipe } from "@/pages/my-recipes/myRecipes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function RecipeDetailsDialog({ recipe }: { recipe: Recipe }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-orange-600 hover:bg-orange-500 text-white font-medium px-4 py-2 rounded-lg shadow-lg transition-colors duration-300">
          View Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 bg-slate-200 rounded-lg shadow-xl max-w-3xl max-h-[80vh] mx-auto  overflow-y-scroll scroll-m-96">
        <DialogHeader>
          <div className="flex items-center justify-between my-3">
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              {recipe.dish_name}
            </DialogTitle>
            <p className="text-sm text-white bg-orange-600 rounded-md px-2 py-1 ">
              Recipe #{recipe.id}
            </p>
          </div>
        </DialogHeader>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${recipe.image_url!}`}
          alt={recipe.dish_name}
          className="w-full h-96 object-cover  rounded-lg shadow-md "
        />
        <DialogDescription className="text-gray-700">
          <p className="mb-2">
            <span className="font-semibold text-orange-600">Description:</span>{" "}
            {recipe.dish_description}
          </p>
          <p className="mb-2">
            <span className="font-semibold text-orange-600">Cuisine:</span>{" "}
            {recipe.cuisine ?? "Not specified"}
          </p>
          <p className="mb-4">
            <span className="font-semibold text-orange-600">Ingredients:</span>{" "}
            {recipe.ingredients.join(", ")}
          </p>
          <div className="mb-4">
            <span className="font-semibold text-orange-600">Steps:</span>
            <ul className="list-decimal ml-5 mt-2">
              {recipe.cooking_steps.map((step) => (
                <li key={step.step_number} className="mt-1">
                  {step.step_description}
                </li>
              ))}
            </ul>
          </div>
        </DialogDescription>
        <DialogFooter className="mt-4">
    
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
