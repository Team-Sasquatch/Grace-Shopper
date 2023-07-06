import React from 'react';
import useAuth from "../../hooks/useAuth";
import { createContext, useState, useEffect } from "react";
import { getReviewsByProductId, submitReview } from '../../api/reviews';


const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
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
    }

    return (
      <div>
        <h2>Reviews</h2>
        <ul>
        {reviews.map((review, idx) => (
          <li>
            {review.rating}
            {review.comment}
          </li>
        ))}
        </ul>
        {loggedIn && (<form onSubmit={handleSubmit} >
          {/* Input fields for new review */}
          <input type="text" value={comment} placeholder="Enter your review" onChange={(e) => {
            setComment(e.target.value);
          }} />
          <button type="submit">Submit</button>
        </form>)}
      </div>
    );
  }
  
  export default Reviews;