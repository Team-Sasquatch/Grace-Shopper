import { getProductBySport } from "../api/products";
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import addToCart from "../hooks/addingToCart";

export default function SportProducts(){
    const [products, setProducts] = useState([]);
    const {sportId} = useParams();

    useEffect(() => {
      async function fetchAllProductSports() {
        const response = await getProductBySport(sportId);
        console.log('response',response)
        setProducts(response);
      }
      fetchAllProductSports();
    }, []);
    console.log("product", products);
  
    return (
      <div>
        {
          products.length!==0
          ?
            <div className="products-container">
              {products.map((product, idx) => (
                <div key={idx}>
                  <Prods quantity={1} index={idx} product={product} />
                </div>
              ))}
            </div>
          :
              <p>No products are in this sport yet.</p>
        }
        
      </div>
    );
}

function Prods(props) {
  var prodQty = props.quantity;
  console.log(props);
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
          }}
          className="add-to-cart-button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}