import React from 'react';
import Categories from "@/components/Categories";
import CardForm from "@/components/CardForm";

const Page = () => {
    return (
        <section className='main-container flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-[3fr_1fr] gap-5'>

            <CardForm/>
            <Categories/>
        </section>
    );
};

export default Page;