import {collection, addDoc, getDocs, where, query, doc, deleteDoc, setDoc} from "firebase/firestore";
import { db } from "@/app/firebaseConfig";

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
export async function createCategory(categoryData: {
    name: string;
    userId: string;
}) {
    try {
        // Создаем уникальный ID для категории
        const categoryId = crypto.randomUUID();

        // Сохраняем категорию в Firestore
        const categoryDoc = doc(db, "categories", categoryId);
        await setDoc(categoryDoc, {
            ...categoryData,
            categoryId, // Добавляем categoryId
        });

        return { id: categoryId, ...categoryData };
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
}

// ✅ Удалить категорию и её карточки
export const deleteCategoryAndCards = async (categoryId: string, userId: string) => {
    try {
        // Удаляем все карточки с categoryId
        const cardsRef = collection(db, "cards");
        const q = query(cardsRef, where("categoryId", "==", categoryId), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
        await Promise.all(deletePromises);

        const categoryDoc = doc(db, "categories", categoryId);
        await deleteDoc(categoryDoc);

        console.log(`✅ Category ${categoryId} and related cards deleted.`);
    } catch (error) {
        console.error("❌ Error deleting category and cards:", error);
    }
};