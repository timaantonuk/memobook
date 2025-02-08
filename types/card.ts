import type { MotionValue } from "framer-motion"

export interface Card {
    id: string
    title: string
    description: string
    categoryId: string
    photoUrl?: string
    userId: string
    createdAt: string
    nextReview: string
    stepOfRepetition: number
    status: "learning" | "learned"
}

export interface CardProps extends Card {
    category: string
    x: MotionValue<number>
}

export interface CardSwipeProps {
    onSwipe?: (cardId: string, direction: "left" | "right") => void
    cards?: Card[]
}

