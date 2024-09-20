import Feature, { FeatureProps } from "./feature-item";

export default function Featurs() {

  const features: FeatureProps[] = [
    {
      icon: "public/chef.png",
      title: "Personalized Recipe Recommendations",
      description: "Get personalized recipe recommendations based on your ingredients, preferences, and dietary restrictions. Let our AI chef inspire your next meal!",
    },
    {
      icon: "public/fork.png",
      title: "Ingredient-Based Search",
      description: "Find recipes based on your ingredients. Discover new flavors and textures with our ingredient-based search feature. Discover new flavors and textures with our ingredient-based search feature.",
    },
    {
      icon: "public/leaves.png",
      title: "Dietary Restrictions",
      description: "Unlock the power of your body with our innovative AI-powered platform. Our AI-powered platform makes cooking a whole lot easier."
    },

    {
      icon: "public/clock.png",
      title: "Quick and Easy Recipes",
      description: "Find recipes that fit your schedule. Our AI-powered platform makes cooking a whole lot easier.",
    }

  ]


  return (
    <section
      id="features"
      className="flex items-center justify-center bg-white pb-12"
    >
      <div className="container mx-auto flex items-center justify-center mt-12 w-full ">
        <div className="flex flex-col justify-center items-center  gap-5">
          <p className="text-2xl font-extrabold text-orange-600 ">Features</p>
          <h1 className="text-4xl font-extrabold text-gray-900 ">
            Cook Smarter, not harder
          </h1>
          <p className="text-lg text-gray-500 ">
            Our AI-powered platform makes cooking a whole lot easier.
          </p>

          {/* Featurs */}
          <div className="grid grid-cols-2 gap-12 gap-x-48 place-items-center w-full">
            {features.map((feature, index) => (
              <Feature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
