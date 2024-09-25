import { Recipe } from "@/pages/my-recipes/myRecipes";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Loader2 } from "lucide-react";

export default function CardItem({ recipe }: { recipe: Recipe }) {
  console.log(`../../../backend${recipe?.image_url!}`);
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}${recipe?.image_url!}`} 
          alt={recipe?.dish_name}
          loading="lazy"
          className="w-full h-48 object-cover rounded-lg"
          onLoad={() => <Loader2 className="w-10 h-10 animate-spin" />}
        />
      </CardHeader>
      <CardContent className="space-y-2 ">
        <CardTitle className="text-lg font-semibold">
          {recipe.dish_name}
        </CardTitle>
        <p className="text-sm text-gray-500">{recipe.dish_description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-gray-500">{recipe.cuisine}</p>
        <Button className="bg-orange-600 hover:bg-orange-500" size="sm">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );
}
