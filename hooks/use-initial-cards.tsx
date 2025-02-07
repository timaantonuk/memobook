'use client';

import { useCallback, useEffect, useState } from "react";
import { useCardStore } from "@/app/store/card-store";
import { useUserStore } from "@/app/store/user-store";
import { fetchUserCards } from "@/app/utils/cardsService";

export const useInitialCards = () => {
    const userId = useUserStore((state) => state.id);
    const setCards = useCardStore((state) => state.setCards);
    const [isFetching, setIsFetching] = useState(false); // 🟢 Флаг загрузки

    const fetchCards = useCallback(async () => {
        if (!userId || isFetching) return;
        setIsFetching(true);

        console.log("📌 Загружаем карточки для пользователя:", userId);

        try {
            const fetchedCards = await fetchUserCards(userId);
            console.log("🟢 Полученные карточки:", fetchedCards);

            setCards(fetchedCards);
        } catch (error) {
            console.error("❌ Ошибка загрузки карточек:", error);
        } finally {
            setIsFetching(false);
        }
    }, [userId, setCards]);

    useEffect(() => {
        fetchCards();
    }, [fetchCards]);
};