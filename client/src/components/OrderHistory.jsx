import { fetchOrderByUserId } from "../api/orders";
import useAuth from "../hooks/useAuth";

import "../AllProducts.css";
import { useEffect,useState } from "react";

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const result = await fetchOrderByUserId(user.id);
      setOrders(result.orders);
      console.log("orders", result.orders);
    }
    fetchOrders();
  }, []);

    return(
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            {orders.map((order)=>{
                return(
                    <div className="product-item">
                        <h2>Order Number: {order.order_number}</h2>
                        <p>Staus: {order.status}</p>
                        <div>
                            <p>Address:</p>
                            <p>{order.address} {order.address2}</p>
                            <p>{order.city}, {order.state} {order.zipcode}</p>
                        </div>
                        <div>
                            {order.products.map((product)=>{
                                return(
                                    <div>
                                        <h4>Product: {product.name}</h4>
                                        <h5>Price: ${(product.price).toFixed(2)}</h5>
                                        <h5>Quantity: {product.quantity}</h5>
                                    </div>
                                )
                            })}
                        </div>
                        <h3>Total Cost: ${(order.cost).toFixed(2)}</h3>
                    </div>
                )
            })}
        </div>
    )
}

