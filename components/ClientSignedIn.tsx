"use client"

import dynamic from "next/dynamic"
import { SignedIn } from "@clerk/nextjs"

const ClientSignedIn = dynamic(() => Promise.resolve(SignedIn), {
    ssr: false,
})

export default ClientSignedIn

