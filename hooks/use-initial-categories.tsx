'use client'


import { useEffect } from "react";
import { useCategoryStore } from "@/app/store/categories-store";
import { useUserStore } from "@/app/store/user-store";
import {fetchUserCategories} from "@/app/utils/categoryService";


export const useInitialCategories = () => {
    const user = useUserStore((state) => state);
    const setCategories = useCategoryStore((state) => state.setCategories);

    useEffect(() => {
        if (user.id) {
            fetchUserCategories(user.id).then(setCategories);
        }
    }, [user.id, setCategories]);
};