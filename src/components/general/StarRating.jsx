import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const StarRating = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (rate) => {
        setRating(rate);

        // other logic
    };
    return (
        <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={handleRating}
            numberOfStars={5}
            name="rating"
            starDimension="25px"
        />
    );
};

export default StarRating;
