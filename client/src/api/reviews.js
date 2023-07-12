export async function getReviewsByProductId(id) {
    try {
        const response = await fetch(`/api/reviews/product/${id}`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
      }
}

export async function submitReview({product_id,user_id,rating,comment,edited}) {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id,
          user_id,
          rating,
          comment,
          edited
        }),
      });
      const result = await response.json();
      console.log("my result:", result);
      return result;
    } catch (error) {
      console.log("Error with review: ", error);
    }
  }
