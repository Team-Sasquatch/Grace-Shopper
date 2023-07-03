import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav";
import LoginButton from "./components/LoginButton";
import AuthForm from "./components/AuthForm";
import SportsComponent from "./components/Sports";
import SupplementsComponent from "./components/Supplements";
import AllProductsComponent from "./components/AllProducts";
import ProductOverview from "./components/ProductOverview/ProductOverview";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import CheckoutButton from "./components/CheckoutButton";
import EquipmentComponent from "./components/Equipment";
import ApparelComponent from "./components/Apparel";
import useAuth from "./hooks/useAuth";
import { logOut } from "./api/auth";
function App() {
  const [healthMsg, setHealthMsg] = useState(null);
  const [err, setErr] = useState(null);
  const { setLoggedIn, loggedIn, setUser, user } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    async function checkHealth() {
      try {
        const response = await fetch("/api/health");
        if (!response.ok) {
          throw {
            message: "Api is Down 😭",
          };
        }
        const { message } = await response.json();
        setHealthMsg(message);
      } catch (error) {
        setErr(error.message);
      }
    }
    checkHealth();
  }, []);

  async function handleLogout() {
    console.log("user test: ", user);
    await logOut();
    setUser({ username: "Guest" });
    setLoggedIn(false);
    localStorage.clear();
    nav("/");
  }

  console.log("logged in? ", loggedIn);
  return (
    <div>
      <h1>Sasquatch Sports</h1>
      {healthMsg && <p>{healthMsg}</p>}
      {err && <p>{err}</p>}
      <Nav />
      <CheckoutButton />
      {loggedIn === true ? (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <LoginButton />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProductsComponent />} />

        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />

        <Route path="/sports" element={<SportsComponent />} />
        <Route path="/supplements" element={<SupplementsComponent />} />
        <Route path="/equipment" element={<EquipmentComponent />} />
        <Route path="/apparel" element={<ApparelComponent />} />
        <Route path="/overview/:id" element={<ProductOverview />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />
      </Routes>
    </div>
  );
}

export default App;
