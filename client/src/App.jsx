import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Nav from "./components/Nav/Nav";
import LoginButton from "./components/Auth/LoginButton";
import AuthForm from "./components/Auth/AuthForm";
import SportsComponent from "./components/Sports";
import SupplementsComponent from "./components/Supplements";
import AllProductsComponent from "./components/AllProducts";
import ProductOverview from "./components/ProductOverview/ProductOverview";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/Order/OrderConfirmation";
import OrderFulfillment from "./components/Order/OrderFulfillment";
import CheckoutButton from "./components/CheckoutButton";
import EquipmentComponent from "./components/Equipment";
import ApparelComponent from "./components/Apparel";
import useAuth from "./hooks/useAuth";
import { logOut } from "./api/auth";
import PaymentDetail from "./components/ShipAndPay";
import Profile from "./components/Profile";
import CreateAdmin from "./components/AdminPortal/CreateAdmin";
import CreateProduct from "./components/AdminPortal/CreateProduct";
import CreateSport from "./components/AdminPortal/CreateSport";
import SportProducts from "./components/SportProducts";

function App() {
  const [healthMsg, setHealthMsg] = useState(null);
  const [err, setErr] = useState(null);
  const { setLoggedIn, loggedIn, setUser, user } = useAuth();
  const nav = useNavigate();
  // useEffect(() => {
  //   async function checkHealth() {
  //     try {
  //       const response = await fetch("/api/health");
  //       if (!response.ok) {
  //         throw {
  //           message: "Api is Down 😭",
  //         };
  //       }
  //       const { message } = await response.json();
  //       setHealthMsg(message);
  //     } catch (error) {
  //       setErr(error.message);
  //     }
  //   }
  //   checkHealth();
  // }, []);

  function ProtectedComponent(props) {
    if (props.loggedIn === false) {
      return (
        <div>
          <Navigate to="/login" />
        </div>
      );
    } else {
      return <Outlet />;
    }
  }
  function ProtectedAdminComponent(props) {
    if (
      props.loggedIn === false &&
      (props.user.is_admin === false ||
        props.user.is_admin === null ||
        typeof props.user.is_admin === "undefined")
    ) {
      return (
        <div>
          <Navigate to="/" />
        </div>
      );
    } else {
      return <Outlet />;
    }
  }

  async function handleLogout() {
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
        <div className="logout-button">
          <button className="logout-button-link" onClick={handleLogout}>
            Logout
          </button>
          <button className="profile-button" onClick={() => nav("/profile")}>
            My Profile 🤡
          </button>
        </div>
      ) : (
        <LoginButton />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProductsComponent />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sports" element={<SportsComponent />} />
        <Route path="/sport_product/:sportId" element={<SportProducts />} />
        <Route path="/supplements" element={<SupplementsComponent />} />
        <Route path="/equipment" element={<EquipmentComponent />} />
        <Route path="/apparel" element={<ApparelComponent />} />
        <Route path="/overview/:id" element={<ProductOverview />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<OrderConfirmation />} />

        <Route element={<ProtectedComponent loggedIn={loggedIn} />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<ProtectedAdminComponent loggedIn={loggedIn} user={user}/>}>
          <Route path="/admin-users" element={<CreateAdmin/>}/>
          <Route path="/admin-sports" element={<CreateSport/>}/>
          <Route path="/admin-products" element={<CreateProduct/>}/>
        </Route>

        <Route path="/payment" element={<PaymentDetail />} />
        <Route path="/ThankYou" element={<OrderFulfillment />} />
      </Routes>
    </div>
  );
}
export default App;
