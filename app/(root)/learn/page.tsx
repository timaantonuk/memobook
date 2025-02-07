'use client'
import React from 'react';
import Categories from "@/components/Categories";
import {CardSwipe} from "@/components/swipe/CardSwipe";
import {useCardStore} from "@/app/store/card-store";

const Page = () => {

    const cards = useCardStore((state)=>state.cards)
    const handleSwipe = (cardId: string, direction: "left" | "right") => {
        console.log(`Card ${cardId} swiped ${direction}`)
        // Here you can update your state or make an API call
        // based on the swipe direction (learning or forgot)
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