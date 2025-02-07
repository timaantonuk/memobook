import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

import {
    ClerkProvider,
} from '@clerk/nextjs'
import React from "react";
import UserProvider from "@/components/UserProvider";



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
      <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${poppins.variable} antialiased`}
      >
      <UserProvider/>
      <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
      >

                  {children}


      </ThemeProvider>
      </body>
    </html>
      </ClerkProvider>
  );
}
