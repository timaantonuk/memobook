import { collection, addDoc, getDocs, where, query, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

export interface Card {
    id: string;
    title: string;
    description: string;
    categoryId: string;
    photoUrl?: string;
    userId: string;
    createdAt: string;
    nextReview: string;
    stepOfRepetition: number;
    status: "learning" | "learned";
}



// ✅ Создаем новую карточку
export async function createCard(cardData: {
    title: string;
    description: string;
    stepOfRepetition: 0,
    categoryId: string;
    photoUrl?: string;
    userId: string;
    status: "learning";
}) {
    try {
        const docRef = await addDoc(collection(db, "cards"), {
            ...cardData,
            createdAt: new Date().toISOString(),
            nextReview: new Date().toISOString(), // Для алгоритма повторения
        });

        return { id: docRef.id, ...cardData };
    } catch (error) {
        console.error("Error creating card:", error);
        throw error;
    }
}

// ✅ Удаляем карточку
export async function deleteCard(cardId: string) {
    try {
        await deleteDoc(doc(db, "cards", cardId));
    } catch (error) {
        console.error("Error deleting card:", error);
    }
}

// ✅ Обновляем карточку
export async function updateCardInFirebase(cardId: string, updates: Partial<Card>) {
    try {
        const cardRef = doc(db, "cards", cardId);

        // 🔥 Фильтруем `undefined`, чтобы Firebase не ругался
        const filteredUpdates = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined)
        );

        if (filteredUpdates.nextReview) {
            filteredUpdates.nextReview = new Date(filteredUpdates.nextReview).toISOString(); // ✅ Делаем ISO-строку
        }

        await updateDoc(cardRef, filteredUpdates);
        console.log("✅ Card updated in Firebase:", filteredUpdates);
    } catch (error) {
        console.error("❌ Error updating card in Firebase:", error);
    }
}


export async function fetchUserCards(userId: string) {
    if (!userId) return [];

    try {
        const q = query(collection(db, "cards"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        console.log("🔥 Загруженные карточки до фильтрации:", querySnapshot.docs.map(doc => doc.data()));

        const today = new Date();
        today.setHours(0, 0, 0, 0); // Обнуляем часы для корректного сравнения

        const filteredCards = querySnapshot.docs
            .map((doc) => {
                const data = doc.data();
                const nextReviewDate = data.nextReview ? new Date(data.nextReview) : null;

                return {
                    id: doc.id,
                    title: data.title || "Untitled",
                    description: data.description || "",
                    category: data.category || "No Category",
                    categoryId: data.categoryId || "",
                    photoUrl: data.photoUrl || "",
                    userId: data.userId || "",
                    createdAt: data.createdAt || new Date().toISOString(),
                    totalRepetitionQuantity: data.totalRepetitionQuantity || 9,
                    stepOfRepetition: data.stepOfRepetition || 0,
                    status: data.status || "learning",
                    nextReview: nextReviewDate, // ✅ Дата `nextReview`
                };
            })
            .filter((card) => {
                if (card.status === "learned") return false; // ✅ Убираем выученные карточки
                if (!card.nextReview) return true; // ✅ Если нет nextReview, оставляем

                // ✅ Исправляем сравнение: сравниваем только ДАТУ
                const nextReviewDate = new Date(card.nextReview);
                nextReviewDate.setHours(0, 0, 0, 0);

                return nextReviewDate.getTime() <= today.getTime();
            });

        console.log("🔥 Загруженные карточки после фильтрации:", filteredCards);

        return filteredCards;
    } catch (error) {
        console.error("❌ Ошибка при загрузке карточек:", error);
        return [];
    }
}