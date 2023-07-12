import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import "./AuthForm.css";
import { getCartForUser } from "../../api/cart";

export default function AuthForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, setLoggedIn } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let result;
      if (pathname === "/login") {
        result = await loginUser(username, password);
      } else {
        if (password.length < 6) {
          setError("Password should be at least 6 characters long.");
          return;
        }
        result = await registerUser(
          username,
          password,
          false,
          "",
          "",
          "",
          "",
          ""
        );
      }

      if (result.user && username === result.user.username) {
        setLoggedIn(true);
        setUser(result.user);
        navigate("/products");
        let cart = await getCartForUser();
        localStorage.setItem("shoppingCart", cart);
      } else {
        setError("Incorrect login credentials.");
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="login">
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        {pathname === "/register" ? (
          <h1>Register Below</h1>
        ) : (
          <h1>Welcome Back</h1>
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="registerButton">Enter the Sports Zone</button>

        {pathname === "/register" ? (
          <p>
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        ) : (
          <p>
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        )}
      </form>
    </div>
  );
}
