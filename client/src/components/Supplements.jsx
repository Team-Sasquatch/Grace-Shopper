import { useState, useEffect } from "react";
import { getProductsBySupplement } from "../api/products";

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

  return (
    <div className="products-container">
      {supplements.map((supp, idx) => (
        <Supp quantity={1} index={idx} supplement={supp} />
      ))}
    </div>
  );
};

function Supp(props) {
  var qty = props.quantity;
  return (
    <div key={props.index} className="product-item">
      <Link to={`/overview/${props.supplement.id}`} className="product-link">
        <div className="product-image">
          <img
            src={`/ProductOverview/${props.supplement.name}.jpg`}
            style={{ "max-width": "100%", height: "100px" }}
            alt="Product Thumbnail"
          />
        </div>
        <div className="product-details">
          <h1 className="product-name">{props.supplement.name}</h1>
          <p className="product-price">${props.supplement.price}</p>
          <p className="product-description">
            {props.supplement.description}
          </p>
          <p>Flavor: {props.supplement.flavor}</p>
        </div>
      </Link>

      <div className="product-quantity">
        <p>
          Quantity:{" "}
          <input
            type="number"
            min="0"
            max="9"
            name="quantity"
            defaultValue={props.quantity}
            onChange={(e) => {
              e.target.value, (qty = parseInt(e.target.value));
            }}
          />
        </p>
        <button
          onClick={() => {
            addToCart({
              id: props.supplement.id,
              name: props.supplement.name,
              quantity: qty,
            });
            window.location.reload();
          }}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}


export default SupplementsComponent;
