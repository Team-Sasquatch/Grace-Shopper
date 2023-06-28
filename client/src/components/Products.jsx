import React, { Component, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../App.css";
import UsersPosts from "./UsersPosts";
import useAuth from "../hooks/useAuth";

export default function ProductLandingPage() {
  const navigate = useNavigate();

  const { isLoggedIn, user, token } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="main-div">
      <h2>Welcome {user.username}!</h2>
      <button
        onClick={(e) => {
          navigate("/logout");
        }}
      >
        Logout
      </button>
      <UsersCart />
    </div>
  );
}
