import { Recipe } from "@/pages/my-recipes/myRecipes";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export default function CardItem({recipe}: {recipe: Recipe}) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <img
          src={recipe?.image_url!}
          alt={recipe?.dish_name}
          className="w-full h-48 object-cover rounded-lg"
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
