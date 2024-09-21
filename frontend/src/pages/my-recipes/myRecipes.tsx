import { GenerateModal } from "./generate-modal";

export default function MyRecipes() {
  return (
    <main className=" bg-orange-200 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            My Recipes
          </h1>
          <GenerateModal />
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center min-h-[300px]">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">
            You have no recipes yet
          </h2>
          <p className="text-gray-500 text-center mb-4">
            Start by generating a new recipe or adding your own!
          </p>
          <GenerateModal />
        </div>
      </div>
    </main>
  );
}
