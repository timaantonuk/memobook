"use client";

import React from "react";
import { motion, MotionValue } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import StepperOfRepetition from "@/components/RepeatStepper";
import { format } from "date-fns";

interface CardProps {
    id: string;
    title: string;
    description: string;
    photoUrl?: string;
    category: string;
    nextReview: string;
    stepOfRepetition: number;
    x: MotionValue<number>;
}

export const Card: React.FC<CardProps> = ({
                                              title,
                                              description,
                                              photoUrl,
                                              category,
                                              nextReview,
                                              stepOfRepetition,
                                              x,
                                          }) => {
    const formatDate = (date: string) => format(new Date(date), "dd MMMM yyyy");

    return (
        <motion.div className="w-full h-auto bg-purple-500 rounded-[20px] lg:p-5 py-5 px-2 flex flex-col gap-5" style={{ x }}>
            <motion.div className="flex gap-5 items-center justify-center relative">
                <h1 className="heading-1">{title}</h1>
            </motion.div>

            {photoUrl && <img src={photoUrl} alt="Card image" className="w-full lg:max-h-64 object-cover object-center rounded-2xl" />}

            <p>{description}</p>
            <Separator />
            <footer className="flex justify-between px-5 text-xs lg:text-lg">
                <StepperOfRepetition step={stepOfRepetition} />
                <div>
                    <p>Category: {category}</p>
                    <p>Will be repeated on {formatDate(nextReview)}</p>
                </div>
            </footer>
        </motion.div>
    );
};