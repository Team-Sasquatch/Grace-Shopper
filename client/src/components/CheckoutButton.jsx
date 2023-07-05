import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../checkoutButton.css";
import ShoppingCartIcon from "../assets/shopping-cart-outline.svg";

const CheckoutButton = () => {
  let checkoutCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  return (
    <div className="checkout-button">
      <Link to="/checkout" className="checkout-button-link">
        <img src={ShoppingCartIcon} className="cart-icon" />
        Cart
      </Link>
    </div>
  );
};

export default CheckoutButton;
