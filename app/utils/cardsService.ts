import {collection, addDoc, getDocs, where, query, doc, deleteDoc, updateDoc} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

export interface Card {
    id: string; // Уникальный идентификатор карточки
    title: string; // Заголовок карточки
    description: string; // Описание карточки
    categoryId: string; // ID категории, к которой принадлежит карточка
    photoUrl?: string; // Ссылка на изображение карточки
    userId: string; // ID пользователя, которому принадлежит карточка
    createdAt: string; // Дата создания карточки
    nextReview: string; // Дата следующего повторения
    stepOfRepetition: number; // Текущий шаг алгоритма Spaced Repetition
    status: "learning" | "learned"; // Статус карточки
}

export async function fetchUserCards(userId: string) {
    if (!userId) return [];

    try {
        const q = query(collection(db, "cards"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            // 🛠 Если данные возвращаются в неправильном формате, можно добавлять проверки
            categoryId: doc.data().categoryId || null,
        }));
    } catch (error) {
        console.error("Error fetching user cards:", error);
        return [];
    }
}

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

export async function deleteCard(cardId: string) {
    try {
        await deleteDoc(doc(db, "cards", cardId));
    } catch (error) {
        console.error("Error deleting card:", error);
    }
}

export async function updateCardInFirebase(cardId: string, updates: Partial<Card>) {
    try {
        const cardRef = doc(db, "cards", cardId);
        await updateDoc(cardRef, updates);
        console.log("Card updated in Firebase:", updates);
    } catch (error) {
        console.error("Error updating card in Firebase:", error);
    }
}