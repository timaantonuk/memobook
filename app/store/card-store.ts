"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Интерфейс карточки
interface Card {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    photoUrl: string;
    userId: string;
    status: "learning" | "learned";
    createdAt: string;
    stepOfRepetition: number;
    nextReview: string | null;
}

// Интерфейс Zustand Store
interface CardState {
    cards: Card[];
    setCards: (cards: Card[] | null | undefined) => void;
    addCard: (card: Card) => void;
    updateCard: (id: string, updates: Partial<Card>) => void;
    removeCard: (id: string) => void;
    removeCardsByCategory: (categoryId: string) => void;
}

export const useCardStore = create<CardState>()(
    devtools((set, get) => ({
        cards: [],

        // Устанавливаем карточки в стейт, только если это массив
        setCards: (cards) => {
            if (!Array.isArray(cards)) {
                console.error("❌ Ошибка в setCards: передано не массив!", cards);
                return;
            }
            set(() => ({ cards }));
        },

        addCard: (card) => {
            set((state) => ({
                cards: [...state.cards, card],
            }));
        },

        updateCard: (id: string, updates: Partial<Card>) => {
            set((state) => ({
                cards: state.cards.map((card) =>
                    card.id === id ? { ...card, ...updates } : card
                ),
            }));
        },

        removeCard: (id: string) => {
            set((state) => ({
                cards: state.cards.filter((card) => card.id !== id),
            }));
        },

        // 🔥 Удаление всех карточек по категории
        removeCardsByCategory: (categoryId: string) => {
            set((state) => {
                const filteredCards = state.cards.filter((card) => card.categoryId !== categoryId);

                if (!Array.isArray(filteredCards)) {
                    console.error("❌ Ошибка в removeCardsByCategory: filteredCards не массив!", filteredCards);
                    return state;
                }

                return { cards: filteredCards };
            });
        },
    }), { name: "Card Store" })
);