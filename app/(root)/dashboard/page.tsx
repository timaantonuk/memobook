"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GoalSetter } from "@/components/GoalSetter"
import LineChartStat from "@/components/LineChartStat"
import LearningStats from "@/components/LearningStats"
import StreakAlert from "@/components/StreakAlert"
import { useUserStore } from "@/app/store/user-store"
import { useUserStatsStore } from "@/app/store/user-stats"
import Confetti from "react-confetti"
import { useWindowSize } from "react-use"
import { Bounce, toast, ToastContainer } from "react-toastify"

const Page = () => {
    const { width, height } = useWindowSize()
    const userId = useUserStore((state) => state.id)
    const { initializeStats } = useUserStatsStore()
    const [showConfetti, setShowConfetti] = useState(false)
    const [mounted, setMounted] = useState(false)

    const notify = () =>
        toast("🦄 Welcome back!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        })

    useEffect(() => {
        setMounted(true)

        // Check if this is a new login session
        const isNewSession = !sessionStorage.getItem("sessionActive")

        if (isNewSession) {
            setShowConfetti(true)
            notify()
            sessionStorage.setItem("sessionActive", "true")
        }

        // Clean up confetti after 5 seconds
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false)
        }, 5000)

        return () => clearTimeout(confettiTimer)
    }, [notify]) // Added notify to dependencies

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
            {mounted && showConfetti && <Confetti recycle={false} width={width} height={height} />}

            {statBlocks.map(({ component, id }) => (
                <motion.div key={id} variants={itemVariants} className="w-full h-full">
                    {component}
                </motion.div>
            ))}

            {mounted && (
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            )}
        </motion.section>
    )
}

export default Page

