import { GenerateModal } from "./generate-modal";

export default function MyRecipes() {
  return (
    <main className=" bg-orange-200  h-screen">
      <div className="flex justify-between items-center w-full px-4 space-y-10">
        <h1 className="text-4xl font-bold ">My Recipes</h1>
        <GenerateModal />
      </div>

      <div className="flex items-center justify-center h-1/2">
        <h2 className="text-3xl font-simibold">you have no recipes yet </h2>
      </div>
    </main>
  );
}
