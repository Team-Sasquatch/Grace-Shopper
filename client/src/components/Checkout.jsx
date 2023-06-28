import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Checkout(){
    const [quantity,setQuantity]=useState(null);
    const [retrievedCart,setRetrievedCart]=useState([]);
    useEffect(()=>{
        setRetrievedCart(JSON.parse(localStorage.getItem('shoppingCart')));

    },[])
    console.log('retrievedCart',retrievedCart)
    const cartDisplay = retrievedCart;
    return(
        <div>
            {cartDisplay.length>0
            ?
            <div>
                <div>
                    {cartDisplay.map((prod)=>{
                        return(
                            <div>
                                <p>Product: {prod.name}</p>
                                <p>Quantity: {prod.quantity}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            :
            <div/>
            }
        </div>
    )
}