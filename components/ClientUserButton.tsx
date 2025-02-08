"use client"

import dynamic from "next/dynamic"
import { UserButton } from "@clerk/nextjs"

const ClientUserButton = dynamic(() => Promise.resolve(UserButton), {
    ssr: false,
})

export default ClientUserButton

