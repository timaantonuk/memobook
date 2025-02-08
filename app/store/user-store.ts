import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface UserState {
    id: string
    username: string
    firstName: string
    email: string
    imageUrl: string
    setUser: (user: Partial<UserState>) => void
}

export const useUserStore = create<UserState>()(
    devtools(
        (set, get) => ({
            id: "",
            username: "",
            firstName: "",
            email: "",
            imageUrl: "",

            setUser: (user) => {
                console.log("🟠 Setting User:", user)
                set(user)
            },
        }),
        { name: "User Store" },
    ),
)

