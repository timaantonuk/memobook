"use client"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { fetchUserStats, initializeUserStats } from "@/app/utils/userStatsService"

interface UserStats {
    streak: number
    totalLearningCards: number
    dailyLearningCards: { [date: string]: number }
    lastLoginDate: string
}

interface UserStatsStore {
    stats: UserStats
    setStats: (stats: UserStats) => void
    incrementStreak: () => void
    setTotalLearningCards: (count: number) => void
    addDailyLearningCards: (date: string, count: number) => void
    initializeStats: (userId: string) => Promise<void>
}

export const useUserStatsStore = create<UserStatsStore>()(
    devtools(
        persist(
            (set, get) => ({
                stats: {
                    streak: 0,
                    totalLearningCards: 0,
                    dailyLearningCards: {},
                    lastLoginDate: new Date().toISOString(),
                },
                setStats: (stats) => set({ stats }),
                incrementStreak: () =>
                    set((state) => ({
                        stats: { ...state.stats, streak: state.stats.streak + 1 },
                    })),
                setTotalLearningCards: (count) =>
                    set((state) => ({
                        stats: { ...state.stats, totalLearningCards: count },
                    })),
                addDailyLearningCards: (date, count) =>
                    set((state) => ({
                        stats: {
                            ...state.stats,
                            dailyLearningCards: {
                                ...state.stats.dailyLearningCards,
                                [date]: (state.stats.dailyLearningCards[date] || 0) + count,
                            },
                        },
                    })),
                initializeStats: async (userId) => {
                    const stats = await fetchUserStats(userId)
                    if (stats) {
                        set({ stats })
                    } else {
                        await initializeUserStats(userId)
                        const newStats = await fetchUserStats(userId)
                        if (newStats) set({ stats: newStats })
                    }
                },
            }),
            {
                name: "user-stats-storage",
            },
        ),
    ),
)

