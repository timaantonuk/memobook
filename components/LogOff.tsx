"use client"

import * as React from "react"
import {User} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LogOff = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className='' variant="outline" size="icon">
                    <User className="h-[1.2rem] w-[1.2rem] transition-all" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LogOff
