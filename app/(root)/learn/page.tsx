import React from 'react';
import Categories from "@/components/Categories";
import CardContainer from "@/components/CardContainer";

const Page = () => {
    return (
        <section className='main-container flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-[3fr_1fr] gap-5'>
            <CardContainer/>
            <Categories/>
        </section>
    );
};

export default Page;