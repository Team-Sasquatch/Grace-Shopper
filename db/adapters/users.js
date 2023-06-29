const {client} = require("../client");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function createUser({ username, password, is_admin }) {
  try {
    const hashedPassword = await bcrypt.hash(password.toString(), SALT_ROUNDS);
    delete password;
    const { rows: [user] } = await client.query(
      `INSERT INTO users(username, password, is_admin)
        VALUES ($1, $2, $3)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;`,
      [username, hashedPassword, is_admin]
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

async function getUserByUsername(username){
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


module.exports = {createUser, getUser, getUserById, getUserByUsername}