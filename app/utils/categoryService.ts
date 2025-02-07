import { collection, addDoc, getDocs, where, query, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import { fetchUserCards, deleteCard } from "./cardsService";

// ✅ Получить категории пользователя
export async function fetchUserCategories(userId: string) {
    if (!userId) return [];
    try {
        const q = query(collection(db, "categories"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
}

// ✅ Создать категорию
export async function createCategory(categoryData) {
    try {
        const docRef = await addDoc(collection(db, "categories"), categoryData);
        return { id: docRef.id, ...categoryData };
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
}

// ✅ Удалить категорию и её карточки
export async function deleteCategoryAndCards(categoryId: string, userId: string) {
    try {
        // Удаляем карточки, связанные с категорией
        const cardsCollection = collection(db, "cards");
        const cardsQuery = query(
            cardsCollection,
            where("category", "==", categoryId),
            where("userId", "==", userId) // Убедимся, что удаляем только карточки текущего пользователя
        );

        const cardsSnapshot = await getDocs(cardsQuery);
        const batchDeletes = cardsSnapshot.docs.map(async (docSnapshot) => {
            await deleteDoc(doc(db, "cards", docSnapshot.id));
            console.log(`Deleted card: ${docSnapshot.id}`);
        });

        await Promise.all(batchDeletes);

        // Удаляем категорию из Firestore
        const categoryDoc = doc(db, "categories", categoryId);
        await deleteDoc(categoryDoc);
        console.log(`Deleted category: ${categoryId}`);
    } catch (error) {
        console.error("Error deleting category and related cards:", error);
        throw error;
    }
}