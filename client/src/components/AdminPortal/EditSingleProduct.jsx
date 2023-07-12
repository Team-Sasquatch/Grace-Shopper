import { getProductById,updateProduct } from "../../api/products";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminHeader from "./AdminHeader";

export default function EditSingleProduct(){
    const {id} = useParams();
    const [product,setProduct]=useState({})
    const [prodSportId,setProdSportId]=useState(null);
    const [prodName,setProdName]=useState('');
    const [prodPrice,setProdPrice]=useState(0);
    const [prodDesc,setProdDesc]=useState('');
    const [prodCat,setProdCat]=useState('');
    const [prodFlav,setProdFlav]=useState('');
    useEffect(()=>{
        async function fetchProd(){
            setProduct(await getProductById(id));
            setProdSportId(product.sport_id);
            setProdName(product.name);
            setProdPrice(product.price);
            setProdDesc(product.description);
            setProdCat(product.category);
            setProdFlav(product.flavor);
            console.log('test222', product.id,prodSportId,prodName,prodPrice,prodDesc,prodCat,prodFlav)
        }
        fetchProd();
    },[])
    console.log(product)
    async function handleUpdate(e){
        e.preventDefault();
        try {
            console.log('test', product.id,prodSportId,prodName,prodPrice,prodDesc,prodCat,prodFlav)
            const result = await updateProduct(product.id,prodSportId,prodName,prodPrice,prodDesc,prodCat,prodFlav);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
    
    return(
        <div>
            <AdminHeader/>
            <div>
                <form onSubmit={handleUpdate}>
                    <p>Name: <input type='text' defaultValue={prodName} onChange={(e)=>{setProdName(e.target.value)}}/></p>
                    <p>Sport Id: <input type='text' defaultValue={prodSportId} onChange={(e)=>{setProdSportId(e.target.value)}}/></p>
                    <p>Price: $<input type='text' defaultValue={prodPrice} onChange={(e)=>{setProdPrice(e.target.value)}}/></p>
                    <p>Description: <input type='text' defaultValue={prodDesc} onChange={(e)=>{setProdDesc(e.target.value)}}/></p>
                    <p>Category: <input type='text' defaultValue={prodCat} onChange={(e)=>{setProdCat(e.target.value)}}/></p>
                    <p>Flavor: <input type='text' defaultValue={prodFlav} onChange={(e)=>{setProdFlav(e.target.value)}}/></p>
                    <button>Update</button>
                </form>
            </div>
        </div>
        
    )
}