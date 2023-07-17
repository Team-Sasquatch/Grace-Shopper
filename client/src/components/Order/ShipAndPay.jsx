import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../App.css";
import { createOrder } from "../../api/orders";
import { createOrderProduct } from "../../api/order_products";
import useAuth from "../../hooks/useAuth";

export default function PaymentDetail() {
  const { user } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const formState = location.state;

  let cart = JSON.parse(localStorage.getItem("shoppingCart"));
  let cartTotal=0;
  for (let i=0;i<cart.length;i++){
    cartTotal += (cart[i].quantity*cart[i].price);
  }

  function generateConfirmationNumber() {
    let max = 10000;
    let min = 100;
    let confirmationNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return confirmationNumber;
  }

  async function handleSubmitOrder(e) {
    e.preventDefault();
    try {
      let confirmationNumber = generateConfirmationNumber();
      const newOrder = await createOrder(
        user.id,
        cartTotal.toFixed(2),
        confirmationNumber,
        "Processing",
        formState.address,
        formState.address2,
        formState.city,
        formState.state,
        formState.zip
      );
      for (let i=0;i<cart.length;i++){
        await createOrderProduct(newOrder.data.id,cart[i].id,cart[i].quantity)
      }
      nav("/ThankYou", { state: { confirmationNumber: confirmationNumber } });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="payment-form">
      <h1>Billing Info </h1>
      <form className="payment-form" onSubmit={handleSubmitOrder}>
        <label>Name on Credit Card:</label>
        <input name="fullname" />

        <label>Credit Card Number:</label>
        <input cardnumber="cardnumber" />

        <label>Expiration Date:</label>
        <input expiration="expiration" />

        <label>CVV code:</label>
        <input cvv="cvv" />

        <label>Billing Zip Code:</label>
        <input zip="zipcode" />

        <br></br>

        <button className="nav-link">Submit Order</button>
      </form>
    </div>
  );
}
