"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import CardWrapper from "@/components/CardWrapper";

const data = [
    {
        goal: 400,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 239,
    },
    {
        goal: 300,
    },
    {
        goal: 200,
    },
    {
        goal: 278,
    },
    {
        goal: 189,
    },
    {
        goal: 349,
    },
]

export function GoalSetter() {
    const [goal, setGoal] = React.useState(350)

    function onClick(adjustment: number) {
        setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }

    return (

        <CardWrapper width='w-auto'>
            <div className="mx-auto w-full h-full">
                <DrawerHeader>
                    <div>Learn Goal</div>
                    <div>Set your daily learning goal.</div>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <div className="flex items-center justify-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(-10)}
                            disabled={goal <= 200}
                        >
                            <Minus/>
                            <span className="sr-only">Decrease</span>
                        </Button>
                        <div className="flex-1 text-center">
                            <div className="text-7xl font-bold tracking-tighter">
                                {goal}
                            </div>
                            <div className="text-[0.70rem] uppercase text-muted-foreground">
                                Cards/day
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0 rounded-full"
                            onClick={() => onClick(10)}
                            disabled={goal >= 400}
                        >
                            <Plus/>
                            <span className="sr-only">Increase</span>
                        </Button>
                    </div>
                    <div className="my-3 h-[270px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <Bar
                                    dataKey="goal"
                                    style={
                                        {
                                            fill: "hsl(var(--primary))",
                                            opacity: 0.9,

                                        } as React.CSSProperties
                                    }
                                />
                            </BarChart>
                        </ResponsiveContainer>

                    </div>

                    <footer className='flex flex-col'>
                        <Button>Set Goal</Button>

                    </footer>

                </div>
            </div>
        </CardWrapper>

    )
}
