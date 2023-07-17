import getAllProducts from "../api/products";
import { useState, useEffect } from "react";
import "../AllProducts.css";
import { Link } from "react-router-dom";
import addToCart from "../hooks/addingToCart";

function Prods(props) {
  var prodQty = props.quantity;
  return (
    <div key={props.index} className="product-item">
      <Link to={`/overview/${props.product.id}`}>
        <img
          src={`/ProductOverview/${props.product.name}.jpg`}
          style={{ maxWidth: "100%", height: "100px" }}
        />
        <div className="product-details">
          <h1 className="product-name">{props.product.name}</h1>
          <p className="product-price"> $ {props.product.price}</p>
          <p className="product-description">{props.product.description}</p>
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
              e.target.value, (prodQty = parseInt(e.target.value));
            }}
          />
        </p>
        <button
          onClick={() => {
            addToCart({
              id: props.product.id,
              name: props.product.name,
              quantity: prodQty,
              price: props.product.price,
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

const AllProductsComponent = ({ searchQuery }) => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    async function fetchAllProducts() {
      const response = await getAllProducts();
      setProduct(response);
    }
    fetchAllProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <div className="products-container">
      {filteredProducts.map((product, idx) => (
        <div key={idx}>
          <Prods quantity={1} index={idx} product={product} />
        </div>
      ))}
    </div>
  );
};

export default AllProductsComponent;
