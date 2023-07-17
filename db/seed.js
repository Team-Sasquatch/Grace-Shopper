const { createProduct, getAllProducts } = require("./adapters/products");
const { client } = require("./client");
const {
  addProductToOrder,
  getOrderProductsById,
  getOrderProductsByOrder,
  updateOrderProducts,
  destroyOrderProducts,
} = require("./adapters/order_products");
const {
  users,
  admins,
  orders,
  products,
  order_products,
  sports,
  reviews,
} = require("./seedData");
const {
  createSport,
  getSportById,
  getAllSports,
  updateSport,
  destroySport,
} = require("./adapters/sports");
const {
  createOrder,
  getAllOrders,
  getAllOrdersByUserId,
  getOrderById,
  getOrdersByStatus,
  updateOrderStatus,
} = require("./adapters/orders");
const {
  createUser,
  createAdmin,
  getUser,
  getUserById,
  getUserByUsername,
  updateAddress,
} = require("./adapters/users");
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  destroyReview,
} = require("./adapters/reviews");

async function dropTables() {
  console.log("Dropping tables...");
  await client.query(`
    DROP TABLE IF EXISTS cart CASCADE;
    DROP TABLE IF EXISTS sports CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
    DROP TABLE IF EXISTS order_products CASCADE;
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
  await client.query(`

    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username  VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE,
      address VARCHAR(255) DEFAULT '',
      address2 VARCHAR(255) DEFAULT '',
      city VARCHAR(255) DEFAULT '',
      state VARCHAR(255) DEFAULT '',
      zipcode VARCHAR(255) DEFAULT ''
    );
    CREATE TABLE orders(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      cost DOUBLE PRECISION NOT NULL,
      order_number VARCHAR(255) UNIQUE NOT NULL,
      status VARCHAR(255) NOT NULL,
      address VARCHAR(255),
      address2 VARCHAR(255),
      city VARCHAR(255),
      state VARCHAR(255),
      zipcode VARCHAR(255)
    );
    CREATE TABLE sports(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT
    );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY,
      sport_id INTEGER REFERENCES sports(id),
      name VARCHAR(255) UNIQUE NOT NULL,
      price DOUBLE PRECISION,
      description TEXT,
      category VARCHAR(255),
      flavor VARCHAR(255)
    );
    CREATE TABLE order_products(
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL
    );
    CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      product_id INTEGER REFERENCES products(id) NOT NULL,
      user_id INTEGER REFERENCES users(id) NOT NULL,
      rating INTEGER NOT NULL,
      comment VARCHAR(255) NOT NULL,
      edited BOOLEAN DEFAULT false
    );
    CREATE TABLE cart(
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) NOT NULL,
      cart json NOT NULL
    );
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
    console.log("populating sports...");
    for (const sport of sports) {
      await createSport(sport);
    }
    console.log("...sports populated");
    console.log("Getting sportById(1)", await getSportById(1));
    console.log("Getting allSports", await getAllSports());
    console.log(
      "Updating Sport(1)",
      await updateSport(1, "rock climbing", "climbing rocks!")
    );
    await destroySport(3);
    console.log("Getting all Sports, second iteration", await getAllSports());

    console.log("populating products table...");
    for (const product of products) {
      await createProduct(product);
    }
    console.log("all products: ", await getAllProducts());
    console.log("...products table populated");

    console.log("Getting sportById(1)", await getSportById(1));
    console.log("Getting all Sports, second iteration", await getAllSports());

    // ----------------------- Added by Daven for Testing---------------------------
    console.log("populating users table...");
    for (const user of users) {
      await createUser(user);
    }
    for (const admin of admins) {
      await createAdmin(admin);
    }
    console.log("finished populating users table");
    console.log(
      "Getting user validation,",
      await getUser({ username: "test1", password: 12345678 })
    );
    // console.log("Getting user by id user[3], ", await getUserById(3));
    // console.log("Getting user by username, ", await getUserByUsername("test2"));

    console.log("populating orders table...");
    for (const order of orders) {
      await createOrder(order);
    }
    // console.log("...finished populating orders table");
    // console.log("getting all orders, ", await getAllOrders());
    // console.log("getAllOrdersByUserId, ", await getAllOrdersByUserId(2));
    // console.log("getting order by id[1], ", await getOrderById(1));
    // console.log(
    //   "getting orders by status[Processing]",
    //   await getOrdersByStatus("Processing")
    // );
    // console.log(
    //   "updating order status, ",
    //   await updateOrderStatus({
    //     id: 2,
    //     user_id: 3,
    //     cost: 6666,
    //     order_number: 321,
    //     status: "Completed",
    //   })
    // );
    // -----------------------------------------------------------------------------

    for (const order_product of order_products) {
      const createdOrderProduct = await addProductToOrder(order_product);
      console.log("Order_Products being created: ", createdOrderProduct);
    }
    // console.log(
    //   "Getting orderproduct by id(1): ",
    //   await getOrderProductsById(1)
    // );
    // console.log(
    //   "Updating orderproduct by id(1): ",
    //   await updateOrderProducts(1, 1337)
    // );
    // console.log(
    //   "Getting orderproduct by orderId()",
    //   await getOrderProductsByOrder(1)
    // );
    // await destroyOrderProducts(1);
    // console.log(
    //   "Getting orderproduct by id(1) (should be destroyed): ",
    //   await getOrderProductsById(1)
    // );
    // console.log("gettingAllOrders 2, ", await getAllOrders());
    // console.log("getAllOrdersByUserId, ", await getAllOrdersByUserId(1));
    // console.log("getting order by id[1], ", await getOrderById(1));
    // console.log(
    //   "getting orders by status[Completed]",
    //   await getOrdersByStatus("Completed")
    // );

    for (const review of reviews) {
      await createReview(review);
    }
    // console.log("Getting all reviews", await getAllReviews());
    // console.log("Getting Reviews by reviewId[1],", await getReviewById(1));
    // console.log(
    //   "updating review by id[2]",
    //   await updateReview({ id: 2, rating: 2, comment: "eh", edited: false })
    // );
    // console.log("Destroying review[3]", await destroyReview(3));
    // console.log("Getting all reviews", await getAllReviews());
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
