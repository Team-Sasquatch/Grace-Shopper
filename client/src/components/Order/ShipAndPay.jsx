import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../App.css";
import { createOrder } from "../../api/orders";
import { createOrderProduct } from "../../api/order_products";
import useAuth from "../../hooks/useAuth";

export default function PaymentDetail() {
  const { user } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const formState = location.state;
  const [fullname, setFullName] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipcode, setZipCode] = useState("");

  function generateConfirmationNumber() {
    //using this just so the code works for testing. Needs to pull number correctly from a sequential-non-duplicate source
    let max = 10000;
    let min = 100;
    let confirmationNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return confirmationNumber;
  }

  async function handleSubmitOrder(e) {
    e.preventDefault();
    try {
      //----------------------------Fill in address information and total cost of order
      let confirmationNumber = generateConfirmationNumber();
      const newOrder = await createOrder(
        user.id,
        "1",
        confirmationNumber,
        "Processing",
        formState.address,
        formState.address2,
        formState.city,
        formState.state,
        formState.zip
      );
      console.log("new order", newOrder);
      //----------------------------Fill in quantity and correct product IDs
      const newOrderProduct = await createOrderProduct(newOrder.data.id, 4, 45);
      console.log("newOrderProductConnection", newOrderProduct);
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
