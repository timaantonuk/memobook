"use client"
import { useEffect } from "react"
import { GoalSetter } from "@/components/GoalSetter"
import LineChartStat from "@/components/LineChartStat"
import LearningStats from "@/components/LearningStats"
import StreakAlert from "@/components/StreakAlert"
import { useUserStore } from "@/app/store/user-store"
import { useUserStatsStore } from "@/app/store/user-stats"

const Page = () => {
    const userId = useUserStore((state) => state.id)
    const { initializeStats } = useUserStatsStore()

    useEffect(() => {
        if (userId) {
            initializeStats(userId)
        }
    }, [userId, initializeStats])

    return (
        <section className="main-container flex flex-col-reverse px-5 lg:grid gap-5 lg:grid-cols-2 pb-20 lg:pb-5">
            <GoalSetter />
            <LineChartStat />
            <LearningStats />
            <StreakAlert />
        </section>
    )
}

export default Page

