import { useState, useEffect } from "react";
import { getProductsByEquipment } from "../api/allProductsAPI";

const EquipmentComponent = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    async function fetchSupplements() {
      const response = await getProductsByEquipment();
      setEquipment(response);
    }
    fetchSupplements();
  }, []);

  console.log("equipment", equipment);

  return (
    <div>
      {equipment.map((equips, idx) => (
        <div key={idx}>
          <h1>Name: {equips.name}</h1>
          <p>Price: {equips.price}</p>
          <p>Description: {equips.description}</p>
        </div>
      ))}
    </div>
  );
};

export default EquipmentComponent;
