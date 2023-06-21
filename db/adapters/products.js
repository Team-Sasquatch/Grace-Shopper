const { client } = require("../client");

async function createProduct({ name, price, description, sport_id }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(name, price, description, sport_id)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (name) DO NOTHING
            RETURNING *
            `,
      [name, price, description, sport_id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  const { rows } = await client.query(`
    SELECT * FROM products
    `);
  return rows;
}

async function getProductById(id) {
  const { rows } = await client.query(
    `
    SELECT * FROM products
    WHERE id = $1
    `,
    [id]
  );
  return rows;
}

async function getProductsByUser(username) {
  const { rows } = await client.query(
    `
    SELECT * FROM products
    WHERE username = $1
    `,
    [username]
  );
  return rows;
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByUser,
};
