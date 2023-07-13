export async function createOrderProduct(order_id,product_id,quantity){
    try {
        const response = await fetch('/api/orderproducts',{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                order_id,
                product_id,
                quantity
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}