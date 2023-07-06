const { client } = require("../client");

async function createSport({ name, description }) {
  const {
    rows: [sport],
  } = await client.query(
    `
            INSERT INTO sports(name,description)
            VALUES($1,$2)
            ON CONFLICT (name) DO NOTHING
            RETURNING *;
        `,
    [name, description]
  );
  return sport;
}

module.exports.SportNotFoundError = class SportNotFoundError extends Error {};
// catch (error) { if (error instanceof SportNotFoundError) /** special case handling */ }

async function getSportById(sportId) {
  try {
    const {
      rows: [sport],
    } = await client.query(
      `
            SELECT *
            FROM sports
            WHERE id=$1;
        `,
      [sportId]
    );

    if (!sport) {
      throw new SportNotFoundError(`Could not find sport with id ${sportId}`);
      //   throw {
      //     name: "SportNotFoundError",
      //     message: "Could not find sport with that sportId",
      //   };
    }
    const { rows: products } = await client.query(
      `
            SELECT products.*
            FROM products
            WHERE products.sport_id=$1;
        `,
      [sportId]
    );
    sport.products = products;
    return sport;
  } catch (error) {
    console.error("Error getting sport");
    throw error;
  }
}

async function getAllSports() {
  try {
    const { rows: sport } = await client.query(`
            SELECT
                sports.id as id,
                sports.name as name,
                sports.description as description,
            CASE WHEN products.sport_id is NULL THEN '[]' :: json
            ELSE
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id', products.id,
                    'name', products.name,
                    'price', products.price,
                    'description', products.description,
                    'sport_id', products.sport_id
                )
            ) END AS products
            FROM sports
            LEFT JOIN products ON sports.id = products.sport_id
            GROUP BY sports.id, products.sport_id;
        `);
    return sport;
  } catch (error) {
    console.error("Error getting all sports");
    throw error;
  }
}

async function updateSport(sportId, name, description) {
  const setString = Object.keys({ name, description })
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  if (setString.length == 0) {
    return;
  }
  try {
    const {
      rows: [sport],
    } = await client.query(
      `
            UPDATE sports
            SET ${setString}
            WHERE id=${sportId}
            RETURNING *;
        `,
      Object.values({ name, description })
    );
    return sport;
  } catch (error) {
    console.error("Error updating sport");
    throw error;
  }
}

async function destroySport(sportId) {
  try {
    const {
      rows: [sport],
    } = await client.query(
      `
            DELETE
            FROM sports
            WHERE sports.id = $1
            RETURNING *;
        `,
      [sportId]
    );
    return sport;
  } catch (error) {
    console.error("Error destroying sport");
    throw error;
  }
}

module.exports = {
  destroySport,
  updateSport,
  getAllSports,
  getSportById,
  createSport,
};
