import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import CheckoutButton from "./components/CheckoutButton";
import EquipmentComponent from "./components/Equipment";
import ApparelComponent from "./components/Apparel";

//comment
//comment 2
function App() {
  const [healthMsg, setHealthMsg] = useState(null);
  const [err, setErr] = useState(null);

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

  return (
    <div>
      <h1>Sasquatch Sports</h1>
      {healthMsg && <p>{healthMsg}</p>}
      {err && <p>{err}</p>}
      <Nav />
      <CheckoutButton />
      <LoginButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProductsComponent />} />
        <Route path="/login" element={<AuthForm />} />

        <Route path="/sports" element={<SportsComponent />} />
        <Route path="/supplements" element={<SupplementsComponent />} />
        <Route path="/equipment" element={<EquipmentComponent />} />
        <Route path="/apparel" element={<ApparelComponent />} />
        <Route path="/overview" element={<ProductOverview />} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default App;
