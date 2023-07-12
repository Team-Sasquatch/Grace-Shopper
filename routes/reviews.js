const express = require('express');
const reviewsRouter = express.Router();
const {createReview, getAllReviews, getReviewById,updateReview,destroyReview, getReviewsByProductId,getReviewsByUserId} = require("../db/adapters/reviews");
const { authRequired } = require('./authRoute');
const jwt = require("jsonwebtoken");

reviewsRouter.get('/',async(req,res,next)=>{
    try {
        const reviews = await getAllReviews();
        res.send(reviews);
    } catch (error) {
        next(error);
    }
});

reviewsRouter.get('/:id',async(req,res,next)=>{
    try {
        const review = await getReviewById(req.params.id);
        res.send(review);
    } catch (error) {
        next(error);
    }
});

reviewsRouter.get('/product/:id',async(req,res,next)=>{
    try {
        const review = await getReviewsByProductId(req.params.id);
        res.send(review);
    } catch (error) {
        next(error);
    }
});

reviewsRouter.get('/user/:id',async(req,res,next)=>{
    try {
        const review = await getReviewsByUserId(req.params.id);
        res.send(review);
    } catch (error) {
        next(error);
    }
});

reviewsRouter.post('/', authRequired, async(req,res,next)=>{
    try {
        const token = req.signedCookies.token;
        let user = jwt.verify(token,process.env.JWT_SECRET);
        const {product_id, rating, comment, edited} = req.body;
        const createdReview = await createReview({product_id,user_id: user.id,rating,comment,edited});
        res.send(createdReview);
    } catch (error) {
        next(error);
    }
});

reviewsRouter.patch('/:id',authRequired,async(req,res,next)=>{
    try {
        const id = req.params.id;
        const {rating,comment,edited} = req.body;
        const review = await getReviewById(id);
        if (req.user.id === review.user_id){
            const updatedReview = await updateReview({id,rating,comment,edited});
            res.send(updatedReview);
        }
        else{
            next({
                name: 'IdMatchError',
                message: 'User Id does not match the id of the creator of the review'
            })
        }
    } catch (error) {
        next(error);
    }
});

reviewsRouter.delete('/:id',authRequired,async(req,res,next)=>{
    try {
        const {id} = req.params; 
        const review = await getReviewById(id);
        if (req.user.id === review.user_id){
            const deletedReview = await destroyReview(id);
            res.send(deletedReview)
        }
        else{
            next({
                name: 'IdMatchError',
                message: 'User Id does not match the id of the creator of the review'
            })
        }
    } catch (error) {
        next(error);
    }
})

module.exports = reviewsRouter;