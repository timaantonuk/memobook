"use client"

import type React from "react"
import { motion, type MotionValue } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import { RepeatStepper } from "./RepeatStepper"

interface CardProps {
    id: string
    title: string
    description: string
    photoUrl?: string
    category: string
    nextReview: number
    stepOfRepetition: number,
    x: MotionValue<number>
    color: MotionValue<string>
    tickPath: MotionValue<number>
    crossPathA: MotionValue<number>
    crossPathB: MotionValue<number>
}

export const Card: React.FC<CardProps> = ({
                                              title,
                                              description,
                                              photoUrl,
                                              category,
                                              nextReview,
                                              x,
                                              color,
                                              tickPath,
                                              crossPathA,
                                              crossPathB,
                                              stepOfRepetition,
                                          }) => {
    return (
        <motion.div
            className="w-full h-auto bg-[hsl(262.1_83.3%_57.8%)] rounded-[20px] lg:p-5 py-5 px-2 icon-container flex flex-col gap-5"
            style={{ x }}
        >
            <motion.div className="flex gap-5 items-center justify-center relative">
                <h1 className="heading-1">{title}</h1>
                <svg className="progress-icon h-16 w-16" viewBox="0 0 50 50">
                    <motion.path
                        fill="none"
                        strokeWidth="2"
                        stroke={color}
                        d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                        style={{
                            x: 5,
                            y: 5,
                        }}
                    />
                    <motion.path
                        id="tick"
                        fill="none"
                        strokeWidth="2"
                        stroke={color}
                        d="M14,26 L 22,33 L 35,16"
                        strokeDasharray="0 1"
                        style={{ pathLength: tickPath }}
                    />
                    <motion.path
                        fill="none"
                        strokeWidth="2"
                        stroke={color}
                        d="M17,17 L33,33"
                        strokeDasharray="0 1"
                        style={{ pathLength: crossPathA }}
                    />
                    <motion.path
                        id="cross"
                        fill="none"
                        strokeWidth="2"
                        stroke={color}
                        d="M33,17 L17,33"
                        strokeDasharray="0 1"
                        style={{ pathLength: crossPathB }}
                    />
                </svg>
            </motion.div>

            {photoUrl && (
                <img
                    src={photoUrl || "/placeholder.svg"}
                    alt="Card image"
                    loading="lazy"
                    className="pointer-events-none w-full lg:max-h-64 object-cover object-center rounded-2xl bg-no-repeat min-w-full min-h-40 max-h-40 lg:min-h-64"
                />
            )}

            {!photoUrl && <div>No photo</div>}

            <ReactMarkdown className="justify-self-center min-h-56" rehypePlugins={[rehypeHighlight]}>
                {description}
            </ReactMarkdown>
            <Separator />
            <footer className="flex justify-between px-5 text-xs lg:text-lg">
                <RepeatStepper />
                <div>
                    <p>Category: {category}</p>
                    <p className="text-xs text-muted">Will be repeated at {stepOfRepetition} days</p>
                </div>
            </footer>
        </motion.div>
    )
}

