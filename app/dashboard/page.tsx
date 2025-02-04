import React from 'react';
import {GoalSetter} from "@/components/GoalSetter";
import LineChartStat from "@/components/LineChartStat";
import LearningStats from "@/components/LearningStats";
import StreakAleart from "@/components/StreakAlert";

const Page = () => {
    return (
        <section className='main-container flex flex-col-reverse px-5 lg:grid gap-5  lg:grid-cols-2 pb-20 lg:pb-5'>
            <GoalSetter/>
            <LineChartStat/>
            <LearningStats/>
            <StreakAleart/>
        </section>
    );
};

export default Page;