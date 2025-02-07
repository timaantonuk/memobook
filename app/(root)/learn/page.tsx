'use client'
import React from 'react';
import Categories from "@/components/Categories";
import {CardSwipe} from "@/components/swipe/CardSwipe";
import {useCardStore} from "@/app/store/card-store";
import {updateCardInFirebase} from "@/app/utils/cardsService";

const Page = () => {

    const updateCard = useCardStore((state) => state.updateCard);

    const calculateNextReview = (step: number): string => {
        const intervals = [1, 2, 4, 7, 15, 30]; // Примерные интервалы (в днях)
        const interval = intervals[Math.min(step, intervals.length - 1)];
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + interval);
        return nextDate.toISOString();
    };

    const handleSwipe = async (cardId: string, direction: "left" | "right") => {
        const card = cards.find((c) => c.id === cardId);
        if (!card) return;

        try {
            if (direction === "right") {
                if (card.stepOfRepetition >= 9) {
                    // Карточка выучена
                    const updatedCard = { status: "learned" };
                    updateCard(cardId, updatedCard); // Обновляем Zustand
                    await updateCardInFirebase(cardId, updatedCard); // Обновляем Firestore
                    console.log("🟢 Card marked as learned:", updatedCard);
                } else {
                    // Увеличиваем шаг и устанавливаем новую дату
                    const nextReviewDate = calculateNextReview(card.stepOfRepetition + 1);
                    const updatedCard = {
                        stepOfRepetition: card.stepOfRepetition + 1,
                        nextReview: nextReviewDate,
                    };
                    updateCard(cardId, updatedCard); // Обновляем Zustand
                    await updateCardInFirebase(cardId, updatedCard); // Обновляем Firestore
                    console.log("🟢 Card updated for next review:", updatedCard);
                }
            } else if (direction === "left") {
                // Сбрасываем шаг на 0 и устанавливаем новую дату
                const updatedCard = {
                    stepOfRepetition: 0,
                    nextReview: calculateNextReview(0),
                };
                updateCard(cardId, updatedCard); // Обновляем Zustand
                await updateCardInFirebase(cardId, updatedCard); // Обновляем Firestore
                console.log("🔴 Card reset to first repetition:", updatedCard);
            }
        } catch (error) {
            console.error("Error updating card on swipe:", error);
        }
    };

    const cards = useCardStore((state)=>state.cards)
    const handleSwipeUpdate = (cardId: string, direction: "left" | "right") => {

        console.log(`Card ${cardId} swiped ${direction}`)
        // Here you can update your state or make an API call
        // based on the swipe direction (learning or forgot)
        handleSwipe(cardId,direction)
    }

    return (
        <section className='main-container flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-[3fr_1fr] gap-5'>
            {/*<CardContainer/>*/}
            {/*<SwipeCards/>*/}
            {/*<CardContainer2/>*/}
            <CardSwipe onSwipe={handleSwipe} cards={cards}/>
            <Categories/>
        </section>
    );
};

export default Page;