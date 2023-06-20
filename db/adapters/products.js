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
    INNER JOIN sports
    ON products.sport_id = sports.id
    `);
  return rows;
}

module.exports = {
  createProduct,
  getAllProducts,
};
