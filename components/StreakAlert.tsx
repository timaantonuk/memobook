"use client"
import { useUserStatsStore } from "@/app/store/user-stats"
import { useUserStore } from "@/app/store/user-store"
import { useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const StreakAlert = () => {
    const { stats, initializeStats } = useUserStatsStore()
    const userId = useUserStore((state) => state.id)

    useEffect(() => {
        if (userId) {
            initializeStats(userId)
        }
    }, [userId, initializeStats])

    return (
        <div className='w-full mx-auto h-full'>
            <Alert className='h-full flex items-center justify-center  relative p-5'>

                <div className='sparkling'>
                    <AlertTitle className='text-xl lg:text-3xl underline'>Current Streak</AlertTitle>
                    <AlertDescription className='lg:text-2xl'>
                        You&apos;ve been learning for {stats.streak} day{stats.streak !== 1 ? 's' : ''} in a row 🔥
                    </AlertDescription>
                </div>
            </Alert>
        </div>
    )
}

export default StreakAlert

