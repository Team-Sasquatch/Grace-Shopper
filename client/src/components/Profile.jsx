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
            if (usr.user.address !== null && usr.user.address !== '') setAddress(usr.user.address);
            if (usr.user.address2 !== null && usr.user.address2 !== '') setAddress2(usr.user.address2);
            if (usr.user.city !== null && usr.user.city !== '') setCity(usr.user.city);
            if (usr.user.state !== null && usr.user.state !== '') setState(usr.user.state);
            if (usr.user.zipcode !== null && usr.user.zipcode !== '') setZipCode(usr.user.zipcode);
            if (submitted) setSubmitted(false);
            console.log("address",address,"address2",address2,"city",city,"state",state,"zipcode",zipcode)
        }
        fetchAddress();
    },[submitted]);

    async function handleSubmit(e){
        e.preventDefault();
        console.log('user',user);
        try {
            console.log(address,address2,city,state,zipcode)
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
                <p>Address: <input type='text' value={address} onChange={(e)=>setAddress(e.target.value)}/></p>
                <p>Address 2: <input type='text' value={address2} onChange={(e)=>setAddress2(e.target.value)}/></p>
                <p>City: <input type='text' value={city} onChange={(e)=>setCity(e.target.value)}/></p>
                <p>State: <input type='text' value={state} onChange={(e)=>setState(e.target.value)}/></p>
                <p>Zip Code: <input type='text' value={zipcode} onChange={(e)=>setZipCode(e.target.value)}/></p>
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