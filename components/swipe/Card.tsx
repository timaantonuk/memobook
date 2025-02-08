"use client"

import type React from "react"
import { motion, type MotionValue } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import StepperOfRepetition from "@/components/RepeatStepper"
import { format, isValid, parseISO } from "date-fns"

interface CardProps {
    id: string
    title: string
    description: string
    photoUrl?: string
    category: string
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
                                              stepOfRepetition,
                                              x,
                                          }) => {
    const formatDate = (dateStr: string) => {
        try {
            const date = parseISO(dateStr)
            if (!isValid(date)) {
                console.warn("Invalid date detected:", dateStr)
                return "Date not available"
            }
            return format(date, "dd MMMM yyyy")
        } catch (e) {
            console.error("Date formatting error:", e)
            return "Date not available"
        }
    }

    return (
        <motion.div
            className="w-full h-auto bg-purple-500 rounded-[20px] lg:p-5 py-5 px-2 flex flex-col gap-5"
            style={{ x }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            layout
        >
            <motion.div
                className="flex gap-5 items-center justify-center relative"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                layout
            >
                <h1 className="heading-1">{title || "Untitled Card"}</h1>
            </motion.div>

            {photoUrl && (
                <motion.img
                    src={photoUrl}
                    alt={`Card image for ${title}`}
                    className="w-full lg:max-h-64 object-cover object-center rounded-2xl"
                    onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                        e.currentTarget.alt = "Failed to load image"
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    layout
                />
            )}

            <motion.p
                className="whitespace-pre-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                layout
            >
                {description || "No description provided"}
            </motion.p>

            <Separator />

            <motion.footer
                className="flex justify-between px-5 text-xs lg:text-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                layout
            >
                <StepperOfRepetition step={stepOfRepetition} />
                <div>
                    <p>Category: {category || "Uncategorized"}</p>
                    <p className="text-sm text-muted-foreground">Next review: {formatDate(nextReview)}</p>
                </div>
            </motion.footer>
        </motion.div>
    )
}

