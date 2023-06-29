import { useState, useEffect } from "react";
import { getProductsByApparel } from "../api/products";

const ApparelComponent = () => {
  const [apparel, setApparel] = useState([]);

  useEffect(() => {
    async function fetchApparel() {
      const response = await getProductsByApparel();
      setApparel(response);
    }
    fetchApparel();
  }, []);

  console.log("apparel", apparel);

  function App(props) {
    var qty = props.quantity;
    return (
      <div key={props.index} className="product-item">
        <h1 className="product-name">Name: {props.apparel.name}</h1>
        <p className="product-price">Price: {props.apparel.price}</p>
        <p className="product-description">
          Description: {props.apparel.description}
        </p>
        <button
          onClick={() => {
            addToCart({
              id: props.apparel.id,
              name: props.apparel.name,
              quantity: qty,
            });
          }}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
        <p>
          Quantity:{" "}
          <input
            type="text"
            name="quantity"
            defaultValue={props.quantity}
            onChange={(e) => {
              e.target.value, (qty = parseInt(e.target.value));
            }}
          />
        </p>
      </div>
    );
  }

  function addToCart(cartObj) {
    console.log("cartObject: ", cartObj);
    let obj = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    obj.push(cartObj);
    localStorage.setItem("shoppingCart", JSON.stringify(obj));
  }

  return (
    <div className="products-container">
      {apparel.map((appar, idx) => (
        <App quantity={1} index={idx} apparel={appar} />
      ))}
    </div>
  );
};

export default ApparelComponent;
