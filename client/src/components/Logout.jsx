import React, { Component, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Logout() {
  const navigate = useNavigate();

  const { setToken, setUser, setIsLoggedIn } = useAuth();

  useEffect(() => {
    async function redirect() {
      setToken("");
      setUser({});
      setIsLoggedIn(false);
      localStorage.clear();

      setTimeout(() => {
        navigate("/");
      }, 2 * 1000); // 2 seconds
    }
    redirect();
  }, []);

  return (
    <div className="main-div">
      <h1>User successfully logged out!</h1>
    </div>
  );
}
