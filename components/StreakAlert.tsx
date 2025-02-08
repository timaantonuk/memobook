"use client"
import { useUserStatsStore } from "@/app/store/user-stats"
import { useUserStore } from "@/app/store/user-store"
import { useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Flame } from "lucide-react"

const StreakAlert = () => {
    const { stats, initializeStats } = useUserStatsStore()
    const userId = useUserStore((state) => state.id)

    useEffect(() => {
        if (userId) {
            initializeStats(userId)
        }
    }, [userId, initializeStats])

    return (
        <Alert>
            <Flame className="h-4 w-4" />
            <AlertTitle>Current Streak</AlertTitle>
            <AlertDescription>
                You've been learning for {stats.streak} day{stats.streak !== 1 ? "s" : ""} in a row! Keep it up!
            </AlertDescription>
        </Alert>
    )
}

export default StreakAlert

