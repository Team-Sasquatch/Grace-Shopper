import getAllProducts, { deleteProduct, updateProduct } from "../../api/products";
import { useState, useEffect } from "react";
import "../../AllProducts.css";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";

export default function EditProducts(){
  const [products, setProduct] = useState([]);
  const [deleted,setDeleted]=useState(false);

  const nav = useNavigate();

  useEffect(() => {
    async function fetchAllProducts() {
      const response = await getAllProducts();
      setProduct(response);
      if (deleted) setDeleted(false);
    }
    fetchAllProducts();
  }, [deleted]);

  async function handleDelete(prd){
    try {
      const result = await deleteProduct(prd.id);
      console.log(result);
      setDeleted(true);
    } catch (error) {
      console.error('error deleting product',error);
    }
  }

  function Prods(props) {
    return (
      <div key={props.index} className="product-item">
        <img
        src={`/ProductOverview/${props.product.name}.jpg`}
        style={{ maxWidth: "100%", height: "100px" }}
        />
        <div className="product-details">
        <h1 className="product-name">{props.product.name}</h1>
        <p className="product-price"> $ {props.product.price}</p>
        <p className="product-description">{props.product.description}</p>
        </div>
        <button onClick={()=>nav(`/admin-product/${props.product.id}`)}>Edit</button>
        <button onClick={()=>handleDelete(props.product)}>Delete</button>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader/>
      <div className="products-container">
        {products.map((product, idx) => (
          <div key={idx}>
            <Prods quantity={1} index={idx} product={product} />
          </div>
        ))}
      </div>
    </div>
    
  );
};


