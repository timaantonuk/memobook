"use client"

import { useEffect, useMemo, useState, useCallback, useRef } from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { Card } from "./Card"
import { Redo, Undo, Loader2 } from "lucide-react"
import { useCardStore } from "@/app/store/card-store"
import { useCategoryStore } from "@/app/store/categories-store"
import { updateCardInFirebase, fetchUserCards } from "@/app/utils/cardsService"
import { useUserStore } from "@/app/store/user-store"
import type { CardSwipeProps } from "@/types/card"
import type { Card as CardType } from "@/types/card"

export const CardSwipe: React.FC<CardSwipeProps> = ({ onSwipe }) => {
    const [hasMounted, setHasMounted] = useState(false)
    const { removeCard, filteredCards, updateCard, setCards } = useCardStore()
    const { categories, selectedCategoryId } = useCategoryStore()
    const userId = useUserStore((state) => state.id)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [hasMoreCards, setHasMoreCards] = useState(true)
    const refreshTimeoutRef = useRef<NodeJS.Timeout>()
    const cardsToReviewRef = useRef<CardType[]>([])

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

    useEffect(() => {
        setHasMounted(true)
    }, [])

    const refreshCards = useCallback(async () => {
        if (!userId) return

        if (refreshTimeoutRef.current) {
            clearTimeout(refreshTimeoutRef.current)
        }

        refreshTimeoutRef.current = setTimeout(async () => {
            try {
                setIsLoading(true)
                const updatedCards = await fetchUserCards(userId)
                setCards(updatedCards)
                setCurrentIndex(0)
                setHasMoreCards(true)
            } catch (err) {
                console.error("Error refreshing cards:", err)
            } finally {
                setIsLoading(false)
            }
        }, 300)
    }, [userId, setCards])

    const cardsToReview = useMemo(() => {
        if (!hasMounted) return []

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        const filteredAndSortedCards = filteredCards
            .filter((card) => {
                if (!card || !card.id || !card.title) {
                    console.warn("Invalid card data detected:", card)
                    return false
                }
                if (!card.nextReview || card.status === "learned") return false
                try {
                    const nextReviewDate = new Date(card.nextReview)
                    if (isNaN(nextReviewDate.getTime())) {
                        console.warn("Invalid date detected:", card.nextReview)
                        return false
                    }
                    nextReviewDate.setHours(0, 0, 0, 0)
                    return nextReviewDate.getTime() <= today.getTime()
                } catch (e) {
                    console.error("Date parsing error:", e)
                    return false
                }
            })
            .sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime())

        cardsToReviewRef.current = filteredAndSortedCards
        setHasMoreCards(filteredAndSortedCards.length > 0)
        return filteredAndSortedCards
    }, [filteredCards, hasMounted])

    useEffect(() => {
        const initializeCards = async () => {
            setIsLoading(true)
            try {
                await refreshCards()
                setCurrentIndex(0)
                await animControls.set({ x: 0, opacity: 1 })
                x.set(0)
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred")
            } finally {
                setIsLoading(false)
            }
        }
        if (hasMounted) {
            initializeCards()
        }
    }, [refreshCards, animControls, x, hasMounted])

    useEffect(() => {
        if (!isLoading && cardsToReview.length === 0 && hasMoreCards) {
            refreshCards()
        }
    }, [cardsToReview.length, refreshCards, isLoading, hasMoreCards])

    const handleDragEnd = async (
        event: MouseEvent | TouchEvent | PointerEvent,
        info: { offset: { x: number; y: number }; velocity: { x: number; y: number } },
    ) => {
        if (isAnimating || !cardsToReviewRef.current[currentIndex]) return

        try {
            setIsAnimating(true)
            const swipe = info.offset.x
            const swipeThreshold = 100

            if (Math.abs(swipe) > swipeThreshold && currentIndex < cardsToReviewRef.current.length) {
                const direction = swipe > 0 ? "right" : "left"
                const moveDistance = swipe > 0 ? 1000 : -1000

                const currentCard = cardsToReviewRef.current[currentIndex]
                if (!currentCard) {
                    throw new Error("Current card not found")
                }

                await animControls.start({
                    x: moveDistance,
                    opacity: 0,
                    transition: { duration: 0.3 },
                })

                const updatedCard = { ...currentCard }
                if (direction === "right") {
                    updatedCard.stepOfRepetition += 1
                    if (updatedCard.stepOfRepetition >= 5) {
                        updatedCard.status = "learned"
                    }
                } else {
                    updatedCard.stepOfRepetition = 0
                }

                const nextReviewDate = new Date()
                nextReviewDate.setDate(nextReviewDate.getDate() + Math.pow(2, updatedCard.stepOfRepetition))
                updatedCard.nextReview = nextReviewDate.toISOString()

                updateCard(currentCard.id, updatedCard)
                await updateCardInFirebase(currentCard.id, updatedCard)

                if (onSwipe) {
                    onSwipe(currentCard.id, direction)
                }

                const isLastCard = currentIndex === cardsToReviewRef.current.length - 1
                if (isLastCard) {
                    await refreshCards()
                } else {
                    setCurrentIndex((prev) => prev + 1)
                }

                await animControls.set({ x: 0, opacity: 0 })
                await animControls.start({
                    opacity: 1,
                    transition: { duration: 0.3 },
                })
            } else {
                await animControls.start({
                    x: 0,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                })
            }
        } catch (err) {
            console.error("Error during card swipe:", err)
            setError(err instanceof Error ? err.message : "An error occurred during swipe")
        } finally {
            setIsAnimating(false)
        }
    }

    if (!hasMounted) {
        return null
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-full rounded-3xl bg-gradient-to-b from-purple-600 to-purple-900">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen w-full rounded-3xl bg-gradient-to-b from-red-600 to-red-900">
                <div className="text-center p-8">
                    <p className="text-2xl mb-4">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        )
    }

    if (!isLoading && (!cardsToReviewRef.current || cardsToReviewRef.current.length === 0)) {
        return (
            <div className="flex items-center justify-center h-screen w-full rounded-3xl bg-gradient-to-b from-purple-600 to-purple-900">
                <div className="text-center text-2xl lg:text-5xl p-8">🎉 No cards to review today!</div>
            </div>
        )
    }

    const currentCard = cardsToReviewRef.current[currentIndex]

    if (!currentCard && !isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-full rounded-3xl bg-gradient-to-b from-purple-600 to-purple-900">
                <div className="text-center text-5xl p-8">
                    {hasMoreCards ? "Loading more cards..." : "All cards reviewed! 🎉"}
                </div>
            </div>
        )
    }

    return (
        <div
            className="relative w-full h-screen rounded-3xl laptop:pt-20 flex items-center justify-center overflow-hidden">
            <motion.div className="absolute inset-0" style={{background}}/>
            <div className="memory-card"></div>

            <div className="absolute top-10 left-1/2 -translate-x-1/2 pb-4 fading-text">
                <div className="animate-fading flex gap-5 justify-center">
                    <Undo/> <span>Swipe card</span> <Redo/>
                </div>
            </div>

            <motion.div
                className="absolute flex w-full max-w-[45rem] justify-center px-4"
                style={{x, rotate, opacity}}
                drag="x"
                dragConstraints={{left: -1000, right: 1000}}
                dragElastic={0.7}
                onDragEnd={handleDragEnd}
                animate={animControls}
                initial={{x: 0, opacity: 1}}
            >
                <Card
                    {...currentCard}
                    category={categories.find((c) => c.id === currentCard.categoryId)?.name || "Uncategorized"}
                    x={x}
                />
            </motion.div>
        </div>
    )
}

