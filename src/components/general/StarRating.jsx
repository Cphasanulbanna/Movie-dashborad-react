import React from "react";

import StarRatings from "react-star-ratings";

const StarRating = ({ dimension, handleRating, rating }) => {
    return (
        <StarRatings
            rating={rating ? rating : 4}
            starRatedColor="#FFD700"
            changeRating={handleRating}
            numberOfStars={5}
            name="rating"
            starDimension={dimension ? dimension : "25px"}
        />
    );
};

export default StarRating;
