import Featurs from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import StartCoking from "./components/start-coking-section";

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-28 bg-orange-200 ">
      <Hero />
      <Featurs />
      <StartCoking />
      <Footer />
      <h1>hello</h1>
    </div>
  
  );
}
