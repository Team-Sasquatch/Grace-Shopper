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
    var qty = props.quantity;
    return (
      <div key={props.index}>
        <h1>Name: {props.supplement.name}</h1>
        <p>Price: {props.supplement.price}</p>
        <p>Description: {props.supplement.description}</p>
        <p>Flavor: {props.supplement.flavor}</p>
        <button
          onClick={() => {
            addToCart({
              id: props.supplement.id,
              name: props.supplement.name,
              quantity: qty,
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
      {supplements.map((supp, idx) => (
        <Supp quantity={1} index={idx} supplement={supp} />
      ))}
    </div>
  );
};

export default SupplementsComponent;
