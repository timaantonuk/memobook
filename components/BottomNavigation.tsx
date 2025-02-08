"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BadgePlus, GraduationCap, HomeIcon as House, SearchCheck, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

const Navigation = () => {
    const [open, setOpen] = useState(false)

    const navigationItems = [
        { value: "home", icon: House, label: "Home", href: "/dashboard", },
        { value: "create", icon: BadgePlus, label: "Create", href: "/create",  },
        { value: "learn", icon: GraduationCap, label: "Learn", href: "/learn",  },
        { value: "faq", icon: SearchCheck, label: "FAQ", href: "/faq",  },
    ]

    const handleTabClick = () => {
        setOpen(false)
    }

    const NavigationContent = () => (
        <Tabs defaultValue="home">
            <TabsList className="flex flex-col pt-28 w-full bg-background">
                {navigationItems.map((item) => (
                    <TabsTrigger
                        key={item.value}
                        value={item.value}
                        className="flex-1 w-full "
                        onClick={handleTabClick}
                    >
                        <Link className="flex gap-10 items-center w-full" href={item.href}>
                            <item.icon className="h-7 w-7" />
                            <span className="">{item.label}</span>
                        </Link>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )

    return (
        <div className="block fixed lg:left-10 lg:top-20 left-5 top-5 z-50">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Menu className="h-4 w-4" />
                        <VisuallyHidden>Open navigation menu</VisuallyHidden>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[70vw] lg:w-[20vw] p-0">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <div className="py-4">
                        <NavigationContent />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default Navigation

