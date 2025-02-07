"use client"

import type React from "react"
import { motion, type MotionValue } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import StepperOfRepetition from "@/components/RepeatStepper"
import {format} from "date-fns";

interface CardProps {
    id: string
    title: string
    description: string
    photoUrl?: string
    category: string // ✅ Теперь передаётся имя категории
    nextReview: string
    stepOfRepetition: number
    x: MotionValue<number>
}

export const Card: React.FC<CardProps> = ({
                                              title,
                                              description,
                                              photoUrl,
                                              category,
                                              nextReview,
                                              x,
                                              stepOfRepetition,
                                          }) => {

    const getDaysUntilNextReview = (nextReview: string | null) => {
        if (!nextReview) return "Never"; // Если повтор не запланирован

        const nextDate = new Date(nextReview);
        return format(nextDate, "dd MMMM yyyy"); // Форматируем дату в виде "24 April 2025"
    };

    return (
        <motion.div
            className="w-full h-auto bg-[hsl(262.1_83.3%_57.8%)] rounded-[20px] lg:p-5 py-5 px-2 flex flex-col gap-5"
            style={{ x }}
        >
            <motion.div className="flex gap-5 items-center justify-center relative">
                <h1 className="heading-1">{title}</h1>
            </motion.div>

            {photoUrl && (
                <img
                    src={photoUrl}
                    alt="Card image"
                    loading="lazy"
                    className="w-full lg:max-h-64 object-cover object-center rounded-2xl"
                />
            )}

            <ReactMarkdown className="min-h-56" rehypePlugins={[rehypeHighlight]}>
                {description}
            </ReactMarkdown>
            <Separator />
            <footer className="flex justify-between px-5 text-xs lg:text-lg">
                <StepperOfRepetition step={stepOfRepetition} />
                <div>
                    <p>Category: {category}</p> {/* ✅ Теперь отображает имя категории */}
                    <p className="text-xs text-muted">Will be repeated on {getDaysUntilNextReview(nextReview)}</p>
                </div>
            </footer>
        </motion.div>
    )
}