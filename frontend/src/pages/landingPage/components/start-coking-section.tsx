import { Button } from "@/components/ui/button";

export default function StartCoking() {
  return (
    <section className="container mx-auto">
      <div className=" flex flex-col gap-3 items-center justify-center">
        <h1 className="text-5xl font-extrabold text-gray-900 ">
          Ready to start cooking?
        </h1>
        <h1 className="text-5xl font-extrabold text-orange-600 ">
          Try our AI recipe generator!
        </h1>
        <div className="flex items-center gap-4 mt-10">
          <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 md:py-4 md:text-lg md:px-10">
            <a href="/my-recipes">Start Cooking</a>
          </Button>
       
        </div>
      </div>
    </section>
  );
}
