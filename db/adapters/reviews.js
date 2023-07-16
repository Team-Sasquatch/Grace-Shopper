const {client} = require("../client");

async function createReview({product_id,user_id,rating,comment,edited}){
    try {
        const {rows: [review]} = await client.query(`
            INSERT INTO reviews(product_id,user_id,rating,comment,edited)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *;
        `,[product_id,user_id,rating,comment,edited])
        return review;  
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

async function getReviewsByProductId(product_id){
    try {
        const {rows:reviews} = await client.query(`
            SELECT *
            FROM reviews
            WHERE product_id=$1
        `,[product_id]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

async function getReviewsByUserId(user_id){
    try {
        const {rows:reviews} = await client.query(`
            SELECT *
            FROM reviews
            WHERE user_id=$1
        `,[user_id]);
        return reviews;
    } catch (error) {
        throw error;
    }
}

async function updateReview({id,rating,comment,edited}){
    const setString = Object.keys({rating,comment,edited}).map((key,index)=>`"${key}"=$${index+1}`).join(', ');
    if (setString.length === 0){
        return;
    }
    try {
        const {rows:[review]} = await client.query(`
            UPDATE reviews
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,Object.values({rating,comment,edited}));
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

module.exports = {createReview, getAllReviews, getReviewById,updateReview,destroyReview,getReviewsByProductId,getReviewsByUserId};