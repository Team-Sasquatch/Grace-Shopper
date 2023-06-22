const {client} = require("../client");
const { reviews } = require("../seedData");

async function createReview({product_id,user_id,rating,comment}){
    try {
        const {rows: [review]} = await client.query(`
            INSERT INTO reviews(product_id,user_id,rating,comment)
            VALUES($1,$2,$3,$4)
            RETURNING *;
        `,[product_id,user_id,rating,comment])        
    } catch (error) {
        throw error;
    }
}

async function getAllReviews(){
    try {
        const {rows:review} = await client.query(`
            SELECT *
            FROM reviews
        `);
        return review;
    } catch (error) {
        throw error;
    }
}

async function getReviewById(reviewId){
    try {
        const {rows:[review]} = await client.query(`
            SELECT *
            FROM reviews
            WHERE id=$1
        `,[reviewId]);
        return review;
    } catch (error) {
        throw error;
    }
}

async function updateReview({id,rating,comment}){
    const setString = Object.keys({rating,comment}).map((key,index)=>`"${key}"=$${index+1}`).join(', ');
    if (setString.length === 0){
        return;
    }
    try {
        const {rows:[review]} = await client.query(`
            UPDATE reviews
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,Object.values({rating,comment}));
        return review;
    } catch (error) {
      throw error;
    }
}

async function destroyReview(reviewId){
    try {
        const{ rows:[review]} = await client.query(`
            DELETE
            FROM reviews
            WHERE reviews.id = $1
            RETURNING *;
        `,[reviewId]);
        return review;
    } catch (error) {
        throw error;
    }
}

module.exports = {createReview, getAllReviews, getReviewById,updateReview,destroyReview};