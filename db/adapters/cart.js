const { client } = require("../client");

async function addToCart({ userId, cartJson }) {
    try {
      await clearCart(userId);
      const {
        rows: [order_product],
      } = await client.query(
        `
              INSERT INTO cart (user_id, cart)
              VALUES ($1,$2)
              RETURNING *;
          `,
        [userId, cartJson]
      );
      return order_product;
    } catch (error) {
      console.error("Error creating order_products");
      throw error;
    }
}

async function clearCart(userId) {
    try {
        const {
          rows: [order_product],
        } = await client.query(
          `
                delete from cart where user_id = $1
            `,
          [userId]
        );
        return order_product;
      } catch (error) {
        console.error("Error creating order_products");
        throw error;
      }
}

async function getCartForUser(userId) {
    try {
        const rows = await client.query(
          `
                select * from cart where user_id = $1
            `,
          [userId]
        );
        return rows.rows[0];
      } catch (error) {
        console.error("Error creating order_products");
        throw error;
      }
}

module.exports = { addToCart, clearCart, getCartForUser }