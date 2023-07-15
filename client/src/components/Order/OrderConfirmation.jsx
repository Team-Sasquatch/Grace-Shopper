import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import useAuth from "../../hooks/useAuth";

export default function Confirmation() {

  var shoppingCart = JSON.parse(localStorage.getItem("shoppingCart"));
  const navigate = useNavigate();
  const [formState, setFormState] = useState({});

  var contents = shoppingCart.map((prod, index) => {
    return (
      <div key={index}>
        <h2>{prod.name}</h2>
        <p>Quantity: {prod.quantity}</p>
        <p>Price: $ {prod.price}</p>
      </div>
    );
  });

  var totalCost = shoppingCart.reduce((acc, prod) => {
    return acc + prod.price * prod.quantity;
  }, 0);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("You have submitted the form.");
    console.log("my submitted info");
    console.log(event);
    navigate("/payment", { state: formState });
  };

  return (
    <div>
      {contents}
      <p>Total Cost: $ {totalCost}</p>
      <div className="wrapper">
        <h1>Shipping Info</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label>
              <p>Name</p>
              <input name="name" onChange={handleInputChange} />
            </label>
            <label>
              <p>Address1</p>
              <input name="address" onChange={handleInputChange} />
            </label>
            <label>
              <p>Address/ apartment number</p>
              <input name="address2" onChange={handleInputChange} />
            </label>
            <label>
              <p>City</p>
              <input name="city" onChange={handleInputChange} />
            </label>
            <label>
              <p>State</p>
              <input name="state" onChange={handleInputChange} />
            </label>
            <label>
              <p>Zip</p>
              <input name="zip" onChange={handleInputChange} />
            </label>
          </fieldset>
          <button type="submit">Submit Details</button>
        </form>
      </div>
    </div>
  );
}
