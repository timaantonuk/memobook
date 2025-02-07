import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {formatFirestoreTimestamp} from "@/app/utils/formatFirestoreTimestamp";

interface Card {
    id: string;
    title: string;
    description: string;
    category: string;
    photoUrl: string;
    userId: string;
    createdAt: string;
    totalRepetitionQuantity: number;
    stepOfRepetition: number;
    nextReview: string | null;
    status: "learning" | "learned"; // 🆕 Добавляем статус карточки
}

interface CardState {
    cards: Card[];
    setCards: (cards: Card[]) => void;
    addCard: (card: Omit<Card, 'id' | 'createdAt' | 'nextReview' | 'stepOfRepetition' | 'totalRepetitionQuantity'>) => void;
    removeCard: (id: string) => void;
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
                    },
                ],
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