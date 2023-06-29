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

  return (
    <div>
      {sport.sports.map((sporty, idx) => (
        <div key={idx} className="product-item">
          <Link to={`/overview/${sporty.id}`}>
            <h1 className="product-name">Name: {sporty.name}</h1>
            <p className="product-description">
              Description: {sporty.description}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SportsComponent;
