import React, { useState, useEffect } from "react";
import getAllProducts from "../api/products";
import { Link, useNavigate } from "react-router-dom";

export default function Confirmation() {
  // Retrieve the shoppiingCart from storage
  var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));

  var contents = shoppingCart.map((prod, index) => {
    return (
      <div>
        <h2>{prod.name}</h2>
        <p>Quantity: {prod.quantity}</p>
        <p>Price: $ {prod.price}</p>
      </div>
    );
  });

  var totalCost = shoppingCart.reduce((acc, prod) => {
    return acc + prod.price * prod.quantity;
  }, 0);

  contents.push(<p>Total Cost: $ {totalCost}</p>);

  return contents;
}
