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
    DROP TABLE IF EXISTS orders_products CASCADE;
    DROP TABLE IF EXISTS sports CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
  `);
  console.log("Finished dropping tables");
  try {
  } catch (error) {
    console.error(error);
  }
}

async function createTables() {
  console.log("Creating tables...");

  //Users Table
  console.log("Creating Users tables...");
  await client.query(`
      CREATE TABLE  users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false
      )
    `);
  console.log("...User table created");

  //Orders Table
  console.log("Creating Orders tables...");
  await client.query(`
      CREATE TABLE  orders(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        cost INTEGER NOT NULL,
        order_number VARCHAR(255) UNIQUE NOT NULL
      )
    `);
  console.log("...Orders table created");

  //Sports Table
  console.log("Creating Sports tables...");
  await client.query(`
        CREATE TABLE  sports(
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL,
          description VARCHAR(255)
        )
      `);
  console.log("...Sports table created");

  //Products Table
  console.log("Creating Products tables...");
  await client.query(`
      CREATE TABLE  products(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        price INTEGER,
        description VARCHAR(255),
        sport_id INTEGER REFERENCES sports(id)
      )
    `);
  console.log("...Products table created");

  //orders_products table
  console.log("Creating order_products tables...");
  await client.query(`
      CREATE TABLE  orders_products(
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id)
      )
    `);
  console.log("...order_products table created");

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
