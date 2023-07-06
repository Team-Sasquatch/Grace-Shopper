import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";

export default function Checkout() {
  const [quantity, setQuantity] = useState(null);
  const [retrievedCart, setRetrievedCart] = useState([]);
  const [updateCheckout, setUpdateCheckout] = useState(false);
  const nav = useNavigate();
  useEffect(() => {
    async function fetchCart() {
      let tempCart = JSON.parse(localStorage.getItem("shoppingCart"));
      if (
        localStorage.getItem("shoppingCart") !== null &&
        tempCart.length > 0
      ) {
        for (let i = 0; i < tempCart.length; i++) {
          const tempProdGet = await getProductById(tempCart[i].id);
          if (tempProdGet) tempCart[i].price = tempProdGet.price;
        }
      }
      setRetrievedCart(tempCart);
      if (updateCheckout) {
        setUpdateCheckout(false);
      }
    }
    fetchCart();
  }, [updateCheckout]);
  function contCheckout() {
    localStorage.setItem("shoppingCart", JSON.stringify(retrievedCart));
    nav("/confirmation");
  }

  function deleteItem(deletedItem) {
    setRetrievedCart(
      retrievedCart.filter((x) => {
        return x.id != deletedItem.id;
      })
    );
    localStorage.setItem(
      "shoppingCart",
      JSON.stringify(
        retrievedCart.filter((x) => {
          return x.id != deletedItem.id;
        })
      )
    );
    setUpdateCheckout(true);
  }

  function clearCart() {
    localStorage.removeItem("shoppingCart");
    setUpdateCheckout(true);
  }

  return (
    <div>
      {retrievedCart ? (
        <div>
          <button onClick={() => contCheckout()}>Checkout</button>
          <button onClick={() => clearCart()}>Clear Cart</button>
          <div>
            {retrievedCart.map((prod, index) => {
              return (
                <div key={prod.id}>
                  <p>Product: {prod.name}</p>
                  <p> Price: ${prod.price}</p>
                  <p>
                    Quantity:{" "}
                    <input
                      type="text"
                      defaultValue={prod.quantity}
                      onChange={(e) => {
                        e.target.value,
                          (retrievedCart[index].quantity = parseInt(
                            e.target.value
                          ));
                      }}
                    />
                  </p>
                  <button
                    onClick={() => {
                      deleteItem(prod);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p> Your cart is empty.</p>
        </div>
      )}
      <p>
        <Link to="/confirmation">
          <button className="nav-link"> Time to CHECKOUT </button>
        </Link>
      </p>
    </div>
  );
}
