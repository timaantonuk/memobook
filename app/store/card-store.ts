"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { format } from "date-fns";

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
    setCards: (cards: Card[]) => void;
    addCard: (card: Card) => void;
    updateCard: (id: string, updates: Partial<Card>) => void;
    removeCard: (id: string) => void;
}

export const useCardStore = create<CardState>()(
    devtools((set, get) => ({
        cards: [],

        setCards: (cards) => {
            set((state) => {
                if (JSON.stringify(state.cards) === JSON.stringify(cards)) return state;
                return { cards };
            });
        },

        addCard: (card) => {
            set((state) => ({
                cards: [...state.cards, card],
            }));
        },

        updateCard: (id: string, updates: Partial<Card>) => {
            set((state) => ({
                cards: state.cards.map((card) => (card.id === id ? { ...card, ...updates } : card)),
            }));
        },

        removeCard: (id: string) => {
            set((state) => ({
                cards: state.cards.filter((card) => card.id !== id),
            }));
        },
    }), { name: "Card Store" })
);