import { useEffect } from "react";

function useDebounce(incomingFunction, dependency) {
    useEffect(() => {
        const debounceTheFunction = setTimeout(() => {
            incomingFunction();
        }, 200);
        return () => {
            clearTimeout(debounceTheFunction);
        };
    }, [...dependency]);
}

export default useDebounce;
