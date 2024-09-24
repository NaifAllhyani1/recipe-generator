import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LandingPage from "./pages/landingPage/landing-page";
import SignUpPage from "./pages/auth/Signup";
import Login from "./pages/auth/login";
import MyRecipes from "./pages/my-recipes/myRecipes";
import CommunityRecipes from "./pages/community-recipes";


function App() {
  const location = window.location.pathname;
  console.log(location);
  return (
    <Router>
      {location!== "/signup" && location !== "/login" && (
        <Navbar />
      )}
      <Routes>
        {/* Define routes for LandingPage and SignupPage */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/my-recipes" element={<MyRecipes />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/community-recipes" element={<CommunityRecipes />} />
      </Routes>
    </Router>
  );
}

export default App;
