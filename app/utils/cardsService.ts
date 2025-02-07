import {collection, addDoc, getDocs, where, query, doc, deleteDoc, updateDoc} from "firebase/firestore";
import {db} from "@/app/firebaseConfig";
import {format, isBefore} from "date-fns";

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

// ✅ Создание карточки
export async function createCard(cardData: Omit<Card, "id" | "createdAt" | "nextReview">) {
    try {
        const createdAt = new Date().toISOString();
        const nextReview = new Date().toISOString();

        const docRef = await addDoc(collection(db, "cards"), {
            ...cardData,
            createdAt,
            nextReview
        });

        return {id: docRef.id, ...cardData, createdAt, nextReview};
    } catch (error) {
        console.error("❌ Error creating card:", error);
        throw error;
    }
}

// ✅ Удаление карточки
export async function deleteCard(cardId: string) {
    try {
        await deleteDoc(doc(db, "cards", cardId));
    } catch (error) {
        console.error("❌ Error deleting card:", error);
    }
}

// ✅ Обновление карточки
export async function updateCardInFirebase(cardId: string, updates: Partial<Card>) {
    try {
        const cardRef = doc(db, "cards", cardId);

        if (updates.nextReview === undefined) {
            console.error(`❌ Ошибка: nextReview не может быть undefined. Пропускаем обновление для ${cardId}`);
            return; // Не обновляем, если nextReview некорректный
        }

        await updateDoc(cardRef, updates);
        console.log("✅ Card updated in Firebase:", updates);
    } catch (error) {
        console.error("❌ Error updating card in Firebase:", error);
    }
}

// ✅ Получение карточек пользователя с фильтрацией
export async function fetchUserCards(userId: string) {
    if (!userId) return [];

    try {
        const q = query(collection(db, "cards"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        console.log("🔥 Загруженные карточки до фильтрации:", querySnapshot.docs.map(doc => doc.data()));

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredCards = querySnapshot.docs
            .map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    nextReview: data.nextReview ? new Date(data.nextReview) : null,
                };
            })
            .filter((card) => {
                console.log(`🔍 Проверяем карточку ${card.id}:`, {
                    nextReview: card.nextReview,
                    nextReviewTimestamp: card.nextReview ? card.nextReview.getTime() : "null",
                    todayTimestamp: today.getTime()
                });

                if (card.status === "learned") return false; // ✅ Убираем выученные карточки
                if (!card.nextReview) return true; // ✅ Если нет nextReview, оставляем

                // ✅ Загружаем, если nextReview сегодня (сравниваем ТОЛЬКО дату, без времени)
                const nextReviewDate = new Date(card.nextReview);
                nextReviewDate.setHours(0, 0, 0, 0);

                return nextReviewDate.getTime() <= today.getTime();
            });

        console.log("🔥 Загруженные карточки после фильтрации:", filteredCards);
        return filteredCards;
    } catch (error) {
        console.error("❌ Error fetching user cards:", error);
        return [];
    }
}