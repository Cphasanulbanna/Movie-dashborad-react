import { useEffect } from "react";

function useDebounce(incomingFunction, dependency) {
    useEffect(() => {
        const debounceTheFunction = setTimeout(() => {
            incomingFunction();
        }, 300);
        return () => {
            clearTimeout(debounceTheFunction);
        };
    }, [...dependency]);
}

export default useDebounce;
