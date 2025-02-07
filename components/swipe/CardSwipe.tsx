"use client"

import type React from "react"
import { useState } from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { Card } from "./Card"
import {Redo, Undo} from "lucide-react";

interface CardData {
    id: string
    title: string
    description: string
    photoUrl?: string
    category: string
    nextReview: number
}

interface CardSwipeProps {
    cards: CardData[]
    onSwipe: (cardId: string, direction: "left" | "right") => void
}

export const CardSwipe: React.FC<CardSwipeProps> = ({ cards, onSwipe }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const x = useMotionValue(0)
    const xInput = [-100, 0, 100]
    const rotate = useTransform(x, [-200, 200], [-30, 30])
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
    const animControls = useAnimation()

    const background = useTransform(x, xInput, [
        "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
        "linear-gradient(180deg, #7700ff 0%, rgb(26, 0, 96) 100%)",
        "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
    ])
    const color = useTransform(x, xInput, ["rgb(211, 9, 225)", "rgb(68, 0, 255)", "rgb(3, 209, 0)"])
    const tickPath = useTransform(x, [10, 100], [0, 1])
    const crossPathA = useTransform(x, [-10, -55], [0, 1])
    const crossPathB = useTransform(x, [-50, -100], [0, 1])

    const handleDragEnd = async (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
    ) => {
        const swipe = info.offset.x
        if (Math.abs(swipe) > 100) {
            const direction = swipe > 0 ? "right" : "left"
            await animControls.start({ x: swipe > 0 ? 200 : -200, opacity: 0 })
            onSwipe(cards[currentIndex].id, direction)
            setCurrentIndex((prevIndex) => prevIndex + 1)
            if (currentIndex < cards.length - 1) {
                animControls.set({ x: 0, opacity: 1 })
            }
        } else {
            animControls.start({ x: 0, opacity: 1 })
        }
    }

    if (cards.length === 0 || currentIndex >= cards.length) {
        return (
            <div className="flex items-center justify-center h-screen rounded-3xl " style={{background: 'linear-gradient(180deg, #7700ff 0%, rgb(26, 0, 96) 100%)'}}>
                <div className="text-center text-5xl p-8">No more cards!</div>
            </div>
        )
    }

    return (
        <div className="relative w-full h-screen rounded-3xl flex items-center justify-center overflow-hidden">


            <motion.div className="absolute inset-0" style={{background}}/>

            <div className="memory-card"></div>
            <div className="absolute top-10 left-[42%]  pb-4 flex gap-5 fading-text">
                <Undo/> <span>Swipe card</span> <Redo/>
            </div>

            <motion.div
                className="absolute flex w-[45rem] justify-center "
                style={{x, rotate, opacity}}
                drag="x"
                dragConstraints={{left: 0, right: 0}}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                animate={animControls}
            >

                {cards.length === 0 || currentIndex >= cards.length ? <div>No more cards</div> :   <Card
                    {...cards[currentIndex]}
                    x={x}
                    color={color}
                    tickPath={tickPath}
                    crossPathA={crossPathA}
                    crossPathB={crossPathB}
                />}


            </motion.div>
        </div>
    )
}

