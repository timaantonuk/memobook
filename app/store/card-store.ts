"use client"
import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { useCategoryStore } from "./categories-store"

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
    nextReview: string | null
}

interface CardState {
    cards: Card[]
    selectedCategoryId: string | null
    filteredCards: Card[]
    setCards: (cards: Card[]) => void
    addCard: (card: Card) => void
    setSelectedCategory: (categoryId: string | null) => void
    updateCard: (id: string, updates: Partial<Card>) => void
    removeCard: (id: string) => void
    removeCardsByCategory: (categoryId: string) => void
}

export const useCardStore = create<CardState>()(
    devtools((set, get) => ({
        cards: [],
        selectedCategoryId: null,
        filteredCards: [],

        setCards: (cards) => {
            const selectedCategoryId = get().selectedCategoryId
            const filtered = selectedCategoryId ? cards.filter((card) => card.categoryId === selectedCategoryId) : cards

            set({
                cards,
                filteredCards: filtered,
            })
        },

        addCard: (card) => {
            set((state) => {
                const updatedCards = [...state.cards, card]
                const filtered = state.selectedCategoryId
                    ? updatedCards.filter((c) => c.categoryId === state.selectedCategoryId)
                    : updatedCards

                return {
                    cards: updatedCards,
                    filteredCards: filtered,
                }
            })
        },

        updateCard: (id, updates) => {
            set((state) => {
                const updatedCards = state.cards.map((card) => (card.id === id ? { ...card, ...updates } : card))

                const filtered = state.selectedCategoryId
                    ? updatedCards.filter((c) => c.categoryId === state.selectedCategoryId)
                    : updatedCards

                return {
                    cards: updatedCards,
                    filteredCards: filtered,
                }
            })
        },

        removeCard: (id) => {
            set((state) => {
                const updatedCards = state.cards.filter((card) => card.id !== id)
                return {
                    cards: updatedCards,
                    filteredCards: state.selectedCategoryId
                        ? updatedCards.filter((card) => card.categoryId === state.selectedCategoryId)
                        : updatedCards,
                }
            })
        },

        removeCardsByCategory: (categoryId) => {
            set((state) => ({
                cards: state.cards.filter((card) => card.categoryId !== categoryId),
                filteredCards: state.filteredCards.filter((card) => card.categoryId !== categoryId),
            }))
        },

        setSelectedCategory: (categoryId) => {
            const allCards = get().cards
            const filtered = categoryId ? allCards.filter((card) => card.categoryId === categoryId) : allCards

            console.log("📂 setSelectedCategory called with:", categoryId)
            console.log("🃏 All cards before filtering:", allCards)
            console.log("🔍 New filteredCards:", filtered)

            set(
                () => ({
                    selectedCategoryId: categoryId,
                    filteredCards: [...filtered],
                }),
                false,
                "Selected category updated",
            )

            useCategoryStore.getState().setSelectedCategory(categoryId)
        },
    })),
)

