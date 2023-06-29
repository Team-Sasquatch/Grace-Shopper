import { useState, useEffect } from "react";
import { getProductsByEquipment } from "../api/products";

const EquipmentComponent = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    async function fetchEquipments() {
      const response = await getProductsByEquipment();
      setEquipment(response);
    }
    fetchEquipments();
  }, []);

  console.log("equipment", equipment);

  function Equip(props){
    var equipQty = props.quantity;
    return(
      <div key={props.index}>
        <h1>Name: {props.equipment.name}</h1>
        <p>Price: {props.equipment.price}</p>
        <p>Description: {props.equipment.description}</p>
        <button onClick={()=>{addToCart({id:props.equipment.id,name:props.equipment.name,quantity:equipQty})}}>Add to Cart</button>
        <p>Quantity: <input type='text' name='quantity' defaultValue={props.quantity} onChange={(e)=>{e.target.value,equipQty=parseInt(e.target.value)}}/></p>
      </div>
    )
  }

  function addToCart(cartObj){
    console.log('cartObject: ',cartObj)
    let obj = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    obj.push(cartObj);
    localStorage.setItem('shoppingCart',JSON.stringify(obj));
  }
  
  return (
    <div>
      {equipment.map((equips, idx) => (
        <Equip quantity={1} index={idx} equipment={equips}/>
      ))}
    </div>
  );
};

export default EquipmentComponent;
