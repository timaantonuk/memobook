"use client"

import { useEffect } from "react"
import { useCategoryStore } from "@/app/store/categories-store"
import { useUserStore } from "@/app/store/user-store"
import { fetchUserCategories } from "@/app/utils/categoryService"

export const useInitialCategories = () => {
    const userId = useUserStore((state) => state.id)
    const setCategories = useCategoryStore((state) => state.setCategories)

    useEffect(() => {
        if (userId) {
            fetchUserCategories(userId).then(setCategories)
        }
    }, [userId, setCategories])
}

