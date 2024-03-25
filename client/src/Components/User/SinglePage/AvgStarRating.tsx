import React from 'react';
import { FaStar, FaRegStar, FaStarHalf } from "react-icons/fa";

function AvgStarRating({ rating }: any) {
  
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className="text-yellow-500" />);
    } else if (i - rating === 0.5) {
      stars.push(<FaStarHalf key={i} className="text-yellow-500" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-500" />);
    }
  }
  console.log(rating,"rating")
  return (
    <div className="flex items-center">
      <div className="flex items-center">{stars}</div>
    </div>
  );
}

export default AvgStarRating;
