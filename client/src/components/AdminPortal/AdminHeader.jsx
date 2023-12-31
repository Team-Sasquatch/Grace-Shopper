import { useNavigate } from "react-router-dom";

export default function AdminHeader(){
    const nav = useNavigate();

    return(
        <div>
            <h1>Super Secret Club</h1>
            <div>
                <button onClick={()=>nav("/admin-users")}>Admin User</button>
                <button onClick={()=>nav("/admin-products")}>Create Product</button>
                <button onClick={()=>nav("/admin-products/edit")}>Edit Products</button>
                <button onClick={()=>nav("/admin-sports")}>Create Sport</button>
            </div>
        </div>
    )
}