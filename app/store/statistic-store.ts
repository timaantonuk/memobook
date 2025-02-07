import { create } from 'zustand';
import { devtools } from "zustand/middleware";

interface Statistics {
    learnedCardAmount: number;
    streakDays: number;
    incrementLearned: () => void;
    incrementStreak: () => void;
}

export const useStatisticsStore = create<Statistics>((set) => ({
    learnedCardAmount: 1,
    streakDays: 1,
    incrementLearned: () =>
        set((state) => ({ learnedCardAmount: state.learnedCardAmount + 1 })),
    incrementStreak: () =>
        set((state) => ({ streakDays: state.streakDays + 1 })),
}));
