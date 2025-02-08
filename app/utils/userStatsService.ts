import { db } from "@/app/firebaseConfig"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { useUserStatsStore } from "@/app/store/user-stats"

export const fetchUserStats = async (userId: string) => {
    const userStatsRef = doc(db, "userStats", userId)
    const userStatsDoc = await getDoc(userStatsRef)

    if (userStatsDoc.exists()) {
        return userStatsDoc.data()
    }

    return null
}

export const initializeUserStats = async (userId: string) => {
    const existingStats = await fetchUserStats(userId)

    if (!existingStats) {
        const initialStats = {
            streak: 1,
            totalLearningCards: 0,
            dailyLearningCards: {
                [new Date().toISOString().split("T")[0]]: 0,
            },
            lastLoginDate: new Date().toISOString(),
        }
        await setDoc(doc(db, "userStats", userId), initialStats)
        useUserStatsStore.getState().setStats(initialStats)
    } else {
        const today = new Date()
        const lastLoginDate = new Date(existingStats.lastLoginDate)
        const diffDays = Math.floor((today.getTime() - lastLoginDate.getTime()) / (1000 * 3600 * 24))

        if (diffDays === 1) {
            existingStats.streak += 1
        } else if (diffDays > 1) {
            existingStats.streak = 1
        }

        existingStats.lastLoginDate = today.toISOString()
        if (!existingStats.dailyLearningCards[today.toISOString().split("T")[0]]) {
            existingStats.dailyLearningCards[today.toISOString().split("T")[0]] = 0
        }

        await updateDoc(doc(db, "userStats", userId), existingStats)
        useUserStatsStore.getState().setStats(existingStats)
    }
}

export const updateTotalLearningCards = async (userId: string, count: number) => {
    const userStatsRef = doc(db, "userStats", userId)
    await updateDoc(userStatsRef, { totalLearningCards: count })
    useUserStatsStore.getState().setTotalLearningCards(count)
}

export const addDailyLearningCards = async (userId: string, count: number) => {
    const today = new Date().toISOString().split("T")[0]
    const userStatsRef = doc(db, "userStats", userId)
    const userStatsDoc = await getDoc(userStatsRef)
    const stats = userStatsDoc.data()

    if (stats) {
        stats.dailyLearningCards[today] = (stats.dailyLearningCards[today] || 0) + count
        await updateDoc(userStatsRef, { dailyLearningCards: stats.dailyLearningCards })
        useUserStatsStore.getState().addDailyLearningCards(today, count)
    }
}

