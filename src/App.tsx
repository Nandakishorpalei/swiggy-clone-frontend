import "@fortawesome/fontawesome-free/css/all.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import useAuth from "./Hooks/useAuth";
import { Loader } from "./UI-Components/Loader/Loader";
import { ToastUI } from "./UI-Components/Toast/ToastUI";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { Home } from "./Components/Home/Home";
import { CityBasedRestaurants } from "./Components/Restaurants/CityBasedRestaurants";
import { FoodBasedRestaurants } from "./Components/Restaurants/FoodBasedRestaurants";
import { RestaurantDishes } from "./Components/RestaurantDishes/RestaurantDishes";
import { CuisineRestaurants } from "./Components/CuisineRestaurants/CuisineRestaurants";
import { Checkout } from "./Components/Checkout/Checkout";
import { Help } from "./Components/Help/Help";
import { Profile } from "./Components/Profile/Profile";
import { LoadScript } from "@react-google-maps/api";
import { Login } from "./Components/Login/Login";

// Define the type for libraries
type Library = "places";

// Get the API key and assert it will be a string (or provide a fallback)
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string; // assert it's a string

const libraries: Library[] = ["places"];

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <div>
        <ToastUI />
        <Login />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:city" element={<CityBasedRestaurants />} />
          <Route path="/food/:foodname" element={<FoodBasedRestaurants />} />
          <Route
            path="/restaurant/:restaurantid"
            element={<RestaurantDishes />}
          />
          <Route path="/restaurant" element={<CityBasedRestaurants />} />
          <Route
            path="/cuisine/:cuisinename"
            element={<CuisineRestaurants />}
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/help" element={<Help />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </LoadScript>
  );
}

export default App;
