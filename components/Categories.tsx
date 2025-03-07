"use client"
import { useEffect, useMemo, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Trash, Plus, TrashIcon, Check} from "lucide-react"
import { useCategoryStore } from "@/app/store/categories-store"
import { useCardStore } from "@/app/store/card-store"
import { useUserStore } from "@/app/store/user-store"
import { fetchUserCategories, deleteCategoryAndCards, createCategory } from "@/app/utils/categoryService"
import { fetchUserCards } from "@/app/utils/cardsService"
import PopoverBtn from "@/components/PopoverBtn"

const CategoriesWithCardsInfo = () => {
    const { categories, selectedCategoryId, setCategories, deleteCategory } = useCategoryStore()
    const { cards, setCards, setSelectedCategory } = useCardStore()
    const user = useUserStore((state) => state)
    const [newCategoryName, setNewCategoryName] = useState("")

    useEffect(() => {
        if (user.id) {
            fetchUserCategories(user.id).then(setCategories)
            fetchUserCards(user.id).then(setCards)
        }
    }, [user.id, setCards, setCategories])

    const { cardsCount, reviewCount } = useMemo(() => {
        const counts: { [key: string]: number } = {}
        const reviewCounts: { [key: string]: number } = {}

        const today = new Date()
        today.setHours(0, 0, 0, 0)

        cards.forEach((card) => {
            const categoryId = card.categoryId
            counts[categoryId] = (counts[categoryId] || 0) + 1

            if (card.nextReview) {
                const nextReviewDate = new Date(card.nextReview)
                nextReviewDate.setHours(0, 0, 0, 0)

                if (nextReviewDate.getTime() <= today.getTime() && card.status !== "learned") {
                    reviewCounts[categoryId] = (reviewCounts[categoryId] || 0) + 1
                }
            }
        })

        return { cardsCount: counts, reviewCount: reviewCounts }
    }, [cards])

    const totalCards = useMemo(() => cards.length, [cards])
    const totalReviewCards = useMemo(() => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return cards.filter((card) => {
            if (!card.nextReview || card.status === "learned") return false
            const nextReviewDate = new Date(card.nextReview)
            nextReviewDate.setHours(0, 0, 0, 0)
            return nextReviewDate.getTime() <= today.getTime()
        }).length
    }, [cards])

    const handleDeleteCategory = async (categoryId: string) => {
        try {
            await deleteCategoryAndCards(categoryId, user.id)
            deleteCategory(categoryId)
        } catch (error) {
            console.error("❌ Error deleting category:", error)
        }
    }

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return
        try {
            const newCategory = await createCategory({ name: newCategoryName, userId: user.id })
            setCategories([...categories, newCategory])
            setSelectedCategory(newCategory.id)
            setNewCategoryName("")
        } catch (error) {
            console.error("❌ Error creating category:", error)
        }
    }

    return (
        <article className="w-[95vw] mb-48 lg:mb-0 lg:w-auto h-full">
            <ScrollArea className="h-full w-full rounded-md border p-4">
                <div className="flex justify-between items-center mb-5">
                    <h3 className="heading-3">Categories</h3>
                    <PopoverBtn />
                </div>

                <div className="mb-4">
                   <div className='flex gap-3'>
                       <Button
                           variant={selectedCategoryId === null ? "default" : "outline"}
                           className="w-full text-left"
                           onClick={() => setSelectedCategory(null)}
                       >
                           📂 All Cards
                       </Button>
                       <Button disabled className="w-16">
                           <Check />
                       </Button>
                   </div>
                    <div className='flex gap-5 text-sm text-muted py-2 '>
                        <p>{totalCards} Cards total</p>
                        <p>{totalReviewCards} Cards to review today</p>
                    </div>
                    <Separator className="mb-2"/>
                </div>

                {/*<div className="mb-4 flex gap-2">*/}
                {/*    <Input*/}
                {/*        type="text"*/}
                {/*        placeholder="New category name"*/}
                {/*        value={newCategoryName}*/}
                {/*        onChange={(e) => setNewCategoryName(e.target.value)}*/}
                {/*    />*/}
                {/*    <Button onClick={handleAddCategory}>*/}
                {/*        <Plus className="w-5 h-5" />*/}
                {/*    </Button>*/}
                {/*</div>*/}

                {categories.map((category) => (
                    <div key={category.id} className="mb-4">
                      <div className='flex gap-3'>
                          <Button
                              variant={selectedCategoryId === category.id ? "default" : "outline"}
                              className="w-full text-left"
                              onClick={() => setSelectedCategory(category.id)}
                          >
                              {category.name}
                          </Button>
                          <Button className="w-16" onClick={() => handleDeleteCategory(category.id)}>
                              <Trash className='w-16' />
                          </Button>
                      </div>
                        <div className='flex gap-5 text-sm text-muted py-2'>
                            <p>{cardsCount[category.id] || 0} Cards total</p>
                            <p>{reviewCount[category.id] || 0} Cards to review today</p>
                        </div>
                        <Separator className="mb-2"/>
                    </div>
                ))}
            </ScrollArea>
        </article>
    )
}

export default CategoriesWithCardsInfo

