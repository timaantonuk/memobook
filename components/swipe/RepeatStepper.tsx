"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export const RepeatStepper: React.FC = () => {
    const [count, setCount] = useState(0)

    return (
        <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setCount((c) => Math.max(0, c - 1))}>
                -
            </Button>
            <span>{count}</span>
            <Button variant="outline" size="sm" onClick={() => setCount((c) => c + 1)}>
                +
            </Button>
        </div>
    )
}

