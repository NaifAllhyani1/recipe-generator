import { useState } from "react";
// import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-center bg-orange-200">
      <main className="container flex flex-wrap items-center justify-between bg-white px-4 sm:px-8 py-4 border rounded-xl shadow-sm m-2">
        <div className="flex items-center flex-shrink-0">
          <span className="font-semibold text-2xl sm:text-3xl tracking-tight text-orange-600">
            FoodieAI
          </span>
        </div>

        <div className="flex items-center lg:order-2">
          <SignedOut>
            <SignInButton>
              <Button className="bg-orange-600 hover:bg-orange-500">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {/* Hamburger menu for mobile */}
          <button
            className="lg:hidden text-orange-600 ml-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        <div
          className={`w-full lg:flex lg:w-auto lg:order-1 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:mx-auto">
            <a
              href="/"
              className="text-gray-500 hover:text-orange-600 text-lg py-2 lg:py-0 lg:px-4"
            >
              Home
            </a>
            <a
              href="/#features"
              className="text-gray-500 hover:text-orange-600 text-lg py-2 lg:py-0 lg:px-4"
            >
              Features
            </a>
            <a
              href="/community-recipes"
              className="text-gray-500 hover:text-orange-600 text-lg py-2 lg:py-0 lg:px-4"
            >
              Community Recipes
            </a>
            <SignedIn>
              <a
                href="/my-recipes"
                className="text-gray-500 hover:text-orange-600 text-lg py-2 lg:py-0 lg:px-4"
              >
                Generate Recipes
              </a>
            </SignedIn>
          </div>
        </div>
      </main>
    </nav>
  );
}
