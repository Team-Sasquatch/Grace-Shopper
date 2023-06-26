import { useState, useEffect } from "react";

const SupplementsComponent = () => {
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
        <div key={idx}>
          <h1>Name: {sporty.name}</h1>
          <p>Description: {sporty.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SupplementsComponent;
