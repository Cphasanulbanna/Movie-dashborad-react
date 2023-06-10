import { create } from "zustand";

export const useQueryStore = create((set) => ({
    query: "",
    updateQuery: (value) => set({ query: value }),
}));
