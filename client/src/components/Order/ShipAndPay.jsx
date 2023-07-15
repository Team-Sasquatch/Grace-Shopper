import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import { createOrder } from "../../api/orders";
import { createOrderProduct } from "../../api/order_products";
import useAuth from "../../hooks/useAuth";

export default function PaymentDetail() {
  const {user}=useAuth();
  const nav=useNavigate();
  const [fullname, setFullName] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipcode, setZipCode] = useState("");

  let addressInfo=JSON.parse(localStorage.getItem("tempJankSolutionAddress"));
  let cart = JSON.parse(localStorage.getItem("shoppingCart"));
  let cartTotal=0;
  for (let i=0;i<cart.length;i++){
    cartTotal += (cart[i].quantity*cart[i].price);
  }

  function generateConfirmationNumber() {
    //-----------------------------using this just so the code works for testing. Needs to pull number correctly from a sequential-non-duplicate source
    let max = 10000;
    let min = 100;
    let confirmationNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return confirmationNumber;
  }

  async function handleSubmitOrder(e){
    e.preventDefault();
    try {
      if (addressInfo){
        const newOrder = await createOrder(user.id,cartTotal.toFixed(2),generateConfirmationNumber(),'Processing',addressInfo.address,addressInfo.address2,addressInfo.city,addressInfo.state,addressInfo.zipcode);
        localStorage.removeItem("tempJankSolutionAddress");
        console.log('new order',newOrder);
        for (let i=0;i<cart.length;i++){
          await createOrderProduct(newOrder.data.id,cart[i].id,cart[i].quantity)
        }
        nav("/ThankYou");
      }
      
    } catch (error) {
      console.error(error)
    }
    
  }

  return (
    <div className="payment-form">
      <h1>Billing Info </h1>
      <form
        className="payment-form"
        onSubmit={handleSubmitOrder}
      >
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
