const { createProduct } = require("./adapters/products");
const { client } = require("./client");
const {addProductToOrder,getOrderProductsById,getOrderProductsByOrder,updateOrderProducts,destroyOrderProducts} = require('./adapters/order_products');
const{users,orders,products,order_products,sports} = require("./seedData");
const { createSport, getSportById, getAllSports, updateSport, destroySport } = require("./adapters/sports");
const { createOrder } = require("./adapters/orders");
const { createUser } = require("./adapters/users");


async function dropTables() {
  console.log("Dropping tables...");
  await client.query(`

    DROP TABLE IF EXISTS sports CASCADE;
    DROP TABLE IF EXISTS order_products CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
  `)

  console.log("Finished dropping tables");
  try {
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");
  await client.query(`

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username  VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT false
    );
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      cost INTEGER NOT NULL,
      order_number VARCHAR(255) UNIQUE NOT NULL,
      status VARCHAR(255) NOT NULL
    );
    CREATE TABLE sports(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255)
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      price INTEGER,
      description VARCHAR(255),
      sport_id INTEGER REFERENCES sports(id)
    );
    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL
    );
  `)

  console.log("Finished creating tables");
  try {
  } catch (error) {
    console.error("Error creating tables!");
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {

    console.log("populating sports...");
    for (const sport of sports){
      await createSport(sport);
    }
    console.log("...sports populated");
    console.log("Getting sportById(1)", await getSportById(1));
    console.log("Getting allSports",await getAllSports());
    console.log("Updating Sport(1)", await updateSport(1,'rock climbing','climbing rocks!'));
    await destroySport(3);
    console.log("Getting all Sports, second iteration", await getAllSports());

    console.log("populating products table...");
    for (const product of products) {
      await createProduct(product);
    }
    console.log("...products table populated");

    console.log("Getting sportById(1)", await getSportById(1));
    console.log("Getting all Sports, second iteration", await getAllSports());


    // ----------------------- Added by Daven for Testing---------------------------
    console.log("populating users table...")
    for (const user of users){
      await createUser(user);
    }
    console.log("finished populating users table")
    console.log("populating orders table...")
    for (const order of orders){
      await createOrder(order);
    }
    console.log("...finished populating orders table")
    // -----------------------------------------------------------------------------

    
    for (const order_product of order_products){
      const createdOrderProduct = await addProductToOrder(order_product);
      console.log("Order_Products being created: ", createdOrderProduct);
    }
    console.log("Getting orderproduct by id(1): ", await getOrderProductsById(1));
    console.log("Updating orderproduct by id(1): ", await updateOrderProducts(1,1337));
    console.log("Getting orderproduct by orderId()", await getOrderProductsByOrder(1));
    await (destroyOrderProducts(1));
    console.log("Getting orderproduct by id(1) (should be destroyed): ", await getOrderProductsById(1));
  } catch (error) {
    console.error(error);
  }
}

async function rebuildDb() {
  client.connect();
  try {
    await dropTables();
    await createTables();
    await populateTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
}

rebuildDb();
