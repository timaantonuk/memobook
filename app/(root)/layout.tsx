import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import "../globals.css";
import {ThemeProvider} from "@/components/theme-provider"
import Header from "@/components/Header";
import {Toaster} from "@/components/ui/toaster";
import BottomNavigation from "@/components/BottomNavigation";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import React from "react";
import {User} from "lucide-react";
import Link from "next/link";


const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-poppins",
})

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header/>
            {children}
            <BottomNavigation/>
            <Toaster/>


        </>


    );
}
