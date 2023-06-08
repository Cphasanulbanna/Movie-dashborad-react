import React from "react";
import { useParams } from "react-router-dom";

export const MovieSinglePage = () => {
    const { id } = useParams();
    return <div>MovieSinglePage id is : {id}</div>;
};
