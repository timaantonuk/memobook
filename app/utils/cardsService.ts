import { collection, addDoc, getDocs, where, query, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

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