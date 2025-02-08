"use client"

import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useUserStore } from "@/app/store/user-store"
import { initializeUserStats, fetchUserStats } from "@/app/utils/userStatsService"

export const useInitialUser = () => {
    const { user, isLoaded } = useUser()
    const setUser = useUserStore((state) => state.setUser)

    useEffect(() => {
        const initUser = async () => {
            if (isLoaded && user) {
                setUser({
                    id: user.id,
                    username: user.username || "",
                    email: user.primaryEmailAddress?.emailAddress || "",
                    imageUrl: user.imageUrl || "",
                })
                await initializeUserStats(user.id)
                await fetchUserStats(user.id)
            }
        }

        initUser()
    }, [isLoaded, user, setUser])
}

