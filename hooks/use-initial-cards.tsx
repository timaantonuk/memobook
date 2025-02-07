'use client'

import { useEffect } from "react";
import { useCardStore } from "@/app/store/card-store";
import { useUserStore } from "@/app/store/user-store";
import {fetchUserCards} from "@/app/utils/cardsService";


export const useInitialCards = () => {
    const user = useUserStore((state) => state);
    const setCards = useCardStore((state) => state.setCards);

    useEffect(() => {
        if (user.id) {
            fetchUserCards(user.id).then(setCards);
        }
    }, [user.id, setCards]);
};