import useAuth from "../hooks/useAuth";
import { useEffect,useState } from "react";
import { fetchUser,changeAddress } from "../api/auth";

export default function Profile(){
    const {user} = useAuth();
    const [address,setAddress]=useState('');
    const [address2,setAddress2]=useState('');
    const [city,setCity]=useState('');
    const [state,setState]=useState('');
    const [zipcode,setZipCode]=useState('');
    const [submitted,setSubmitted]=useState(false);
    useEffect(()=>{
        async function fetchAddress(){
            const usr = await fetchUser(user.id);
            console.log(usr)
            if (Object.hasOwn(usr,'address') && usr.address !== null) setAddress(usr.address);
            if (Object.hasOwn(usr,'address2') && usr.address2 !== null) setAddress2(usr.address2);
            if (Object.hasOwn(usr,'city') && usr.city !== null) setCity(usr.city);
            if (Object.hasOwn(usr,'state') && usr.state !== null) setState(usr.state);
            if (Object.hasOwn(usr,'zipcode') && usr.zipcode !== null) setZipCode(usr.zipcode);
            if (submitted) setSubmitted(false);
        }
        fetchAddress();
    },[submitted]);
    console.log('user',user)

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const result = await changeAddress(user.id,address,address2,city,state,zipcode);
            console.log('result',result)
            setSubmitted(true);
        } catch (error) {
            console.log('Error updating address',error);
        }
    }

    return(
    <div>
        <div>
            <h3>Default Address</h3>
            <form onSubmit={handleSubmit}>
                <p>Address: <input type='text' defaultValue={address} onChange={(e)=>setAddress(e.target.value)}/></p>
                <p>Address 2: <input type='text' defaultValue={address2} onChange={(e)=>setAddress2(e.target.value)}/></p>
                <p>City: <input type='text' defaultValue={city} onChange={(e)=>setCity(e.target.value)}/></p>
                <p>State: <input type='text' defaultValue={state} onChange={(e)=>setState(e.target.value)}/></p>
                <p>Zip Code: <input type='text' defaultValue={zipcode} onChange={(e)=>setZipCode(e.target.value)}/></p>
                <button>Update Default Address</button>
            </form>
            {user.is_admin === true
            ?
            <div>
                <button>Admin Portal</button>
            </div>
            :
            <div/>
            }
        </div>
    </div>
    );
}