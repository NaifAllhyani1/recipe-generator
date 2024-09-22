import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type FormData = {
  ingredients: string[] | null;
  cuisine: string | null;
  allergies: string[] | null;
};

type ErrorData = {
  ingredients: boolean;
  cuisine: boolean;
  allergies: boolean;
};

export function GenerateModal() {
  const [hasAllIngredients, setHasAllIngredients] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ingredients: null,
    cuisine: null,
    allergies: null,
  });

  const [error, setError] = useState<ErrorData>({
    ingredients: false,
    cuisine: false,
    allergies: false,
  });

const validateForm = () => {
    // If user has all ingredients, validate only the cuisine
  if (hasAllIngredients) {
    if (!formData.cuisine || formData.cuisine.length === 0) {
      setError((prev) => ({ ...prev, cuisine: true }));
      return false;
    } else {
      setError((prev) => ({ ...prev, cuisine: false }));
    }
  } else {
    // If user doesn't have all ingredients, validate only the ingredients
    if (!formData.ingredients || formData.ingredients.length === 0) {
      setError((prev) => ({ ...prev, ingredients: true }));
      return false;
    } else {
      setError((prev) => ({ ...prev, ingredients: false }));
    }
  }

  // If validation passes
  return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    console.log(hasAllIngredients)
    if (isValid) {
      console.log(formData);

      console.log("Form is valid");
    } else {
      console.log("Form is invalid");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-500">
          Generate Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Recipe</DialogTitle>
          <DialogDescription>
            Generate a personalized recipe based on your preferences.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-3">
          {!hasAllIngredients && (
            <div className="space-y-1">
              <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
              <Input
                type="text"
                id="ingredients"
                placeholder="eg. olive oil, garlic, chicken, salt, pepper"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ingredients: e.target.value.split(","),
                  })
                }
              />
              {error.ingredients && (
                <p className="text-red-500 text-sm ">Please enter ingredients</p>
              )}
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="cuisine">Cuisine</Label>
            <Input
              type="text"
              id="cuisine"
              placeholder="eg. Italian, Chinese, Mexican"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cuisine: e.target.value,
                })
              }
            />
            {error.cuisine && (
              <p className="text-red-500 text-sm ">Please enter cuisine</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="allergies">Allergies</Label>
            <Input
              type="text"
              id="allergies"
              placeholder="eg. gluten, dairy, nuts"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  allergies: e.target.value.split(","),
                })
              }
            />
          </div>

          <div className="flex items-center space-x-2 ">
            {/* this check box means i have all the ingredients */}
            <Checkbox
              id="ihave-all"
              onClick={() => setHasAllIngredients(!hasAllIngredients)}
            />
            <Label htmlFor="ihave-all">
              {" "}
              I have everything / I can get any ingredient
            </Label>
          </div>

          {/* add a submit button */}
          <DialogFooter>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-500">
              Generate
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
