import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center bg-orange-200 ">
      <main className="container flex items-center justify-between bg-white px-8 py-4 border rounded-xl shadow-sm m-2">
        <div className="flex items-center flex-shrink-0  mr-6">
          <span className="font-semibold text-3xl tracking-tight text-orange-600">
            FoodieAI
          </span>
        </div>

        <div className="flex justify-around gap-3 w-1/3">
          <a href="#" className="text-gray-500 hover:text-orange-600 text-lg">
            {" "}
            Home
          </a>
          <a
            href="#features"
            className="text-gray-500 hover:text-orange-600 text-lg "
          >
            {" "}
            Featurs
          </a>
          <a href="#" className="text-gray-500 hover:text-orange-600 text-lg ">
            {" "}
            Recipes
          </a>
        </div>

        <Button className="bg-orange-600 font-medium hover:bg-orange-500">
          Get Started
        </Button>
      </main>
    </nav>
  );
}
