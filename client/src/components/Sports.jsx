import getSports from "../api/sportsAPI";
import { useState, useEffect } from "react";

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
          <h1 className="product-name">Name: {sporty.name}</h1>
          <p className="product-description">
            Description: {sporty.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SportsComponent;
