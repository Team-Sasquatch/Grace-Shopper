import React, { useState, useEffect } from "react";
import getAllProducts from "../../api/products";
import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import useAuth from "../../hooks/useAuth";

export default function Confirmation() {
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

export function submitForm() {
  const nav = useNavigate();
  const {user} = useAuth();
  const [address,setAddress]=useState('');
  const [address2,setAddress2]=useState('');
  const [city,setCity]=useState('');
  const [state,setState]=useState('');
  const [zipcode,setZipCode]=useState('');


  useEffect(()=>{
    if (user){
      if (user.address !== null && user.address !== '') setAddress(user.address);
      if (user.address2 !== null && user.address2 !== '') setAddress2(user.address2);
      if (user.city !== null && user.city !== '') setCity(user.city);
      if (user.state !== null && user.state !== '') setState(user.state);
      if (user.zipcode !== null && user.zipcode !== '') setZipCode(user.zipcode);
    }
  },[]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      localStorage.setItem("tempJankSolutionAddress",JSON.stringify({address,address2,city,state,zipcode}));
      nav('/payment');
    } catch(error){
      console.error(error);
    }
    
  };

  return (
    <div className="wrapper">
      <h1>Shipping Info</h1>
      {
        user
        ?
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <label>
                <p>Address1</p>
                <input address="address" defaultValue={user.address} onChange={(e)=>setAddress(e.target.value)}/>
              </label>
              <label>
                <p>Address/ apartment number</p>
                <input address2="address" defaultValue={user.address2} onChange={(e)=>setAddress2(e.target.value)}/>
              </label>
              <label>
                <p>City</p>
                <input city="city" defaultValue={user.city} onChange={(e)=>setCity(e.target.value)}/>
              </label>
              <label>
                <p>State</p>
                <input state="state" defaultValue={user.state} onChange={(e)=>setState(e.target.value)}/>
              </label>
              <label>
                <p>Zip</p>
                <input zip="zip" defaultValue={user.zipcode} onChange={(e)=>setZipCode(e.target.value)}/>
              </label>
            </fieldset>
            <button className="nav-link">Submit Details</button>
          </form>
        </div>
        :
        <div>
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
            <button className="nav-link">Submit Details</button>
          </form>
        </div>
      }
    </div>
  );
}
