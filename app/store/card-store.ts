"use client"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { useCategoryStore } from "./categories-store"
import { updateTotalLearningCards, addDailyLearningCards } from "@/app/utils/userStatsService"
import { useUserStore } from "./user-store"

interface Card {
    id: string
    title: string
    description: string
    categoryId: string
    photoUrl?: string
    userId: string
    createdAt: string
    stepOfRepetition: number
    status: "learning" | "learned"
    nextReview: string
}

interface CardState {
    cards: Card[]
    selectedCategoryId: string | null
    filteredCards: Card[]
    isLoading: boolean
    error: string | null
    setCards: (cards: Card[]) => void
    addCard: (card: Card) => void
    setSelectedCategory: (categoryId: string | null) => void
    updateCard: (id: string, updates: Partial<Card>) => void
    removeCard: (id: string) => void
    removeCardsByCategory: (categoryId: string) => void
    setError: (error: string | null) => void
    setLoading: (isLoading: boolean) => void
}

export const useCardStore = create<CardState>()(
    devtools((set, get) => ({
        cards: [],
        selectedCategoryId: null,
        filteredCards: [],
        isLoading: false,
        error: null,

        setLoading: (isLoading: boolean) => set({ isLoading }),
        setError: (error: string | null) => set({ error }),

        setCards: (cards) => {
            try {
                const selectedCategoryId = get().selectedCategoryId
                const filtered = selectedCategoryId ? cards.filter((card) => card.categoryId === selectedCategoryId) : cards

                const learningCards = cards.filter((c) => c.status === "learning")
                const userId = useUserStore.getState().id

                if (userId) {
                    updateTotalLearningCards(userId, learningCards.length)
                }

                set({
                    cards,
                    filteredCards: filtered,
                    error: null,
                })
            } catch (error) {
                console.error("Error setting cards:", error)
                set({ error: "Failed to update cards" })
            }
        },

        addCard: (card) => {
            try {
                set((state) => {
                    const updatedCards = [...state.cards, card]
                    const filtered = state.selectedCategoryId
                        ? updatedCards.filter((c) => c.categoryId === state.selectedCategoryId)
                        : updatedCards

                    const learningCards = updatedCards.filter((c) => c.status === "learning")
                    const userId = useUserStore.getState().id

                    if (userId) {
                        updateTotalLearningCards(userId, learningCards.length)
                        addDailyLearningCards(userId, 1)
                    }

                    return {
                        cards: updatedCards,
                        filteredCards: filtered,
                        error: null,
                    }
                })
            } catch (error) {
                console.error("Error adding card:", error)
                set({ error: "Failed to add card" })
            }
        },

        updateCard: (id, updates) => {
            try {
                set((state) => {
                    const updatedCards = state.cards.map((card) => (card.id === id ? { ...card, ...updates } : card))

                    const filtered = state.selectedCategoryId
                        ? updatedCards.filter((c) => c.categoryId === state.selectedCategoryId)
                        : updatedCards

                    const learningCards = updatedCards.filter((c) => c.status === "learning")
                    const userId = useUserStore.getState().id

                    if (userId) {
                        updateTotalLearningCards(userId, learningCards.length)
                    }

                    return {
                        cards: updatedCards,
                        filteredCards: filtered,
                        error: null,
                    }
                })
            } catch (error) {
                console.error("Error updating card:", error)
                set({ error: "Failed to update card" })
            }
        },

        removeCard: (id) => {
            try {
                set((state) => {
                    const updatedCards = state.cards.filter((card) => card.id !== id)
                    const filtered = state.selectedCategoryId
                        ? updatedCards.filter((card) => card.categoryId === state.selectedCategoryId)
                        : updatedCards

                    const learningCards = updatedCards.filter((c) => c.status === "learning")
                    const userId = useUserStore.getState().id

                    if (userId) {
                        updateTotalLearningCards(userId, learningCards.length)
                    }

                    return {
                        cards: updatedCards,
                        filteredCards: filtered,
                        error: null,
                    }
                })
            } catch (error) {
                console.error("Error removing card:", error)
                set({ error: "Failed to remove card" })
            }
        },

        removeCardsByCategory: (categoryId) => {
            try {
                set((state) => {
                    const updatedCards = state.cards.filter((card) => card.categoryId !== categoryId)
                    const filtered = state.filteredCards.filter((card) => card.categoryId !== categoryId)

                    const learningCards = updatedCards.filter((c) => c.status === "learning")
                    const userId = useUserStore.getState().id

                    if (userId) {
                        updateTotalLearningCards(userId, learningCards.length)
                    }

                    return {
                        cards: updatedCards,
                        filteredCards: filtered,
                        error: null,
                    }
                })
            } catch (error) {
                console.error("Error removing cards by category:", error)
                set({ error: "Failed to remove cards" })
            }
        },

        setSelectedCategory: (categoryId) => {
            try {
                const allCards = get().cards
                const filtered = categoryId ? allCards.filter((card) => card.categoryId === categoryId) : allCards

                set({
                    selectedCategoryId: categoryId,
                    filteredCards: filtered,
                    error: null,
                })

                useCategoryStore.getState().setSelectedCategory(categoryId)
            } catch (error) {
                console.error("Error setting selected category:", error)
                set({ error: "Failed to set category" })
            }
        },
    })),
)

