import { useState, useEffect } from "react";
import { getProductsBySupplement } from "../api/products";

const SupplementsComponent = () => {
  const [supplements, setSupplements] = useState([]);

  useEffect(() => {
    async function fetchSupplements() {
      const response = await getProductsBySupplement();
      setSupplements(response);
    }
    fetchSupplements();
  }, []);

  console.log("supps", supplements);

  function Supp(props) {
    var supQty = props.quantity;
    return (
      <div key={props.index} className="product-item">
        <h1 className="product-name">Name: {props.supplement.name}</h1>
        <p className="product-price">Price: {props.supplement.price}</p>
        <p className="product-description">
          Description: {props.supplement.description}
        </p>
        <p>Flavor: {props.supplement.flavor}</p>
        <button
          onClick={() => {
            addToCart({
              id: props.supplement.id,
              name: props.supplement.name,
              quantity: supQty,
            });
          }}
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
              e.target.value, (supQty = parseInt(e.target.value));
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
      {supplements.map((supp, idx) => (
        <Supp quantity={1} index={idx} supplement={supp} />
      ))}
    </div>
  );
};

export default SupplementsComponent;
