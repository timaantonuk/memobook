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
        const intervals = [1, 2, 4, 7, 15, 30]; // Примерные интервалы (в днях)
        const maxInterval = intervals[intervals.length - 1]; // Последний интервал
        const interval = step < intervals.length ? intervals[step] : maxInterval; // Если step слишком большой, берем последний интервал

        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + interval);
        return nextDate.toISOString();
    };

    const handleSwipe = async (cardId: string, direction: "left" | "right") => {
        const card = cards.find((c) => c.id === cardId);
        if (!card) return;

        if (direction === "right") {
            if (card.stepOfRepetition >= 9) {
                // ✅ Карточка выучена → удаляем из стейта и базы
                updateCard(cardId, { status: "learned" });
                await updateCardInFirebase(cardId, { status: "learned" });
                removeCard(cardId);
            } else {
                // ✅ Увеличиваем шаг и ставим новую дату повторения
                const nextReviewDate = calculateNextReview(card.stepOfRepetition + 1);
                updateCard(cardId, {
                    stepOfRepetition: card.stepOfRepetition + 1,
                    nextReview: nextReviewDate,
                });
                await updateCardInFirebase(cardId, {
                    stepOfRepetition: card.stepOfRepetition + 1,
                    nextReview: nextReviewDate,
                });
            }
        } else if (direction === "left") {
            // ✅ Сбрасываем шаг и начинаем сначала
            updateCard(cardId, { stepOfRepetition: 0, nextReview: calculateNextReview(0) });
            await updateCardInFirebase(cardId, { stepOfRepetition: 0, nextReview: calculateNextReview(0) });
        }

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