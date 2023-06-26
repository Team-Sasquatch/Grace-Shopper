import getAllProducts from "../api/allProductsAPI";
import { useState, useEffect } from "react";

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
    <div>
      {products.map((product, idx) => (
        <div key={idx}>
          <h1>Name: {product.name}</h1>
          <h2>Price: {product.price}</h2>
          <p>Description: {product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllProductsComponent;
