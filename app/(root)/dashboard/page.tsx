// "use client"
// import { useEffect } from "react"
// import { GoalSetter } from "@/components/GoalSetter"
// import LineChartStat from "@/components/LineChartStat"
// import LearningStats from "@/components/LearningStats"
// import StreakAlert from "@/components/StreakAlert"
// import { useUserStore } from "@/app/store/user-store"
// import { useUserStatsStore } from "@/app/store/user-stats"
//
// const Page = () => {
//     const userId = useUserStore((state) => state.id)
//     const { initializeStats } = useUserStatsStore()
//
//     useEffect(() => {
//         if (userId) {
//             initializeStats(userId)
//         }
//     }, [userId, initializeStats])
//
//     return (
//         <section className="main-container flex flex-col-reverse px-5 lg:grid gap-5 lg:grid-cols-2 pb-20 lg:pb-5">
//             <GoalSetter />
//             <LineChartStat />
//             <LearningStats />
//             <StreakAlert />
//         </section>
//     )
// }
//
// export default Page
//


"use client"
import { useEffect } from "react"
import { motion } from "framer-motion"
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

    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: -100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.75,
            },
        },
    }

    const statBlocks = [
        { component: <GoalSetter />, id: "goal-setter" },
        { component: <LineChartStat />, id: "line-chart" },
        { component: <LearningStats />, id: "learning-stats" },
        { component: <StreakAlert />, id: "streak-alert" },
    ]

    return (
        <motion.section
            className="main-container flex flex-col-reverse px-5 lg:grid gap-5 lg:grid-cols-2 pb-20 lg:pb-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {statBlocks.map(({ component, id }) => (
                <motion.div key={id} variants={itemVariants} className="w-full h-full">
                    {component}
                </motion.div>
            ))}
        </motion.section>
    )
}

export default Page

