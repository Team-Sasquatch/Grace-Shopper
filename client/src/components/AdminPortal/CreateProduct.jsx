import { postProduct } from "../../api/products";
import {getSports} from "../../api/sportsAPI";
import useAuth from "../../hooks/useAuth";
import AdminHeader from "./AdminHeader";
import { useState,useEffect } from "react";


export default function CreateProduct(){
    const {user}=useAuth();
    const [productName,setProductName]=useState('');
    const [productPrice,setProductPrice]=useState(0.00);
    const [productDescription,setProductDescription]=useState('');
    const [submitted,setSubmitted]=useState(false);
    const [sportList,setSportList]=useState([{}]);
    const [productCategory,setProductCategory]=useState('');
    const [productFlavor,setProductFlavor]=useState('');


    useEffect(()=>{
        async function getProdInfo(){
            const sports = await getSports();
            setSportList(sports.sports);
        }
        if (submitted){
            setProductName('');
            setProductDescription('');
            setProductPrice(0);
            setSubmitted(false);
            setProductCategory('');
            setProductFlavor('');
            const elem = document.getElementById("sport_select");
            elem.value="none";
        }
        getProdInfo();
    },[submitted]);

    async function handleCreateProduct(e){
        e.preventDefault();
        try {
            if (user.is_admin && productName!==""){
                let sportId = document.getElementById("sport_select").value;
                if (sportId==='none'){
                    sportId = null;
                }
                const result = await postProduct(productName,sportId,productPrice,productDescription,productCategory,productFlavor);
                console.log('result of submission:',result)
                setSubmitted(true);
            }
        } catch (error) {
            console.error('Error creating product',error);
        }
    }

    return(
        <div>
            <div><AdminHeader/></div>
            <h3>Create a Product</h3>
            <form onSubmit={handleCreateProduct}>
                <p>Product Name: <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}/></p>
                <p>Product Description: <input type='text' value={productDescription} onChange={(e)=>setProductDescription(e.target.value)}/></p>
                <p>Product Price: $<input type='text' value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}/></p>
                <p>Sport: <select id="sport_select" defaultValue="none">
                    <option value="none"></option>
                    {sportList.map((s)=>
                        <option key={s.key} value={s.id}>{s.name}</option>
                    )}    
                </select></p>
                <p>Category: <input type='text' value={productCategory} onChange={(e)=>setProductCategory(e.target.value)}/></p>
                <p>Flavor: <input type='text' value={productFlavor} onChange={(e)=>setProductFlavor(e.target.value)}/></p>
                <button>Create Product</button>
            </form>
        </div>
    )
}