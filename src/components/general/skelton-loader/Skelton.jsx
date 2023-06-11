import React from "react";

import "./skelton.css";

const Skelton = ({ type, count }) => {
    const COUNT = 6;
    const FeedSkelton = () => {
        return (
            <div className="skelton-feed">
                <div className="image"></div>
                <div className="content">
                    <div className="title"></div>
                    <div className="tag"></div>
                    <div className="rating"></div>
                    <div className="buttons"></div>
                </div>
            </div>
        );
    };

    const RectangleSkelton = () => {
        return (
            <div className="skelton-rectangle">
                <div className="content">
                    <div className="title"></div>
                    <div className="buttons">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        );
    };
    if (type === "feed") {
        return Array(3).fill(<FeedSkelton />);
    }

    if (type === "rectangle") {
        return Array(6).fill(<RectangleSkelton />);
    }
};

export default Skelton;
