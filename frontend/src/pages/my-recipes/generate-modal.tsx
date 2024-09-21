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

export function GenerateModal() {
  const [isIngredients, setIsIngredients] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-500">Genreate Recipe</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Recipe</DialogTitle>
          <DialogDescription>
            Generate a personalized recipe based on your preferences.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {!isIngredients ? (
            <div className="space-y-2">
              <Label>Ingredients (comma-separated)</Label>
              <Input
                placeholder="eg. olive oil, garlic, chicken, salt, pepper"
                className="w-full"
              />
            </div>
          ) : null}
          <div className="space-y-2">
            <Label>Cuisine</Label>
            <Input
              placeholder="eg. Italian, Mexican, Chinese, Greek"
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label>Allergies (comma-separated, optional)</Label>
            <Input placeholder="eg. nuts, gluten, dairy" className="w-full" />
          </div>
          <div className="flex items-center space-x-2">
            {/* this check box means i have all the ingredients */}
            <Checkbox id="ihave-all" onClick={() => setIsIngredients(!isIngredients)} />
            <Label htmlFor="ihave-all">
              {" "}
              I have everything / I can get any ingredient
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit" className="bg-orange-600 hover:bg-orange-500">
            Generate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
