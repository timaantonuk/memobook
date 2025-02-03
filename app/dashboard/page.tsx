import React from 'react';
import {GoalSetter} from "@/components/GoalSetter";
import LineChartStat from "@/components/LineChartStat";
import LearningStats from "@/components/LearningStats";

const Page = () => {
    return (
        <section className='main-container grid gap-5 grid-cols-2'>
            <GoalSetter/>
            <LineChartStat/>
            <LearningStats/>
        </section>
    );
};

export default Page;