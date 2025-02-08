"use client"

import { useUserStore } from "@/app/store/user-store"
import { useInitialUser } from "@/hooks/use-initial-user"
import { useInitialCards } from "@/hooks/use-initial-cards"
import { useInitialCategories } from "@/hooks/use-initial-categories"
import { redirect } from "next/navigation"
import ClientOnly from "@/components/ClientOnly"

export default function Home() {
    const userState = useUserStore((state) => state)
    console.log(userState)

    useInitialUser()
    useInitialCards()
    useInitialCategories()

    return (
        <ClientOnly>
            {redirect("/dashboard")}
            {null}
        </ClientOnly>
    )
}

