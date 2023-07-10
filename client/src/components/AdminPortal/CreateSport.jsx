import { useState,useEffect } from "react";
import AdminHeader from "./AdminHeader";
import useAuth from "../../hooks/useAuth";
import { createSport } from "../../api/sportsAPI";

export default function CreateSport(){
    const {user}=useAuth();
    const [sportName,setSportName]=useState('');
    const [sportDesc,setSportDesc]=useState('');
    const [submitted,setSubmitted]=useState(false);

    useEffect(()=>{
        if (submitted){
            setSportName('');
            setSportDesc('');
            setSubmitted(false);
        }
    },[submitted])

    async function handleCreateSport(e){
        e.preventDefault();
        try {
            if (user.is_admin){
                const result = await createSport(sportName,sportDesc);
                console.log('result',result)
                setSubmitted(true);
            }
        } catch (error) {
            console.error('Error creating sport',error);
        }
    }

    return(
        <div>
            <div><AdminHeader/></div>
            <h3>Create a Sport</h3>
            <form onSubmit={handleCreateSport}>
                <p>Sport Name: <input type='text' value={sportName} onChange={(e)=>setSportName(e.target.value)}/></p>
                <p>Sport Description: <input type='text' value={sportDesc} onChange={(e)=>setSportDesc(e.target.value)}/></p>
                <button>Create Sport</button>
            </form>
        </div>
    )
}