import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [quantity, setQuantity] = useState(null);
  const [retrievedCart, setRetrievedCart] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    setRetrievedCart(JSON.parse(localStorage.getItem("shoppingCart")));
  }, []);
  console.log("retrievedCart", retrievedCart);
  const cartDisplay = retrievedCart;

  function contCheckout() {
    console.log("cartDisplay", cartDisplay);
    localStorage.setItem("shoppingCart", JSON.stringify(cartDisplay));
    nav("/"); //replace with whatever is order confirm page
  }

  return (
    <div>
      {cartDisplay ? (
        <div>
          <button onClick={() => contCheckout()}>Checkout</button>
          <div>
            {cartDisplay.map((prod) => {
              return (
                <div>
                  <p>Product: {prod.name}</p>
                  <p>
                    Quantity:{" "}
                    <input
                      type="text"
                      defaultValue={prod.quantity}
                      onChange={(e) => {
                        e.target.value,
                          (cartDisplay[prod.id - 1].quantity = parseInt(
                            e.target.value
                          ));
                      }}
                    />
                  </p>
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
