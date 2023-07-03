import getAllProducts from "../api/products";
import { useState, useEffect } from "react";
import "../AllProducts.css";
import { Link } from "react-router-dom";
import addToCart from "../hooks/addingToCart";

const AllProductsComponent = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    async function fetchAllProducts() {
      const response = await getAllProducts();
      setProduct(response);
    }
    fetchAllProducts();
  }, []);
  console.log("product", products);

  function Prods(props) {
    var prodQty = props.quantity;
    return (
      <div key={props.index} className="product-item">
        <Link to={`/overview/${props.product.id}`}>
          <h1 className="product-name">{props.product.name}</h1>
          <h2 className="product-price">Price: $ {props.product.price}</h2>
          <p className="product-description">
            Description: {props.product.description}
          </p>
        </Link>
        <button
          onClick={() => {
            addToCart({
              id: props.product.id,
              name: props.product.name,
              quantity: prodQty,
              price: props.product.price,
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
            defaultValue={0}
            onChange={(e) => {
              e.target.value, (prodQty = parseInt(e.target.value));
            }}
          />
        </p>
      </div>
    );
  }

  return (
    <div className="products-container">
      {products.map((product, idx) => (
        <div key={idx}>
          <Prods quantity={1} index={idx} product={product} />
        </div>
      ))}
    </div>
  );
};

export default AllProductsComponent;
