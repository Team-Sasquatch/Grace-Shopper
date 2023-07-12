const { client } = require("../client");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function createUser({
  username,
  password,
  address,
  address2,
  city,
  state,
  zipcode,
}) {
  try {
    const hashedPassword = await bcrypt.hash(password.toString(), SALT_ROUNDS);
    delete password;
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(username, password, address, address2, city, state, zipcode)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
      [username, hashedPassword, address, address2, city, state, zipcode]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
async function createAdmin({
  username,
  password,
  is_admin,
  address,
  address2,
  city,
  state,
  zipcode,
}) {
  try {
    const hashedPassword = await bcrypt.hash(password.toString(), SALT_ROUNDS);
    delete password;
    const {
      rows: [user],
    } = await client.query(
      `INSERT INTO users(username, password,is_admin, address, address2, city, state, zipcode)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
      [
        username,
        hashedPassword,
        is_admin,
        address,
        address2,
        city,
        state,
        zipcode,
      ]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const res = await bcrypt.compare(password.toString(), user.password);

    if (res) {
      delete user.password;
      return user;
    } else {
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE id=$1;
    `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * 
    FROM users
    WHERE username=$1;
    `,
      [username]
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function updateAddress({ id, address, address2, city, state, zipcode }) {
  const setString = Object.keys({ address, address2, city, state, zipcode })
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values({ address, address2, city, state, zipcode })
    );
    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  createAdmin,
  getUser,
  getUserById,
  getUserByUsername,
  updateAddress,
};
