import { fetchOrderByUserId } from "../api/orders";
import useAuth from "../hooks/useAuth";
import { useEffect,useState } from "react";

export default function OrderHistory(){
    const {user} = useAuth();
    const [orders,setOrders]=useState([]);

    useEffect(()=>{
        async function fetchOrders(){
            const result = await fetchOrderByUserId(user.id);
            setOrders(result.orders);
            console.log("orders",result.orders);
        }
        fetchOrders();
    },[]);

    return(
        <div>
            {orders.map((order)=>{
                return(
                    <div>
                        <h3>Order Number: {order.order_number}</h3>
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
                                        <h5>Product: {product.name}</h5>
                                        <p>Quantity: {product.quantity}</p>
                                    </div>
                                )
                            })}
                        </div>
                        <p>Total Cost: ${order.cost}</p>
                    </div>
                )
            })}
        </div>
    )
}