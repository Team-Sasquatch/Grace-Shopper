import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

export default function Checkout() {
  const [quantity, setQuantity] = useState(null);
  const [retrievedCart, setRetrievedCart] = useState([]);
  const [updateCheckout, setUpdateCheckout] = useState(false);
  const nav = useNavigate();
  let cartDisplay = retrievedCart;
  useEffect(() => {
    setRetrievedCart(JSON.parse(localStorage.getItem("shoppingCart")));
    if (updateCheckout) {
      setUpdateCheckout(false);
    }
  }, [updateCheckout]);

  function contCheckout() {
    localStorage.setItem("shoppingCart", JSON.stringify(cartDisplay));
    navigate("/confirmation");
  }

  function deleteItem(deletedItem) {
    setUpdateCheckout(true);
    cartDisplay = cartDisplay.filter((x) => {
      return x.id != deletedItem.id;
    });
    localStorage.setItem("shoppingCart", JSON.stringify(cartDisplay));
  }
  console.log(cartDisplay);
  return (
    <div>
      {cartDisplay ? (
        <div>
          {cartDisplay.map((prod, index) => {
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
                        (cartDisplay[index].quantity = parseInt(
                          e.target.value
                        ));
                    }}
                  />
                </p>
                <button
                  onClick={(e) => {
                    deleteItem(prod);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-cart">
          <p> Your cart is empty.</p>
        </div>
      )}
      <p>
        Ready to
        <Link className="nav-link" to="/confirmation">
          checkout
        </Link>
      </p>
    </div>
  );
}
