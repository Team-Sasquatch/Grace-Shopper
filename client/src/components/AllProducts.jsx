import getAllProducts from "../api/allProductsAPI";
import { useState, useEffect } from "react";
import "../AllProducts.css";

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

  return (
    <div className="products-container">
      {products.map((product, idx) => (
        <div key={idx} className="product-item">
          <h1 className="product-name">{product.name}</h1>
          <h2 className="product-price">Price: {product.price}</h2>
          <p className="product-description">
            Description: {product.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AllProductsComponent;
