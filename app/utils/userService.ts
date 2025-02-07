import { db } from '../firebaseConfig'
import { doc, getDoc, setDoc } from "firebase/firestore";

// 📌 Получение пользователя из Firestore
export const fetchUserFromDB = async (userId: string) => {
    if (!userId) return null;
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    return userSnap.exists() ? userSnap.data() : null;
};

// 📌 Сохранение нового пользователя в Firestore
export const saveUserToDB = async (user: any) => {
    if (!user || !user.id) return;
    const userRef = doc(db, "users", user.id);
    await setDoc(userRef, user);
};