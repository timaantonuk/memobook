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
        }));
    } catch (error) {
        console.error("Error fetching user cards:", error);
        return [];
    }
}

export async function createCard(cardData) {
    try {
        const docRef = await addDoc(collection(db, "cards"), cardData);
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