export async function fetchOrders(){
    try {
        const response = await fetch('/api/orders',{
            headers:{
                "Content-Type": "application/json"
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchOrderByOrderId(id){
    try {
        const response = await fetch(`/api/orders/${id}`,{
            headers:{
                "Content-Type": "application/json",
            },
        });
        const result= await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchOrderByUserId(id){
    try {
        const response = await fetch(`/api/orders/user/${id}`,{
            headers:{
                "Content-Type": "application/json",
            },
        });
        const result= await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function fetchOrderByStatus(status){
    try {
        const response = await fetch(`/api/orders/status/${status}`,{
            headers:{
                "Content-Type": "application/json",
            },
        });
        const result= await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function createOrder(user_id,cost,order_number,status){
    try {
        const response = await fetch('/api/orders',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                user_id,
                cost,
                order_number,
                status
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteOrder(id){
    try {
        const response = await fetch(`api/orders/${id}`,{
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}