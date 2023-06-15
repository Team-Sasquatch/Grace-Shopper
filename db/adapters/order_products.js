const client = require("../client");

async function addOrderToProducts({order_id,product_id}){
    try {
        const {rows:[order_product]} = await client.query(`
        INSERT INTO order_products(order_id,product_id)
        VALUES ($1,$2)
        RETURNING *;
        `,[order_id,product_id]);
        return order_product;
    } catch (error) {
        console.error('Error creating order_products');
        throw error;
    }    
}

async function getOrderProductsById(orderProductsId){
    try {
        const {rows:[order_product]} = await client.query(`
            SELECT *
            FROM order_products
            WHERE id=$1;
        `,[orderProductsId]);
        return order_product;
    } catch (error) {
        console.error('Error getting order_products by id');
        throw error;
    }
}

async function updateOrderProducts(orderProductId,quantity){
    try {
        const setString = Object.keys({count}).map((key,index)=>`"${key}=$${index+1}`).join(', ');
        if (setString.length===0)
            return;
        const {rows:[order_product]} = await client.query(`
            UPDATE order_products
            SET ${setString}
            WHERE id=${orderProductId}
            RETURNING *;
        `,Object.values({quantity}));
        return order_product;
    } catch (error) {
        console.error('Error updating order_products');
        throw error;
    }
}

async function getOrderProductsByOrder(orderId){
    try{
        const {rows:order_product} = await client.query(`
            SELECT *
            FROM order_products
            WHERE order_id=$1
        `,[orderId]);
        return order_product;
    } catch(error) {
        console.error('Error getting order_products by order');
        throw error;
    }
}

async function destroyOrderProducts(orderProductId){
    try {
        await client.query(`
            DELETE
            FROM order_products
            WHERE id=$1
        `,[orderProductId]);
    } catch (error) {
        console.error('Error destrying order_products by id');
        throw error;
    }
}

module.exports={addOrderToProducts,getOrderProductsById,updateOrderProducts,getOrderProductsByOrder,destroyOrderProducts};