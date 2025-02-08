"use client"

import { useCallback, useEffect, useState } from "react"
import { useCardStore } from "@/app/store/card-store"
import { useUserStore } from "@/app/store/user-store"
import { fetchUserCards } from "@/app/utils/cardsService"

export const useInitialCards = () => {
    const userId = useUserStore((state) => state.id)
    const setCards = useCardStore((state) => state.setCards)
    const [isFetching, setIsFetching] = useState(false)

    const fetchCards = useCallback(async () => {
        if (!userId || isFetching) return
        setIsFetching(true)

        try {
            const fetchedCards = await fetchUserCards(userId)
            setCards(fetchedCards)
        } catch (error) {
            console.error("Error loading cards:", error)
        } finally {
            setIsFetching(false)
        }
    }, [userId, setCards, isFetching])

    useEffect(() => {
        fetchCards()
    }, [fetchCards])
}

