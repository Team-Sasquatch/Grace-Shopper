import { useState, useEffect } from "react";
import { getProductsByEquipment } from "../api/products";
import addToCart from "../hooks/addingToCart";
import { Link } from "react-router-dom";

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

  function Equip(props) {
    var qty = props.quantity;
    return (
      <div key={props.index} className="product-item">
        <Link to={`/overview/${props.equipment.id}`}>
          <div className="product-image">
            <img
              src={`/ProductOverview/${props.equipment.name}.jpg`}
              style={{ "max-width": "100%", height: "100px" }}
              alt="Product Thumbnail"
            />
          </div>
          <div className="product-details">
            <h1 className="product-name"> {props.equipment.name}</h1>
            <p className="product-price">$ {props.equipment.price}</p>
            <p className="product-description">{props.equipment.description}</p>
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
            className="add-to-cart-button"
            onClick={() => {
              addToCart({
                id: props.equipment.id,
                name: props.equipment.name,
                quantity: qty,
              });
              window.location.reload();
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      {equipment.map((equips, idx) => (
        <Equip quantity={1} index={idx} equipment={equips} />
      ))}
    </div>
  );
};

export default EquipmentComponent;
