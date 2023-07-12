export async function getCartForUser() {
    try {
        const response = await fetch(`/api/cart`,{
            headers:{
                "Content-Type": "application/json",
            },
        });
        const result= await response.json();
        return result.data;
    } catch (error) {
        console.error(error);
    }
}

export async function clearCartAPI() {
    try {
        const response = await fetch(`/api/cart`,{
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

export async function addToCartAPI(cart) {
    try {
        const response = await fetch('/api/cart',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                cart
            })
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

