const { client } = require("../client");

async function createProduct({
  name,
  sport_id,
  price,
  description,
  category,
  flavor,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(name, sport_id, price, description,category,flavor)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (name) DO NOTHING
            RETURNING *
            `,
      [name, sport_id, price, description, category, flavor]
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

async function getProductByCategory(category) {
  const { rows } = await client.query(
    `SELECT * FROM products WHERE category = $1
  `,
    [category]
  );
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

async function getProductBySport(sport_id) {
  const { rows } = await client.query(
    `
    SELECT * FROM products
    WHERE sport_id = $1
    `,
    [sport_id]
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

async function updateProduct({
  id,
  sport_id,
  name,
  price,
  description,
  category,
  flavor,
}) {
  const setString = Object.keys({
    name,
    sport_id,
    price,
    description,
    category,
    flavor,
  })
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          UPDATE products
          SET ${setString}
          WHERE id=${id}
          RETURNING *;
      `,
      Object.values({ name, sport_id, price, description, category, flavor })
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
  getProductsByUser,
  updateProduct,
  getProductBySport,
};
