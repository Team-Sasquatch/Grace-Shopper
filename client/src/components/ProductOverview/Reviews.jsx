import React from 'react';
import useAuth from "../../hooks/useAuth";
import { createContext, useState, useEffect } from "react";
import { getReviewsByProductId, submitReview } from '../../api/reviews';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { setLoggedIn, loggedIn,setUser,user } = useAuth();

    useEffect(() => {
        async function getReviews() {
            if (!id)
                return;
            const response = await getReviewsByProductId(id);
            setReviews(response);
        }
        getReviews();
    }, []);
    async function handleSubmit(e) { 
      e.preventDefault();
      let review = { product_id: id, rating: rating, comment: comment, edited: false}
      await submitReview(review);
      reviews.push(review)
      setReviews(reviews);
      setComment('');
      setRating(0);
    }

    return (
      <div>
        <h2>Reviews</h2>
        <ul>
        {reviews.map((review, idx) => (
          <li>
            {review.comment}
            <Stack spacing={1}>
              <Rating name="half-rating-read" value={review.rating} precision={0.5} readOnly />
            </Stack>
          </li>

        ))}
        </ul>
        {loggedIn && (<form onSubmit={handleSubmit} >
          <Stack spacing={1}>
              <Rating name="half-rating-read" value={rating} precision={0.5} onChange={(e, newRating) => {
                setRating(newRating);
              }} />
            </Stack>
          <input type="text" value={comment} placeholder="Enter your review" onChange={(e) => {
            setComment(e.target.value);
          }} />
          <button type="submit">Submit</button>
        </form>)}
      </div>
    );
  }
  
  export default Reviews;