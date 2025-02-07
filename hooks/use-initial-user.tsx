'use client'


import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/app/store/user-store";

export const useInitialUser = () => {
    const { user, isLoaded } = useUser();
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        if (isLoaded && user) {
            setUser({
                id: user.id,
                username: user.username || "",
                email: user.primaryEmailAddress?.emailAddress || "",
                imageUrl: user.imageUrl || "",
            });
        }
    }, [isLoaded, user, setUser]);
};