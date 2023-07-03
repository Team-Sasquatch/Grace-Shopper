import getSports from "../api/sportsAPI";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../AllProducts.css";

const SportsComponent = () => {
  const [sport, setSports] = useState({ sports: [] });

  useEffect(() => {
    async function fetchSports() {
      const response = await getSports();
      setSports(response);
    }
    fetchSports();
  }, []);
  console.log("sports??", sport);

  function Sports(props) {
    var Qty = props.quantity;
    return (
      <div>
        <div key={props.idx} className="product-item">
          <Link to={`/overview/${props.sporty.id}`}>
            <h1 className="product-name">Name: {props.sporty.name}</h1>
            <p className="product-description">
              Description: {props.sporty.description}
            </p>
          </Link>

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
        </div>
      </div>
    );
  }

  return (
    <div className="products-container">
      {sport.sports.map((sport, idx) => (
        <Sports quantity={1} index={idx} sporty={sport} />
      ))}
    </div>
  );
};

export default SportsComponent;
