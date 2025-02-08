import "../globals.css"
import Header from "@/components/Header"
import { Toaster } from "@/components/ui/toaster"
import BottomNavigation from "@/components/BottomNavigation"
import type React from "react"
import { Bounce, ToastContainer } from "react-toastify"

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Header />
            {children}
            <BottomNavigation />
            <Toaster />
        </>
    )
}

