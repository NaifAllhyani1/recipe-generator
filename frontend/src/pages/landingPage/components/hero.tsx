import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="flex items-center justify-center mt-20">
      <div className="container mx-auto flex items-center justify-center  ">
        <div className="flex flex-col justify-center items-center text-center gap-4">
          <h1 className="text-6xl font-extrabold text-gray-900 ">
            Discover delicious <br />{" "}
            <span className="text-orange-600">AI-powered resipes</span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Get personalized recipe recommendations based on your ingredients,
            preferences, and dietary restrictions. Let our AI chef inspire your
            next meal!
          </p>
          <div className="flex gap-4">
            <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10">
              <a href="/my-recipes">Start Cooking</a>
            </Button>
            <Button
              variant="outline"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 md:py-4 md:text-lg md:px-10"
            >
              <a href="#features">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
