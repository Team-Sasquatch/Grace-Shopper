import { useState,useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { registerAdmin } from "../../api/auth";
import AdminHeader from "./AdminHeader";

export default function CreateAdmin(){
    const {user}=useAuth();
    const [newUsername, setNewUsername]=useState('');
    const [newPassword, setNewPassword]=useState('');
    const [submitted,setSubmitted]=useState(false);

    useEffect(()=>{
        if (submitted){
            setNewUsername('');
            setNewPassword('');
            setSubmitted(false);
        }
    },[submitted]);

    async function handleCreateAdmin(e){
        e.preventDefault();
        try {
            if (user.is_admin){
                const result = await registerAdmin(newUsername, newPassword, true, '','','','','');
                console.log('creating admin result',result);
                setSubmitted(true);
            }
        } catch (error) {
            console.error('Error creating admin',error);
        }
    }

    return(
        <div>
            <div>
                <AdminHeader/>
            </div>
            <h3>Create an Admin User</h3>
            <form onSubmit={handleCreateAdmin}>
                <p>Username: <input type='text' value={newUsername} onChange={(e)=>setNewUsername(e.target.value)}/></p>
                <p>Password: <input type='text' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/></p>
                <button>Create Admin</button>
            </form>
        </div>
    )
}