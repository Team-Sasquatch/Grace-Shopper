import getAllProducts from "../api/products";
import { useState, useEffect } from "react";
import "../AllProducts.css";
import { Link } from "react-router-dom";

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
          <h2 className="product-price">Price: {props.product.price}</h2>
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
              e.target.value, (prodQty = parseInt(e.target.value));
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
      {products.map((product, idx) => (
        <div key={idx}>
          <Prods quantity={1} index={idx} product={product} />
        </div>
      ))}
    </div>
  );
};

export default AllProductsComponent;
