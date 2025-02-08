"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import StepperOfRepetition from "@/components/RepeatStepper"
import { format, isValid, parseISO } from "date-fns"
import type { CardProps } from "@/types/card"
import type React from "react" // Added import for React

export const Card: React.FC<CardProps> = ({
                                              title,
                                              description,
                                              photoUrl,
                                              category,
                                              nextReview,
                                              stepOfRepetition,
                                              x,
                                          }) => {
    const [formattedDate, setFormattedDate] = useState<string>("Date not available")

    useEffect(() => {
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

        setFormattedDate(formatDate(nextReview))
    }, [nextReview])

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
                <h1 className="heading-1 text-center">{title || "Untitled Card"}</h1>
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
                className="whitespace-pre-wrap text-sm lg:text-base"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                layout
            >
                {description || "No description provided"}
            </motion.p>

            <Separator />

            <motion.footer
                className="flex justify-between px-5 text-xs lg:text-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                layout
            >
                <StepperOfRepetition step={stepOfRepetition} />
                <div>
                    <p className="text-xs opacity-80">Category: {category || "Uncategorized"}</p>
                    <p className="text-xs opacity-80">Next review: {formattedDate}</p>
                </div>
            </motion.footer>
        </motion.div>
    )
}

