import { useState, useEffect } from "react";
import { getProductsBySupplement } from "../api/allProductsAPI";

const SupplementsComponent = () => {
  const [supplements, setSupplements] = useState([]);

  useEffect(() => {
    async function fetchSupplements() {
      const response = await getProductsBySupplement();
      setSupplements(response);
    }
    fetchSupplements();
  }, []);

  console.log("supps", supplements);

  return (
    <div>
      {supplements.map((supp, idx) => (
        <div key={idx}>
          <h1>Name: {supp.name}</h1>
          <p>Price: {supp.price}</p>
          <p>Description: {supp.description}</p>
          <p>Flavor: {supp.flavor}</p>
        </div>
      ))}
    </div>
  );
};

export default SupplementsComponent;
