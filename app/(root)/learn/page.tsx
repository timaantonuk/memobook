'use client'
import React from 'react';
import Categories from "@/components/Categories";
import {CardSwipe} from "@/components/swipe/CardSwipe";
import {useCardStore} from "@/app/store/card-store";
import {useUserStore} from "@/app/store/user-store"; // ✅ Импортируем user-store
import {fetchUserCards, updateCardInFirebase} from "@/app/utils/cardsService";
import {addDays, formatISO} from "date-fns";

const Page = () => {

    const userId = useUserStore((state) => state.id); // ✅ Получаем userId
    const updateCard = useCardStore((state) => state.updateCard);
    const removeCard = useCardStore((state) => state.removeCard);
    const setCards = useCardStore((state)=>state.setCards);

    const calculateNextReview = (step: number): string => {
        const intervals = [1, 2, 4, 7, 15, 30]; // Дни между повторениями
        const maxStep = intervals.length - 1;

        if (step > maxStep) {
            console.warn(`🎓 Карточка полностью выучена! step=${step}`);
            return new Date().toISOString(); // ✅ Возвращаем текущую дату, чтобы не было undefined
        }

        const interval = intervals[Math.min(step, maxStep)];
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + interval);

        return nextDate.toISOString();
    };

    const handleSwipe = async (cardId: string, direction: "left" | "right") => {
        const card = cards.find((c) => c.id === cardId);
        if (!card) return;

        let updatedCard = { ...card };

        if (direction === "right") {
            if (card.stepOfRepetition >= 9) {
                updatedCard.status = "learned";
                removeCard(cardId);
            } else {
                updatedCard.stepOfRepetition += 1;
                updatedCard.nextReview = calculateNextReview(updatedCard.stepOfRepetition);
                updateCard(cardId, updatedCard);
            }
        } else if (direction === "left") {
            updatedCard.stepOfRepetition = 0;
            updatedCard.nextReview = calculateNextReview(0);
            updateCard(cardId, updatedCard);
        }

        // 🔥 Мгновенно обновляем UI
        setCards((prevCards) =>
            prevCards.map((c) => (c.id === cardId ? updatedCard : c))
        );

        // 🔄 Синхронизируем с Firestore
        await updateCardInFirebase(cardId, updatedCard);

        // 🔄 Загружаем актуальные карточки
        const updatedCards = await fetchUserCards(user.id);
        setCards(updatedCards);
    };

    const cards = useCardStore((state)=>state.cards);

    const handleSwipeUpdate = (cardId: string, direction: "left" | "right") => {
        console.log(`Card ${cardId} swiped ${direction}`);
        handleSwipe(cardId, direction);
    };

    return (
        <section className='main-container flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-[3fr_1fr] gap-5'>
            <CardSwipe onSwipe={handleSwipeUpdate} cards={cards}/>
                <Categories/>
        </section>
    );
};

export default Page;