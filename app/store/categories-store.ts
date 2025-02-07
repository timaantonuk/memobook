import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Category {
    id: string;
    name: string;
}

interface CategoryState {
    categories: Category[];
    setCategories: (newCategories: Category[]) => void;
    addCategory: (category: Category) => void;
    deleteCategory: (categoryId: string) => void;
}

export const useCategoryStore = create<CategoryState>()(
    devtools((set, get) => ({
        categories: [],

        setCategories: (newCategories) => {
            console.log("🔵 Setting Categories:", newCategories);
            set({ categories: newCategories });
        },

        addCategory: (category) => {
            console.log("🔵 Adding Category:", category);
            set((state) => ({
                categories: [...state.categories, category],
            }));
        },

        deleteCategory: (categoryId) => {
            console.log("🔵 Deleting Category ID:", categoryId);
            set((state) => ({
                categories: state.categories.filter((category) => category.id !== categoryId),
            }));
        },
    }), { name: "Category Store" })
);