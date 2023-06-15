const { createProduct } = require("./adapters/products");
const { client } = require("./client");

const {
  users,
  orders,
  products,
  order_products,
  sport,
} = require("./seedData");

async function dropTables() {
  console.log("Dropping tables...");
  await client.query(`
    DROP TABLE IF EXISTS sports;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
  `);
  console.log("Finished dropping tables");
  try {
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");

  await client.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false
      )
    `);

  await client.query(`
      CREATE TABLE IF NOT EXISTS orders(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        cost INTEGER NOT NULL,
        order_number VARCHAR(255) UNIQUE NOT NULL
      )
    `);

  await client.query(`
      CREATE TABLE IF NOT EXISTS products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        price INTEGER,
        description VARCHAR(255),
        sport_id INTEGER REFERENCES sports(id)
      )
    `);

  await client.query(`
      CREATE TABLE IF NOT EXISTS orders_products(
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id)
      )
    `);

  await client.query(`
      CREATE TABLE IF NOT EXISTS sports(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description VARCHAR(255)
      )
    `);
  console.log("Finished creating tables");
  try {
  } catch (error) {
    console.error("Error creating tables!");
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
    console.log("populating products table...");
    for (const product of products) {
      await createProduct(product);
    }
    console.log("...products table populated");
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
