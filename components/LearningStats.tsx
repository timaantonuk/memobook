import React from 'react';
import CardWrapper from "@/components/CardWrapper";
import BadgeWrapper from "@/components/BadgeWrapper";

const LearningStats = () => {
    return (
        <CardWrapper width='w-auto'>
            <div className='flex flex-col items-center gap-2 my-5'>
                <BadgeWrapper variant='default'>
                    <h2 className='text-3xl lg:text-5xl font-bold'>Learned Cards: 55</h2>
                </BadgeWrapper>
            </div>
        </CardWrapper>
    );
};

export default LearningStats;