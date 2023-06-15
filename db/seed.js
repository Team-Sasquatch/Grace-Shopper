const client = require("./client");

const{users,orders,products,order_products,sport} = require("./seedData");

async function dropTables() {
  console.log("Dropping tables...");
  await client.query(`
    DROP TABLE IF EXISTS sports;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
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
      order_number VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      price INTEGER,
      description VARCHAR(255),
      sport_id INTEGER REFERENCES sport(id)
    );
    CREATE TABLE orders_products(
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      product_id INTEGER REFERENCES products(id)
    )
    CREATE TABLE sports(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description VARCHAR(255)
    )
  `)
  console.log("Finished creating tables");
  try {
  } catch (error) {
    console.log(error);
  }
}

async function populateTables() {
  console.log("Populating tables...");
  try {
    
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
