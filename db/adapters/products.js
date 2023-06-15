const { client } = require("../client");

async function createProduct({ name, price, description }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(name, price, description)
            VALUES ($1, $2, $3)
            ON CONFLICT (nane) DO NOTHING
            RETURNING *
            `,
      [name, price, description]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  const { rows } = await client.query(`
    SELECT * FROM products
    INNER JOIN sports
    ON products.sport_id = sport.id
    `);
  return rows;
}

module.exports = {
  createProduct,
  getAllProducts,
};
