export interface UserStats {
    streak: number
    totalLearningCards: number
    dailyLearningCards: { [date: string]: number }
    lastLoginDate: string
}

export interface UserStatsStore {
    stats: UserStats
    setStats: (stats: UserStats) => void
    incrementStreak: () => void
    setTotalLearningCards: (count: number) => void
    addDailyLearningCards: (date: string, count: number) => void
    initializeStats: (userId: string) => Promise<void>
}

