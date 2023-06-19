const {client} = require("../client");
  
  async function getAllOrders() {
    const {rows} = await client.query(
        `
        select * from orders
      `
    );
    return rows;
  }

  async function getAllOrdersByUserId(userId) {
    const {rows} = await client.query(
        `
        select * from orders where user_id = $1
      `,
      [userId]
    );
    return rows;
  }
  
  async function getOrderById(id) {
    const {rows: [order]} = await client.query(
        `
        select * from orders where id = $1
      `,
      [id]
    );
    return order;
  }
  
  async function createOrder({user_id, cost, order_number, status}) {
    const {
        rows: [order],
    } = await client.query(
        `
          INSERT INTO orders(user_id, cost, order_number, status)
          VALUES ($1, $2, $3, $4)
          RETURNING *;
      `,
        [user_id, cost, order_number, status]
    );
    return order;
  }
  
  async function getOrdersByStatus(status) {
    const {rows} = await client.query(
        `
        select * from orders where status = $1
      `,
      [status]
    );
    return rows;
  }

  async function updateOrderStatus({id, userId, cost, orderNumber, status}) {
    const {
        rows: [order],
    } = await client.query(
        `
        update orders set user_id = $1, cost = $2, order_number = $3, status = $4
        where id = $5
      `,
      [userId, cost, orderNumber, status, id]
    );
    return order;
  }
  
  
  module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    getAllOrdersByUserId,
    getOrdersByStatus,
    updateOrderStatus
  };