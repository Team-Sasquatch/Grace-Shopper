import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import "../checkout.css";

export default function Checkout() {
  const [quantity, setQuantity] = useState(null);
  const [retrievedCart, setRetrievedCart] = useState([]);

  useEffect(() => {
    setRetrievedCart(JSON.parse(localStorage.getItem("shoppingCart")));
  }, []);

  console.log("retrievedCart", retrievedCart);

  const cartDisplay = retrievedCart;

  return (
    <div className="checkout-container">
      {cartDisplay && cartDisplay.length > 0 ? (
        <div>
          <h1 className="checkout-heading">Checkout</h1>
          <div className="checkout-items">
            {cartDisplay.map((prod) => {
              return (
                <div key={prod.id} className="checkout-item">
                  <p className="product-name">Product: {prod.name}</p>
                  <p className="product-quantity">Quantity: {prod.quantity}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
        </div>
      )}
    </div>
  );
}
