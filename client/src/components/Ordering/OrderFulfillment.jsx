import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";

export default function OrderFulfillment() {
  const [num, setNum] = useState(0);

  useEffect(() => {
    setNum(generateConfirmationNumber());
  }, []);

  // Clear the  shopping cart
  localStorage.removeItem("shoppingCart");

  return (
    <div className="order-form">
      <h1 className="thank-you">THANKS FOR YOUR ORDER</h1>
      <h2>Sasquatch number {num}</h2>

      <p>
        We appreciate your order. Please allow 2-3 business days for our team of
        Sasquatches to grab your order with their giant hands. Once they have
        shipped out your items, you will receive an email with tracking info.
      </p>
      {<Footer />}
    </div>
  );
}

function generateConfirmationNumber() {
  let max = 10000;
  let min = 1000;

  let confirmationNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return confirmationNumber;
}

function Footer() {
  return (
    <div className="footer">
      <ul className="footlinks">
        <Link to="/">
          <button className="link">Contact Us</button>
        </Link>
        <Link to="/">
          <button className="link">Social Media</button>
        </Link>
        <Link to="https://github.com/Team-Sasquatch/Grace-Shopper/people">
          <button className="link">GitHub Repo</button>
        </Link>
      </ul>
    </div>
  );
}
