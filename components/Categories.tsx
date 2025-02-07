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
import { fetchUserCards } from "@/app/utils/cardsService"; // Импорт функции для загрузки карточек

const CategoriesWithCardsInfo = () => {
    const categories = useCategoryStore((state) => state.categories);
    const setCategories = useCategoryStore((state) => state.setCategories);
    const removeCategory = useCategoryStore((state) => state.deleteCategory);

    const cards = useCardStore((state) => state.cards);
    const setCards = useCardStore((state) => state.setCards);

    const user = useUserStore((state) => state);

    // ✅ Загрузка категорий и карточек при монтировании
    useEffect(() => {
        if (user.id) {
            // Загружаем категории пользователя
            fetchUserCategories(user.id).then(setCategories);

            // Загружаем карточки пользователя
            fetchUserCards(user.id).then(setCards);
        }
    }, [user.id, setCategories, setCards]);

    // ✅ Подсчёт карточек в категории
    const getTotalCards = (categoryId: string) => {
        return cards.filter((card) => card.categoryId === categoryId).length;
    };

    // ✅ Подсчёт карточек для повторения
    const getCardsToReviewCount = (categoryId: string) => {
        const today = new Date();
        return cards.filter((card) => {
            if (card.categoryId !== categoryId) return false;
            if (!card.nextReview) return false;
            return new Date(card.nextReview) <= today;
        }).length;
    };

    // ✅ Удаление категории
    const handleDeleteCategory = async (categoryId: string) => {
        try {
            await deleteCategoryAndCards(categoryId, user.id); // Удаляем из Firebase
            removeCategory(categoryId); // Удаляем категорию из Zustand
            setCards(cards.filter((card) => card.categoryId !== categoryId)); // Удаляем карточки из Zustand
        } catch (error) {
            console.error("Error deleting category and cards:", error);
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
                    <p>No Categories. Create one!</p>
                ) : (
                    categories.map((category) => (
                        <div key={category.id} className="mb-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-lg">{category.name}</h4>
                                <Button onClick={() => handleDeleteCategory(category.id)}>
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="text-sm text-muted mt-2">
                                <p>{getTotalCards(category.id)} Cards total</p>
                                <Separator />
                                <p>{getCardsToReviewCount(category.id)} Cards to review today</p>
                            </div>
                            <Separator className="mb-2" />
                        </div>
                    ))
                )}
            </ScrollArea>
        </article>
    );
};

export default CategoriesWithCardsInfo;