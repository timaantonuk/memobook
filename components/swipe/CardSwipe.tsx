"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { Card } from "./Card"
import { Redo, Undo } from "lucide-react"
import { useCategoryStore } from "@/app/store/categories-store" // ✅ Получаем категории

interface CardData {
    id: string
    title: string
    description: string
    photoUrl?: string
    categoryId: string // ✅ Изменено на `categoryId`
    nextReview: string
    stepOfRepetition: number
}

interface CardSwipeProps {
    cards: CardData[]
    onSwipe: (cardId: string, direction: "left" | "right") => void
}

export const CardSwipe: React.FC<CardSwipeProps> = ({ cards, onSwipe }) => {
    const categories = useCategoryStore((state) => state.categories) // ✅ Получаем категории
    const [currentIndex, setCurrentIndex] = useState(0)

    // 🔥 Фильтруем карточки, которые нужно учить сегодня
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const cardsToReview = useMemo(() => {
        return cards.filter((card) => {
            if (!card.nextReview) return false
            const nextReviewDate = new Date(card.nextReview)
            nextReviewDate.setHours(0, 0, 0, 0)
            return nextReviewDate.getTime() <= today.getTime()
        })
    }, [cards])

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

        if (Math.abs(swipe) > 100 && currentIndex < cardsToReview.length) {
            const direction = swipe > 0 ? "right" : "left"
            await animControls.start({ x: swipe > 0 ? 200 : -200, opacity: 0 })
            onSwipe(cardsToReview[currentIndex].id, direction)
            setCurrentIndex((prevIndex) => prevIndex + 1)
            if (currentIndex < cardsToReview.length - 1) {
                animControls.set({ x: 0, opacity: 1 })
            }
        } else {
            animControls.start({ x: 0, opacity: 1 })
        }
    }

    // ✅ Если карточек нет, показываем сообщение 🎉
    if (cardsToReview.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen rounded-3xl" style={{ background: 'linear-gradient(180deg, #7700ff 0%, rgb(26, 0, 96) 100%)' }}>
                <div className="text-center text-5xl p-8">🎉 No cards to review today!</div>
            </div>
        )
    }

    return (
        <div className="relative w-full h-screen rounded-3xl flex items-center justify-center overflow-hidden">
            <motion.div className="absolute inset-0" style={{ background }} />

            <div className="memory-card"></div>
            <div className="absolute top-10 left-[42%] pb-4 flex gap-5 fading-text">
                <Undo /> <span>Swipe card</span> <Redo />
            </div>

            <motion.div
                className="absolute flex w-[45rem] justify-center"
                style={{ x, rotate, opacity }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                animate={animControls}
            >
                {currentIndex >= cardsToReview.length ? (
                    <div>No more cards</div>
                ) : (
                    <Card
                        {...cardsToReview[currentIndex]}
                        category={categories.find((c) => c.id === cardsToReview[currentIndex].categoryId)?.name || "Unknown"} // ✅ Теперь передаём имя категории
                        x={x}
                        color={color}
                        tickPath={tickPath}
                        crossPathA={crossPathA}
                        crossPathB={crossPathB}
                    />
                )}
            </motion.div>
        </div>
    )
}