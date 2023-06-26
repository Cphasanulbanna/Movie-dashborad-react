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

    const EditFormSkelton = () => {
        return (
            <div className="edit-form">
                <div className="left">
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="detail"></div>
                </div>
                <div className="right">
                    <div className="field"></div>
                    <div className="field"></div>
                    <div className="image"></div>
                </div>
                <div className="button"></div>
            </div>
        );
    };

    const MovieSinglePageSkelton = () => {
        return (
            <div className="flex justify-between singlepage p-[30px] gap-[30px] w-[100%] h-[100%]">
                <div className="left w-[38%] h-[100%]"></div>
                <div className="right w-[58%] h-[100%] flex flex-col gap-[20px]">
                    <div className="box h-[50px]"></div>
                    <div className="box h-[50px]"></div>
                    <div className="box h-[70px]"></div>
                    <div className="box h-[35px]"></div>
                    <div className="box h-[35px]"></div>
                    <div className="box h-[35px]"></div>
                    <div className="box h-[35px]"></div>
                    <div className="box h-[35px]"></div>
                </div>
            </div>
        );
    };
    if (type === "feed") {
        return Array(6)
            .fill()
            .map((_, index) => <FeedSkelton key={index} />);
    }

    if (type === "rectangle") {
        return Array(20)
            .fill()
            .map((_, index) => <RectangleSkelton key={index} />);
    }

    if (type === "edit-form") {
        return <EditFormSkelton />;
    }

    if (type === "movie-singlepage") {
        return <MovieSinglePageSkelton />;
    }
};

export default Skelton;
