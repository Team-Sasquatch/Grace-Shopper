import { getSports } from "../api/sportsAPI";
import { useState, useEffect } from "react";
import "../AllProducts.css";
import { Link } from "react-router-dom";

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

  return (
    <div className="products-container">
      {sport.sports.map((sport, idx) => (
        <Sports quantity={1} index={idx} sporty={sport} />
      ))}
    </div>
  );
};

function Sports(props) {
    var Qty = props.quantity;
    return (
      <div>
        <div key={props.idx} className="product-item">
          <Link to={`/sport_product/${props.sporty.id}`}>
          <h1 className="product-name">Name: {props.sporty.name}</h1>
          <p className="product-description">
            Description: {props.sporty.description}
          </p>
          </Link>
        </div>
      </div>
    );
  }

export default SportsComponent;
