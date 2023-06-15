// Create some seed data and export it from this file
const users = [
  { username: "test1", password: 12345678 },
  { username: "test2", password: 12345678 },
];

const orders = [
  { user_id: 1, cost: "1222", order_number: "1" },
  { user_id: 1, cost: "1332", order_number: "2" },
  { user_id: 2, cost: "1442", order_number: "3" },
];

const order_products = [
  { order_id: 1, product_id: 1 },
  { order_id: 2, product_id: 2 },
  { order_id: 2, product_id: 3 },
  { order_id: 1, product_id: 4 },
];

const sports = [{ name: "soccer", description: "you sock a ball" }];

module.exports = { users, products, orders, order_products, sports };
