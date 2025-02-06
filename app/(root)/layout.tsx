import type {Metadata} from "next";
import "../globals.css";
import Header from "@/components/Header";
import {Toaster} from "@/components/ui/toaster";
import BottomNavigation from "@/components/BottomNavigation";
import React from "react";


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
