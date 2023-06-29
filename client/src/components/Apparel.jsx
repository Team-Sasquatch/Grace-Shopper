import { useState, useEffect } from "react";
import { getProductsByApparel } from "../api/products";
import addToCart from "../hooks/addingToCart";

const ApparelComponent = () => {
  const [apparel, setApparel] = useState([]);

  useEffect(() => {
    async function fetchApparel() {
      const response = await getProductsByApparel();
      setApparel(response);
    }
    fetchApparel();
  }, []);

  console.log("apparel", apparel);

  function App(props){
    var qty = props.quantity;
    return(
      <div key={props.index}>
        <h1>Name: {props.apparel.name}</h1>
        <p>Price: {props.apparel.price}</p>
        <p>Description: {props.apparel.description}</p>
        <button onClick={()=>{addToCart({id:props.apparel.id,name:props.apparel.name,quantity:qty})}}>Add to Cart</button>
        <p>Quantity: <input type='text' name='quantity' defaultValue={props.quantity} onChange={(e)=>{e.target.value,qty=parseInt(e.target.value)}}/></p>
      </div>
    )
  }

  return (
    <div>
      {apparel.map((appar, idx) => (
        <App quantity={1} index={idx} apparel={appar}/>
      ))}
    </div>
  );
};

export default ApparelComponent;
