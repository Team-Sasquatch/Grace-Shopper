// Create some seed data and export it from this file

const users = [
  { username: "test1", password: 12345678, is_admin: false },
  { username: "test2", password: 12345678, is_admin: false },
  { username: "admin", password: 12345678, is_admin: true },
];

const orders = [
  { user_id: 1, cost: 1222, order_number: 1, status: "Created" },
  { user_id: 1, cost: 1332, order_number: 2, status: "Processing" },
  { user_id: 2, cost: 1442, order_number: 3, status: "Completed" },
  { user_id: 2, cost: 30, order_number: 4, status: "Cancelled" },
];

const sports = [
  { name: "soccer", description: "you sock a ball" },
  { name: "basketball", description: "you basket a ball" },
  { name: "football", description: "you don't foot the ball often" },
];

const products = [
  {
    name: "Whey Protein",
    price: "15",
    description: "prime protein for the prime Sasquatch",
    sport_id: null,
    category: "supplement",
    flavor: "strawberry",
  },

  {
    name: "Protein Supplement",
    price: "31",
    description: "prime protein for the prime Sasquatch",
    sport_id: null,
    category: "supplement",
    flavor: "strawberry",
  },
  {
    name: "tank top",
    price: "12",
    description: "gets you jacked2",
    sport_id: 2,
    category: "apparel",
  },
  {
    name: "soccer ball",
    price: "31",
    description: "gets you jacked3",
    sport_id: 1,
    category: "equipment",
  },
  {
    name: "Casein Protein",
    price: "144",
    description: "gets you jacked4",
    sport_id: 1,
    category: "supplement",
    flavor: "mocha",
  },
  {
    name: "Creatine",
    price: "144",
    description: "gets you swole!",
    sport_id: 1,
    category: "supplement",
    flavor: "mocha",
  },
  {
    name: "exercise bike",
    price: "144",
    description: "hit those quads",
    sport_id: 1,
    category: "equipment",
    flavor: "mocha",
  },
  {
    name: "pull up bar",
    price: "144",
    description: "gets you jacked4",
    sport_id: 1,
    category: "equipment",
    flavor: "mocha",
  },
  {
    name: "baseball T",
    price: "144",
    description: "gets you jacked4",
    sport_id: 1,
    category: "apparel",
    flavor: "mocha",
  },
  {
    name: "baseball cap",
    price: "100",
    description: "gets you jacked4",
    sport_id: 1,
    category: "apparel",
    flavor: "mocha",
  },
];

const order_products = [
  { order_id: 1, product_id: 1, quantity: 1 },
  { order_id: 2, product_id: 2, quantity: 2 },
  { order_id: 2, product_id: 3, quantity: 3 },
  { order_id: 1, product_id: 4, quantity: 4 },
];

const reviews = [
  {
    product_id: 1,
    user_id: 1,
    rating: 5,
    comment: "this is bangin'",
    edited: false,
  },
  { product_id: 2, user_id: 3, rating: 4, comment: "it aight'", edited: false },
  {
    product_id: 3,
    user_id: 2,
    rating: 5,
    comment: "does anyone even look at reviews anyways?",
    edited: false,
  },
  { product_id: 1, user_id: 1, rating: 1, comment: "wack", edited: false },
];

module.exports = { users, products, orders, order_products, sports, reviews };
