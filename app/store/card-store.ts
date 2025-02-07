"use client";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { formatFirestoreTimestamp } from "@/app/utils/formatFirestoreTimestamp";

// 🟢 Интерфейс для одной карточки
interface Card {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    photoUrl?: string;
    userId: string;
    createdAt: string;
    nextReview: string | null;
    stepOfRepetition: number;
    status: "learning" | "learned";
}

// 🟢 Интерфейс для Zustand store
interface CardState {
    cards: Card[];
    setCards: (cards: Card[]) => void;
    addCard: (card: Omit<Card, "id" | "createdAt" | "nextReview">) => void;
    updateCard: (id: string, updates: Partial<Card>) => void;
    removeCard: (id: string) => void;
}

// 🟢 Zustand Store
export const useCardStore = create<CardState>()(
    devtools((set, get) => ({
        cards: [],

        setCards: (cards) => {
            set(() => ({
                cards: cards.map((card) => ({
                    ...card,
                    nextReview: formatFirestoreTimestamp(card.nextReview),
                })),
            }));
        },

        addCard: (card) => {
            set((state) => ({
                cards: [
                    ...state.cards,
                    {
                        ...card,
                        id: crypto.randomUUID(),
                        createdAt: new Date().toISOString(),
                        nextReview: new Date().toISOString(),
                        status: "learning",
                    },
                ],
            }));
        },

        updateCard: (id: string, updates: Partial<Card>) => {
            set((state) => ({
                cards: [...state.cards.map((card) =>
                    card.id === id ? { ...card, ...updates } : card
                )],
            }));
        },

        removeCard: (id) => {
            console.log("🟢 Removing Card ID:", id);
            set((state) => ({
                cards: [...state.cards.filter((card) => card.id !== id)],
            }));
        },

    }), { name: "Card Store" })
);