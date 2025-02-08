import { collection, addDoc, getDocs, where, query, doc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "@/app/firebaseConfig"

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

// Validation helper
const validateCard = (card: Partial<Card>): boolean => {
    if (!card.title || !card.categoryId || !card.userId) {
        console.error("Invalid card data:", card)
        return false
    }
    return true
}

export async function createCard(cardData: Omit<Card, "id" | "createdAt" | "nextReview">) {
    try {
        if (!validateCard(cardData)) {
            throw new Error("Invalid card data")
        }

        const createdAt = new Date().toISOString()
        const nextReview = new Date().toISOString()

        const docRef = await addDoc(collection(db, "cards"), {
            ...cardData,
            createdAt,
            nextReview,
            stepOfRepetition: 0,
            status: "learning" as const,
        })

        return { id: docRef.id, ...cardData, createdAt, nextReview }
    } catch (error) {
        console.error("❌ Error creating card:", error)
        throw error
    }
}

export async function updateCardInFirebase(cardId: string, updates: Partial<Card>) {
    try {
        if (!cardId) {
            throw new Error("Card ID is required")
        }

        const cardRef = doc(db, "cards", cardId)

        // Ensure nextReview is valid
        if (updates.nextReview) {
            const nextReviewDate = new Date(updates.nextReview)
            if (isNaN(nextReviewDate.getTime())) {
                throw new Error("Invalid nextReview date")
            }
        }

        await updateDoc(cardRef, updates)
        console.log("✅ Card updated in Firebase:", updates)
    } catch (error) {
        console.error("❌ Error updating card in Firebase:", error)
        throw error
    }
}

export async function fetchUserCards(userId: string) {
    if (!userId) return []

    try {
        const q = query(collection(db, "cards"), where("userId", "==", userId))
        const querySnapshot = await getDocs(q)

        const cards = querySnapshot.docs.map((doc) => {
            const data = doc.data()

            // Validate and sanitize data
            return {
                id: doc.id,
                title: data.title || "Untitled",
                description: data.description || "",
                categoryId: data.categoryId || "",
                photoUrl: data.photoUrl || "",
                userId: data.userId || "",
                createdAt: data.createdAt || new Date().toISOString(),
                stepOfRepetition: Number(data.stepOfRepetition) || 0,
                status: data.status === "learned" ? "learned" : "learning",
                nextReview: data.nextReview || new Date().toISOString(),
            }
        })

        // Sort cards by next review date
        return cards.sort((a, b) => new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime())
    } catch (error) {
        console.error("❌ Error loading cards:", error)
        return []
    }
}

export async function deleteCard(cardId: string) {
    try {
        if (!cardId) {
            throw new Error("Card ID is required")
        }
        await deleteDoc(doc(db, "cards", cardId))
    } catch (error) {
        console.error("❌ Error deleting card:", error)
        throw error
    }
}

