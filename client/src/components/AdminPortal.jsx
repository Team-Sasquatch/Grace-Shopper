import { useState,useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { registerUser } from "../api/auth";

export default function AdminPortal(){
    const [newUsername, setNewUsername]=useState('');
    const [newPassword, setNewPassword]=useState('');


    async function handleCreateAdmin(e){
        e.preventDefault();
        try {
            const result = await registerUser(newUsername, newPassword, true, '','','','','');
            console.log('creating admin result',result);
        } catch (error) {
            console.error('Error creating admin',error);
        }
    }

    return(
        <div>
            <h1>Super Secret Club</h1>
            <h3>Create an Admin User</h3>
            <form onSubmit={handleCreateAdmin}>
                <p>Username: <input type='text' defaultValue={newUsername} onChange={(e)=>setNewUsername(e.target.value)}/></p>
                <p>Password: <input type='text' defaultValue={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/></p>
                <button>Create Admin</button>
            </form>
        </div>
    )
}