import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({ dimension, handleRating, rating }) => {
    // const [rating, setRating] = useState(0);

    // const handleRating = (rate) => {
    //     setRating(rate);

    //     // other logic
    // };
    return (
        <StarRatings
            rating={rating ? rating : 4}
            starRatedColor="blue"
            changeRating={handleRating}
            numberOfStars={5}
            name="rating"
            starDimension={dimension ? dimension : "25px"}
        />
    );
};

export default StarRating;
