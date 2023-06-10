import { create } from "zustand";

export const useQueryStore = create((set) => ({
    query: "",
    updateQuery: (newInfo) => set((state) => ({ query: newInfo })),
}));
