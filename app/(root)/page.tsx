'use client'

import {useUserStore} from "@/app/store/user-store";
import {useInitialUser} from "@/hooks/use-initial-user";
import {useInitialCards} from "@/hooks/use-initial-cards";
import {useInitialCategories} from "@/hooks/use-initial-categories";

// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { db } from "@/app/firebaseConfig";

export default function Home() {


const userState = useUserStore((state)=>state)
    console.log(userState)

    useInitialUser();
    useInitialCards();
    useInitialCategories();


//     async function clearFirestoreCollections() {
//         try {
//             // Очистка коллекции `cards`
//             const cardsCollection = collection(db, "cards");
//             const cardsSnapshot = await getDocs(cardsCollection);
//             cardsSnapshot.forEach(async (card) => {
//                 await deleteDoc(doc(db, "cards", card.id));
//                 console.log(`Deleted card: ${card.id}`);
//             });
//
//             // Очистка коллекции `categories`
//             const categoriesCollection = collection(db, "categories");
//             const categoriesSnapshot = await getDocs(categoriesCollection);
//             categoriesSnapshot.forEach(async (category) => {
//                 await deleteDoc(doc(db, "categories", category.id));
//                 console.log(`Deleted category: ${category.id}`);
//             });
//
//             console.log("Firestore cleaned successfully!");
//         } catch (error) {
//             console.error("Error clearing Firestore:", error);
//         }
//     }
//
// // Вызвать функцию
//     clearFirestoreCollections();

    return (
        <div className='pl-56'>
            <p>
                lol
            </p>
        </div>
    );
}
