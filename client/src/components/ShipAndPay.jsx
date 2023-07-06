import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function PaymentDetail() {
  const [fullname, setFullName] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [zipcode, setZipCode] = useState("");

  return (
    <div className="payment-form">
      <form
        className="payment-form"
        onSubmit={async (e) => {
          e.preventDefault();
          await PaymentDetail(fullname, cardnumber, expiration, cvv, zipcode);
        }}
      >
        <label>Name on CreditCard:</label>
        <textarea
          style={{ padding: "7px" }}
          value={fullname}
          onChange={(event) => setName(event.target.value)}
        />

        <label>Credit Card Number:</label>
        <textarea
          style={{ padding: "7px" }}
          value={cardnumber}
          onChange={(event) => setCard(event.target.value)}
        />

        <label>Expiration Date:</label>
        <textarea
          style={{ padding: "7px" }}
          value={expiration}
          onChange={(event) => setExpiration(event.target.value)}
        />

        <label>CVV code:</label>
        <textarea
          style={{ padding: "7px" }}
          value={cvv}
          onChange={(event) => setCvv(event.target.value)}
        />

        <label>Billing Zip Code:</label>
        <textarea
          style={{ padding: "7px" }}
          value={zipcode}
          onChange={(event) => setZipCode(event.target.value)}
        />

        <br></br>
        {/* submit order button needs to clear local storage and move to thanks page= 
        function clearCart() {
    localStorage.removeItem("shoppingCart");
    setUpdateCheckout(true);
  }*/}
        <Link to="/ThankYou">
          <button className="nav-link">Submit Order</button>
        </Link>
      </form>
    </div>
  );
}
