import React, { useState, useEffect } from "react";
import getAllProducts from "../api/products";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

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

  contents.push(submitForm());

  return contents;
}

function submitForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("You have submitted the form.");
    git;
  };

  return (
    <div className="wrapper">
      <h1>Shipping Info</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input name="name" />
          </label>
          <label>
            <p>Address1</p>
            <input address="address" />
          </label>
          <label>
            <p>Address/ apartment number</p>
            <input address2="address" />
          </label>
          <label>
            <p>City</p>
            <input city="city" />
          </label>
          <label>
            <p>State</p>
            <input state="state" />
          </label>
          <label>
            <p>Zip</p>
            <input zip="zip" />
          </label>
        </fieldset>
        <Link to="/payment">
          <button className="nav-link">Submit Details</button>
        </Link>
      </form>
    </div>
  );
}
