import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

export default function PaymentDetail() {
  const [fullname, setFullName] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipcode, setZipCode] = useState("");

  return (
    <div className="payment-form">
      <h1>Billing Info </h1>
      <form
        className="payment-form"
        onSubmit={async (e) => {
          e.preventDefault();
          await PaymentDetail(fullname, cardnumber, expiration, cvv, zipcode);
        }}
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

        <Link to="/ThankYou">
          <button className="nav-link">Submit Order</button>
        </Link>
      </form>
    </div>
  );
}
