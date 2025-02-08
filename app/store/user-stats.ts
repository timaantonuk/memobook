"use client"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { fetchUserStats, initializeUserStats } from "@/app/utils/userStatsService"
import type { UserStatsStore } from "@/types/user-stats"

export const useUserStatsStore = create<UserStatsStore>()(
    devtools(
        persist(
            (set) => ({
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

