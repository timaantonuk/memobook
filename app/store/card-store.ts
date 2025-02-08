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

        // ✅ Устанавливаем все карточки и сразу фильтруем их
        setCards: (cards) => {
            const selectedCategoryId = get().selectedCategoryId
            const filtered = selectedCategoryId ? cards.filter((card) => card.categoryId === selectedCategoryId) : cards

            set({
                cards,
                filteredCards: filtered,
            })
        },

        // ✅ Добавляем новую карточку и обновляем filteredCards
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

        // ✅ Обновляем карточку и пересчитываем filteredCards
        updateCard: (id, updates) => {
            set((state) => {
                const updatedCards = state.cards.map((card) =>
                    card.id === id ? { ...card, ...updates } : card
                );

                return {
                    cards: updatedCards,
                    filteredCards: state.selectedCategoryId
                        ? updatedCards.filter((c) => c.categoryId === state.selectedCategoryId)
                        : updatedCards,
                };
            });

            setTimeout(() => {
                set((state) => ({ cards: [...state.cards] })); // 🔥 Принудительное обновление состояния
            }, 50);
        },

        // ✅ Удаляем карточку
        removeCard: (id) => {
            set((state) => {
                const updatedCards = state.cards.filter((card) => card.id !== id);
                return {
                    cards: updatedCards,
                    filteredCards: state.selectedCategoryId
                        ? updatedCards.filter((card) => card.categoryId === state.selectedCategoryId)
                        : updatedCards, // 🔥 Мгновенное обновление UI
                };
            });
        },



        // ✅ Удаляем все карточки из определённой категории
        removeCardsByCategory: (categoryId) => {
            set((state) => ({
                cards: state.cards.filter((card) => card.categoryId !== categoryId),
                filteredCards: state.filteredCards.filter((card) => card.categoryId !== categoryId),
            }))
        },



        // ✅ Устанавливаем активную категорию и обновляем фильтр
        setSelectedCategory: (categoryId) => {
            const allCards = get().cards // Получаем все карточки
            const filtered = categoryId ? allCards.filter((card) => card.categoryId === categoryId) : allCards // Если выбрана "All Cards", показываем все

            console.log("📂 setSelectedCategory вызван с:", categoryId)
            console.log("🃏 Все карточки перед фильтрацией:", allCards)
            console.log("🔍 Новые filteredCards:", filtered)

            set(
                () => ({
                    selectedCategoryId: categoryId,
                    filteredCards: [...filtered], // ✅ Принудительно создаём новый массив
                }),
                false,
                "Selected category updated",
            )

            // Обновляем selectedCategoryId в categories-store
            useCategoryStore.getState().setSelectedCategory(categoryId)
        },
    })),
)

