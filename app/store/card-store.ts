'use client'
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {formatFirestoreTimestamp} from "@/app/utils/formatFirestoreTimestamp";


interface CardState {
    title: string;
    description: string;
    category: string;
    categoryId: string; // 🆕 Добавлено поле categoryId
    photoUrl: string;
    userId: string;
    status?: "learning" | "learned"; // по умолчанию learning
}

export const useCardStore = create<CardState>()(
    devtools((set, get) => ({
        cards: [],

        setCards: (cards) => {
            set({
                cards: cards.map((card) => ({
                    ...card,
                    nextReview: formatFirestoreTimestamp(card.nextReview), // 🛠 Исправляем формат даты
                })),
            });
        },

        addCard: (card) => {
            set((state) => ({
                cards: [
                    ...state.cards,
                    {
                        ...card,
                        id: crypto.randomUUID(),
                        createdAt: new Date().toISOString(),
                        totalRepetitionQuantity: 9,
                        stepOfRepetition: 0,
                        nextReview: new Date().toISOString(),
                        status: "learning", // 🆕 Все новые карточки по умолчанию "learning"
                        categoryId: card.categoryId, // 🆕 Добавляем categoryId
                    },
                ],
            }));
        },

        updateCard: (id: string, updates: Partial<CardState>) => {
            set((state) => ({
                cards: state.cards.map((card) =>
                    card.id === id ? { ...card, ...updates } : card
                ),
            }));
        },

        removeCard: (id) => {
            console.log("🟢 Removing Card ID:", id);
            set((state) => ({
                cards: state.cards.filter((card) => card.id !== id),
            }));
        },

    }), { name: "Card Store" })
);