import React from "react";

//package
import StarRatings from "react-star-ratings";

const StarRating = ({ dimension, handleRating, rating }) => {
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
