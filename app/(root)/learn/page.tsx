"use client"
import { motion } from "framer-motion"
import Categories from "@/components/Categories"
import { CardSwipe } from "@/components/swipe/CardSwipe"
import { useCardStore } from "@/app/store/card-store"
import { useUserStore } from "@/app/store/user-store"
import { fetchUserCards, updateCardInFirebase } from "@/app/utils/cardsService"

const Page = () => {
    const userId = useUserStore((state) => state.id)
    const updateCard = useCardStore((state) => state.updateCard)
    const removeCard = useCardStore((state) => state.removeCard)
    const setCards = useCardStore((state) => state.setCards)
    const cards = useCardStore((state) => state.cards)

    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: -100,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.75,
            },
        },
    }

    const calculateNextReview = (step: number): string => {
        const intervals = [1, 2, 4, 7, 15, 30]
        const maxStep = intervals.length - 1

        if (step > maxStep) {
            console.warn(`🎓 Card fully learned! step=${step}`)
            return new Date().toISOString()
        }

        const interval = intervals[Math.min(step, maxStep)]
        const nextDate = new Date()
        nextDate.setDate(nextDate.getDate() + interval)

        return nextDate.toISOString()
    }

    const handleSwipe = async (cardId: string, direction: "left" | "right") => {
        const card = cards.find((c) => c.id === cardId)
        if (!card) return

        const updatedCard = { ...card }

        if (direction === "right") {
            if (card.stepOfRepetition >= 9) {
                updatedCard.status = "learned"
                removeCard(cardId)
            } else {
                updatedCard.stepOfRepetition += 1
                updatedCard.nextReview = calculateNextReview(updatedCard.stepOfRepetition)
                updateCard(cardId, updatedCard)
            }
        } else if (direction === "left") {
            updatedCard.stepOfRepetition = 0
            updatedCard.nextReview = calculateNextReview(0)
            updateCard(cardId, updatedCard)
        }

        // Update UI immediately
        setCards((prevCards) => prevCards.map((c) => (c.id === cardId ? updatedCard : c)))

        // Sync with Firestore
        await updateCardInFirebase(cardId, updatedCard)

        // Load updated cards
        const updatedCards = await fetchUserCards(userId)
        setCards(updatedCards)
    }

    const handleSwipeUpdate = (cardId: string, direction: "left" | "right") => {
        console.log(`Card ${cardId} swiped ${direction}`)
        handleSwipe(cardId, direction)
    }

    return (
        <motion.section
            className="main-container flex flex-col items-center lg:items-stretch lg:grid lg:grid-cols-[3fr_1fr] gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <CardSwipe onSwipe={handleSwipeUpdate} cards={cards} />
            </motion.div>
            <motion.div variants={itemVariants}>
                <Categories />
            </motion.div>
        </motion.section>
    )
}

export default Page

