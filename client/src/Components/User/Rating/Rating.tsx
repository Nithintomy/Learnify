import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "react-rating-stars-component";
import { UserBaseUrl } from "../../../Api";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice/userSlice";
import { toast, Toaster } from "react-hot-toast";

interface Rating {
  rating: number;
  comment: string;
}

const RatingComponent: React.FC<{ courseId: string }> = ({ courseId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState<Rating[]>([]);

  const user = useSelector(selectUser);

  const handleStarClick = (starRating: any) => {
    setRating(starRating);
  };

  const submitRating = async () => {
    if (rating === 0 || comment === "") {
      toast.error("fill both ");
      return;
    }
    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5 stars.");
      return;
    }

    if (comment.trim() === "") {
      toast.error("Comment cannot be empty.");
      return;
    }

    if (comment.length > 500) {
      toast.error("Comment exceeds the character limit of 500.");
      return;
    }

    console.log(ratings)

    try {
      await axios.post(`${UserBaseUrl}/ratings`, {
        rating,
        comment,
        user: user.user._id,
        course: courseId,
      });

      setRating(0);
      setComment("");
      toast.success("Rating submitted successfully.");
      fetchRatings();
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  const fetchRatings = async () => {
    try {
      const response = await axios.get(`/ratings/${courseId}`);
      setRatings(response.data);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  useEffect(() => {
    fetchRatings();
  }, [courseId]);

  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Rate this course</h2>
      <div className="flex space-x-2 my-4 ">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-2xl ${
              star <= rating ? "text-yellow-900" : "text-gray-400"
            }`}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 mb-4 rounded border"
        rows={3}
        placeholder="Add your comment"
      />
      <button
        onClick={submitRating}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      <Toaster position="top-right" containerClassName="p-8 m-8" />
    </div>
  );
};

export default RatingComponent;
