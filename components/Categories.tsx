'use client'
import React, { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import PopoverBtn from '@/components/PopoverBtn';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useCategoryStore } from '@/app/store/categories-store';
import { useCardStore } from '@/app/store/card-store';
import { useUserStore } from '@/app/store/user-store';
import { deleteCategoryAndCards, fetchUserCategories } from "@/app/utils/categoryService";
import {useInitialCards} from "@/hooks/use-initial-cards";

const CategoriesWithCardsInfo = () => {
    useInitialCards()
    const categories = useCategoryStore((state) => state.categories);
    const setCategories = useCategoryStore((state) => state.setCategories);
    const removeCategory = useCategoryStore((state) => state.deleteCategory);
    const cards = useCardStore((state) => state.cards);
    const setCards = useCardStore((state) => state.setCards);
    const user = useUserStore((state) => state);

    useEffect(() => {
        console.log("🔍 Все карточки в Zustand:", cards);
    }, [cards]);

    // ✅ Загружаем категории при загрузке страницы
    useEffect(() => {
        if (user.id) {
            fetchUserCategories(user.id).then(setCategories);
        }
    }, [user.id, setCategories]);

    // ✅ Подписываемся на обновление карточек
    useEffect(() => {
        console.log("🟢 UI обновляется, актуальные карточки:", cards);
    }, [cards]); // Теперь UI будет обновляться при изменении карточек

    const getTotalCards = (categoryName: string) => {
        return cards.filter((card) => card.category === categoryName).length;
    };

    const getCardsToReviewCount = (categoryId: string): number => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return cards.filter((card) => {
            if (card.category !== categoryId) return false;
            if (card.status !== "learning") return false; // 🆕 Исключаем "learned" карточки
            if (!card.nextReview) return false;

            return new Date(card.nextReview) <= today;
        }).length;
    };

    // ✅ Удаление категории
    const handleDeleteCategory = async (categoryId: string) => {
        try {
            // Удаляем категорию и её карточки из Firebase
            await deleteCategoryAndCards(categoryId, user.id);

            // Удаляем категорию из Zustand
            removeCategory(categoryId);

            // Удаляем связанные карточки из Zustand
            const updatedCards = cards.filter((card) => card.category !== categoryId);
            setCards(updatedCards);

            console.log("Category and related cards removed successfully.");
        } catch (error) {
            console.error("Error deleting category and related cards:", error);
        }
    };

    return (
        <article className="w-[95%] lg:w-auto">
            <ScrollArea className="h-full w-full rounded-md border p-4">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="heading-3">Categories</h3>
                    <PopoverBtn />
                </div>

                {categories.length === 0 ? (
                    <p>No Categories, Create one.</p>
                ) : (
                    categories.map((category) => (
                        <div key={category.id} className="mb-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg">{category.name}</h4>
                                <Button onClick={() => handleDeleteCategory(category.id)}>
                                    <Trash className="w-4 h-4"/>
                                </Button>
                            </div>
                            <div className="text-sm text-muted mt-2">
                                <p>{getTotalCards(category.name)} Cards total</p>
                                <Separator/>
                                <p>{getCardsToReviewCount(category.name)} Cards to review today</p>
                            </div>
                            <Separator className="mb-2"/>
                        </div>
                    ))
                )}
            </ScrollArea>
        </article>
    );
};

export default CategoriesWithCardsInfo;