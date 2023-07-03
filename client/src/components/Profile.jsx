import useAuth from "../hooks/useAuth";

export default function Profile(){
    const {setUser,user} = useAuth();

    return(
    <div>
        <div>
            <h3>Default Address</h3>
            <input type='text'/>
            <button>Update Default Address</button>
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