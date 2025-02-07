'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import PopoverBtn from '@/components/PopoverBtn';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useCategoryStore } from '@/app/store/categories-store';
import { useCardStore } from '@/app/store/card-store';
import { useUserStore } from '@/app/store/user-store';
import { deleteCategoryAndCards, fetchUserCategories } from '@/app/utils/categoryService';
import { createCard, fetchUserCards } from '@/app/utils/cardsService';

const CategoriesWithCardsInfo = () => {
    const categories = useCategoryStore((state) => state.categories);
    const setCategories = useCategoryStore((state) => state.setCategories);
    const removeCategory = useCategoryStore((state) => state.deleteCategory);

    const cards = useCardStore((state) => state.cards);
    const setCards = useCardStore((state) => state.setCards);

    const user = useUserStore((state) => state);

    // ✅ Загружаем категории и карточки при монтировании
    useEffect(() => {
        if (user.id) {
            fetchUserCategories(user.id).then(setCategories);
            fetchUserCards(user.id).then(setCards);
        }
    }, [user.id]);

    // ✅ Мемоизированный расчёт количества карточек
    const { cardsCount, reviewCount } = useMemo(() => {
        const counts: { [key: string]: number } = {};
        const reviewCounts: { [key: string]: number } = {};

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        cards.forEach((card) => {
            const categoryId = card.categoryId;

            // 📌 Общие карточки (НЕ изменяется после свайпа)
            counts[categoryId] = (counts[categoryId] || 0) + 1;

            // 📌 Карточки на повторение
            if (card.nextReview) {
                const nextReviewDate = new Date(card.nextReview);
                nextReviewDate.setHours(0, 0, 0, 0);

                if (nextReviewDate.getTime() <= today.getTime()) {
                    reviewCounts[categoryId] = (reviewCounts[categoryId] || 0) + 1;
                }
            }
        });

        return { cardsCount: counts, reviewCount: reviewCounts };
    }, [cards]);

    // ✅ Удаление категории и карточек в ней
    const handleDeleteCategory = async (categoryId: string) => {
        try {
            await deleteCategoryAndCards(categoryId, user.id);
            removeCategory(categoryId);
            useCardStore.getState().removeCardsByCategory(categoryId); // 🔥 Удаляем карточки этой категории
        } catch (error) {
            console.error("❌ Ошибка при удалении категории и карточек:", error);
        }
    };

    // ✅ Добавление карточки
    const handleAddCard = async (newCard) => {
        try {
            const createdCard = await createCard(newCard);
            setCards((prevCards) => [...prevCards, createdCard]); // 🔥 Мгновенно добавляем карточку в UI
        } catch (error) {
            console.error('Error adding card:', error);
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
                                {/* 🗑️ Кнопка удаления категории */}
                                <Button
                                    variant="outline"
                                    className="p-1"
                                    onClick={() => handleDeleteCategory(category.id)}
                                >
                                    <Trash className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                            <div className="text-sm text-muted mt-2">
                                <p>{cardsCount[category.id] || 0} Cards total</p>
                                <Separator />
                                <p>{reviewCount[category.id] || 0} Cards to review today</p>
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