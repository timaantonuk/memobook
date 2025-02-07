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

        let newStep = direction === "right" ? card.stepOfRepetition + 1 : 0;
        let nextReviewDate = calculateNextReview(newStep); // ✅ Всегда есть дата

        if (newStep > 9) {
            console.log(`🎉 Карточка ${cardId} полностью выучена!`);
            updateCard(cardId, { status: "learned", nextReview: nextReviewDate }); // ✅ Без undefined
            await updateCardInFirebase(cardId, { status: "learned", nextReview: nextReviewDate });
            removeCard(cardId);
        } else {
            console.log(`🔁 Обновляем карточку ${cardId}, следующее повторение: ${nextReviewDate}`);
            updateCard(cardId, { stepOfRepetition: newStep, nextReview: nextReviewDate });
            await updateCardInFirebase(cardId, { stepOfRepetition: newStep, nextReview: nextReviewDate });
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