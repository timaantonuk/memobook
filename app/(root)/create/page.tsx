'use client'
import React from 'react';
import Categories from "@/components/Categories";
import CardForm from "@/components/CardForm";
import {useUserStore} from "@/app/store/user-store";
import {useCardStore} from "@/app/store/card-store";
import {useStatisticsStore} from "@/app/store/statistic-store";

const Page = () => {
    const userState = useUserStore((state)=>state)
    const cardState = useCardStore((state)=>state)
    const statisticState = useStatisticsStore((state)=>state)

    return (
        <section className='main-container flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-[2fr_1fr] gap-5'>
            <CardForm/>
            <Categories/>
        </section>
    );
};

export default Page;