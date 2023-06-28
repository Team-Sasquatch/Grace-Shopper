import { useState, useEffect } from "react";
import { getProductsByApparel } from "../api/allProductsAPI";

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

  return (
    <div>
      {apparel.map((appar, idx) => (
        <div key={idx}>
          <h1>Name: {appar.name}</h1>
          <p>Price: {appar.price}</p>
          <p>Description: {appar.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ApparelComponent;
