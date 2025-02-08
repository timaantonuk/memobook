"use client"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface Category {
    id: string
    name: string
    userId: string
}

interface CategoryState {
    categories: Category[]
    selectedCategoryId: string | null // 🆕 null = All Cards
    setCategories: (categories: Category[]) => void
    setSelectedCategory: (categoryId: string | null) => void
    addCategory: (category: Category) => void // 🆕 Новая функция
    deleteCategory: (id: string) => void
}

export const useCategoryStore = create<CategoryState>()(
    devtools((set) => ({
        categories: [],
        selectedCategoryId: null, // 🆕 По умолчанию "Все карточки"

        setCategories: (categories) => set({ categories }),
        setSelectedCategory: (categoryId) => set({ selectedCategoryId: categoryId }),
        addCategory: (category) =>
            set((state) => ({
                categories: [...state.categories, category], // 🔥 Добавляем в массив
                selectedCategoryId: category.id, // 📌 Автоматически выбираем её
            })),
        deleteCategory: (id) =>
            set((state) => ({
                categories: state.categories.filter((category) => category.id !== id),
                selectedCategoryId: state.selectedCategoryId === id ? null : state.selectedCategoryId, // 🛠 Если удалили активную категорию → сбрасываем
            })),
    })),
)

