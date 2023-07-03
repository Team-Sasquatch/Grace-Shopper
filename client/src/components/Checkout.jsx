import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link,useNavigate } from "react-router-dom";
import { getProductById } from "../api/products";

export default function Checkout() {
  const [quantity, setQuantity] = useState(null);
  const [retrievedCart, setRetrievedCart] = useState([]);
  const [updateCheckout, setUpdateCheckout] = useState(false);
  const nav = useNavigate();
  let cartDisplay = retrievedCart;
  useEffect(() => {
    async function fetchCart(){
      let tempCart = JSON.parse(localStorage.getItem("shoppingCart"));
      if (localStorage.getItem("shoppingCart")!==null && tempCart.length>0){
        for (let i=0;i<tempCart.length;i++){
          const tempProdGet = await getProductById(tempCart[i].id);
          if (tempProdGet)
            tempCart[i].price = tempProdGet.price;
        }
      }
      setRetrievedCart(tempCart);
      if (updateCheckout){
        setUpdateCheckout(false);
      }
    }
    fetchCart();
  }, [updateCheckout]);

  function contCheckout() {
    localStorage.setItem("shoppingCart", JSON.stringify(cartDisplay));
    nav("/confirmation");
  }
  
  function deleteItem(deletedItem){
    setUpdateCheckout(true);
    cartDisplay = cartDisplay.filter((x) => {
      return x.id != deletedItem.id;
    });
    localStorage.setItem("shoppingCart", JSON.stringify(cartDisplay));
  }

  function clearCart(){
    setUpdateCheckout(true);
    localStorage.removeItem("shoppingCart");
  }

  return (
    <div>
      {cartDisplay ? (
        <div>
          <button onClick={() => contCheckout()}>Checkout</button>
          <button onClick={()=> clearCart()}>Clear Cart</button>
          <div>
            {cartDisplay.map((prod,index) => {
              return (
                <div>
                  <p>Product: {prod.name}</p>
                  <p> Price: ${prod.price}</p>
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
                  <button onClick={(e)=>{deleteItem(prod)}}>Remove</button>
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
        Ready to
        <Link className="nav-link" to="/confirmation">
          checkout
        </Link>
      </p>
    </div>
  );
}
