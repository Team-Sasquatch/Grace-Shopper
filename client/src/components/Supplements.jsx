import { useState, useEffect } from "react";
import { getProductsBySupplement } from "../api/products";
import "../AllProducts.css";
import { Link } from "react-router-dom";
import addToCart from "../hooks/addingToCart";

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
      <div key={props.index} className="product-item">
        <Link to={`/overview/${props.supplement.id}`}>
          <h1 className="product-item">Name: {props.supplement.name}</h1>
          <p className="product-price">Price: {props.supplement.price}</p>
          <p className="product-description">
            Description: {props.supplement.description}
          </p>
          <p>Flavor: {props.supplement.flavor}</p>
        </Link>
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

  return (
    <div className="products-container">
      {supplements.map((supp, idx) => (
        <Supp quantity={1} index={idx} supplement={supp} />
      ))}
    </div>
  );
};

export default SupplementsComponent;
