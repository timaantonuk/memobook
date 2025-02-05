import {Poppins} from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import {Toaster} from "@/components/ui/toaster";




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
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${poppins.variable} ${poppins.variable} antialiased`}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >



            {children}


            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    );
}
