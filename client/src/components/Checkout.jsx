import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function Checkout(){
    const [quantity,setQuantity]=useState(null);

    useEffect(()=>{
        const retrievedOrder = localStorage.getItem('testObj');//update name after Sarah creates the add to cart functionality

    },[])

    return(
        <div>
            <div>
            </div>
        </div>
    )
}