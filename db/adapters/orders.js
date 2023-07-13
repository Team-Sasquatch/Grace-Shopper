const {client} = require("../client");
  
  async function getAllOrders() {
    try {
      const {rows:order} = await client.query(`
      SELECT
        orders.id as id,
        orders.user_id as user_id,
        orders.cost as cost,
        orders.order_number as order_number,
        orders.status as status,
        orders.address as address,
        orders.address2 as address2,
        orders.city as city,
        orders.state as state,
        orders.zipcode as zipcode,
      CASE WHEN order_products.order_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', products.id,
          'price', products.price,
          'description', products.description,
          'sport_id', products.sport_id
        )
      ) END AS products
      FROM orders
      LEFT JOIN order_products ON orders.id = order_products.order_id
      LEFT JOIN products ON order_products.product_id = products.id
      GROUP BY orders.id, order_products.order_id;
      `);
      return order;
    } catch (error) {
      throw error;
    }
    
  }

  async function getAllOrdersByUserId(userId) {
    try{
      const {rows:order} = await client.query(`
      SELECT
        orders.id as id,
        orders.user_id as user_id,
        orders.cost as cost,
        orders.order_number as order_number,
        orders.status as status,
        orders.address as address,
        orders.address2 as address2,
        orders.city as city,
        orders.state as state,
        orders.zipcode as zipcode,
      CASE WHEN order_products.order_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', products.id,
          'name', products.name,
          'price', products.price,
          'description', products.description,
          'sport_id', products.sport_id,
          'quantity', order_products.quantity
        )
      ) END AS products
      FROM orders
      LEFT JOIN order_products ON orders.id = order_products.order_id
      LEFT JOIN products ON order_products.product_id = products.id
      WHERE orders.user_id = $1
      GROUP BY orders.id, order_products.order_id;
      `,[userId]);
      return order;
    } catch (error){
      throw error;
    }
    
  }
  
  async function getOrderById(orderId) {
    try {
      const {rows:[order]} = await client.query(`
            SELECT *
            FROM orders
            WHERE id = $1;
        `,[orderId]);
        if(!order){
            throw{
                name:"OrderNotFoundError",
                message:"Could not find order with that orderId"
            };
        }
        const {rows:[products]} = await client.query(`
            SELECT products.*
            FROM products
            JOIN order_products ON products.id=order_products.product_id
            WHERE order_products.order_id=$1;
        `,[orderId]);
        order.products = products;
      return order;
    } catch (error) {
      throw error;
    }
    
  }
  
  async function createOrder({user_id, cost, order_number, status, address, address2, city, state, zipcode}) {
    try {
      const {
        rows: [order],
    } = await client.query(
        `
          INSERT INTO orders(user_id, cost, order_number, status, address, address2, city, state, zipcode)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING *;
      `,
        [user_id, cost, order_number, status, address, address2, city, state, zipcode]
    );
    return order;
    } catch (error) {
      throw error;
    }
    
  }
  
  async function getOrdersByStatus(status) {
    try {
      const {rows:order} = await client.query(`
      SELECT
        orders.id as id,
        orders.user_id as user_id,
        orders.cost as cost,
        orders.order_number as order_number,
        orders.status as status,
        orders.address as address,
        orders.address2 as address2,
        orders.city as city,
        orders.state as state,
        orders.zipcode as zipcode,
      CASE WHEN order_products.order_id IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
        JSON_BUILD_OBJECT(
          'id', products.id,
          'price', products.price,
          'description', products.description,
          'sport_id', products.sport_id
          'quantity', order_products.quantity
        )
      ) END AS products
      FROM orders
      LEFT JOIN order_products ON orders.id = order_products.order_id
      LEFT JOIN products ON order_products.product_id = products.id
      WHERE orders.status = $1
      GROUP BY orders.id, order_products.order_id;
      `,[status]);
      return order;
    } catch (error) {
      throw error;
    }
    
  }

  async function updateOrderStatus({id, user_id, cost, status}) {
    const setString = Object.keys({user_id,cost,status}).map((key,index)=>`"${key}"=$${index+1}`).join(', ');
    if (setString.length === 0){
        return;
    }
    try {
        const {rows:[order]} = await client.query(`
            UPDATE orders
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,Object.values({user_id,cost,status}));
        return order;
    } catch (error) {
      throw error;
    }
    
  }
  
  
  module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    getAllOrdersByUserId,
    getOrdersByStatus,
    updateOrderStatus
  };