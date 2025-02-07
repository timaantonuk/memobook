"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import {useUserStore} from "@/app/store/user-store";


export default function UserProvider() {
    const { user } = useUser();
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        if (user) {
            setUser({
                id: user.id,
                username: user.username || "",
                firstName: user.firstName || "",
                emailAddresses: user.emailAddresses || "",
                imageUrl: user.imageUrl,
                hasImage: Boolean(user.imageUrl),
            });
        }
    }, [user, setUser]);

    return null; // No UI needed, just updates Zustand store
}
