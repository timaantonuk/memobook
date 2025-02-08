import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"

import {
    ClerkProvider,
} from '@clerk/nextjs'
import React from "react";
import UserProvider from "@/components/UserProvider";

export const metadata: Metadata = {
    title: "MemoBook - Learn Smarter",
    icons: {
        icon: '/favicon.svg'
    },
    description:
        "MemoBook is a free flashcard application that uses a proven spaced repetition algorithm to help you master any subject efficiently.",
    openGraph: {
        title: "MemoBook - Learn Smarter",
        description:
            "A free flashcard app leveraging spaced repetition to boost your long-term retention and learning efficiency.",
        url: "https://www.memobook.com",
        siteName: "MemoBook",
        images: [
            {
                url: "https://img.freepik.com/free-vector/gradient-brain-background_23-2150460414.jpg?t=st=1739042664~exp=1739046264~hmac=3d5d9a64b12edc723c5c67bceb4711514d2931fb859ce65b54083b71f219988c&w=1380",
                alt: "MemoBook Logo",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "MemoBook - Learn Smarter",
        description:
            "Enhance your learning with MemoBook, a free flashcard app based on spaced repetition for optimal retention.",
        images: ["https://img.freepik.com/free-vector/gradient-brain-background_23-2150460414.jpg?t=st=1739042664~exp=1739046264~hmac=3d5d9a64b12edc723c5c67bceb4711514d2931fb859ce65b54083b71f219988c&w=1380"],
    },
};

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-poppins",
})


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
