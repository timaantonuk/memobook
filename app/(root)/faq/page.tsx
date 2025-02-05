import React from 'react';
import FaqAccordion from "@/components/FaqAccordion";

const Page = () => {
    return (
        <section className='main-container flex flex-col items-center'>
            <div className='flex flex-col gap-5 items-center w-[75%] mt-5'>
                <FaqAccordion/>
                <FaqAccordion/>
                <FaqAccordion/>
                <FaqAccordion/>
                <FaqAccordion/>
            </div>

            <footer className='absolute bottom-0 left-1/2 -translate-x-1/2 pb-10 mt-10'>
                <p>If you find any bugs, have questions or propositions feel free contact me by email:</p>
                <a href="mailto:tima.antonuk2@gmail.com">Email: tima.antonuk2@gmail.com</a>
                <p className='text-muted'>Memobook, All rights reserved.</p>
            </footer>
        </section>
    );
};

export default Page;