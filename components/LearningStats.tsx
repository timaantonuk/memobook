"use client"
import CardWrapper from "@/components/CardWrapper"
import BadgeWrapper from "@/components/BadgeWrapper"
import { useUserStatsStore } from "@/app/store/user-stats"
import { useEffect } from "react"
import { useUserStore } from "@/app/store/user-store"

const LearningStats = () => {
    const { stats, initializeStats } = useUserStatsStore()
    const userId = useUserStore((state) => state.id)

    useEffect(() => {
        if (userId) {
            initializeStats(userId)
        }
    }, [userId, initializeStats])

    return (
        <CardWrapper width="w-auto">
            <div className="flex flex-col items-center gap-2 my-5">
                <BadgeWrapper>
                    <h2 className="text-3xl lg:text-5xl ">Learning Cards: {stats.totalLearningCards}</h2>
                </BadgeWrapper>
            </div>
        </CardWrapper>
    )
}

export default LearningStats

