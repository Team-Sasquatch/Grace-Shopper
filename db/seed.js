const client = require("./client");

async function dropTables() {
  console.log("Dropping tables...");
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
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
    );
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      cost INTEGER NOT NULL,
      order_number varchar(255) UNIQUE NOT NULL
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL,
      price INTEGER,
      description varchar(255)
    );
    CREATE TABLE orders_products(
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      product_id INTEGER REFERENCES products(id)
    )
    CREATE TABLE sports(
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL,
      description varchar(255)
    )
  `)
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
