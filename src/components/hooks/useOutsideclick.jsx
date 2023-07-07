import { useEffect } from "react";
const useOutsideClick = (ref, ref2, callback) => {
    const handleClick = (event) => {
        if (
            ref.current &&
            !ref.current.contains(event.target) &&
            ref2.current &&
            !ref2.current.contains(event.target)
        ) {
            callback();
        }
    };
    useEffect(() => {
        const handleMouseDown = (event) => handleClick(event);
        document.addEventListener("mousedown", handleMouseDown);
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, [ref, callback, ref2]);
};
export default useOutsideClick;
