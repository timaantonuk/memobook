"use client"

import * as React from "react"
import {Minus, Plus} from "lucide-react"
import {Bar, BarChart, ResponsiveContainer} from "recharts"

import {Button} from "@/components/ui/button"
import {
    DrawerHeader,

} from "@/components/ui/drawer"
import CardWrapper from "@/components/CardWrapper";
import ToastNotification from "@/components/ToastNotification";

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
                    <h1 className='reg-text font-bold'>Learn Goal</h1>
                    <p className='font-light'>Set your daily learning goal.</p>
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
                    <div className="my-3 h-[200px] lg:h-[270px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <defs>
                                    <defs>
                                        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#4117af">
                                                <animate attributeName="stop-color"
                                                         values="#4117af; #e73c7e; #1fb4e1; #4117af" dur="4s"
                                                         repeatCount="indefinite"/>
                                            </stop>
                                            <stop offset="50%" stopColor="#e73c7e">
                                                <animate attributeName="stop-color"
                                                         values="#e73c7e; #1fb4e1; #4117af; #e73c7e" dur="4s"
                                                         repeatCount="indefinite"/>
                                            </stop>
                                            <stop offset="100%" stopColor="#1fb4e1">
                                                <animate attributeName="stop-color"
                                                         values="#1fb4e1; #4117af; #e73c7e; #1fb4e1" dur="4s"
                                                         repeatCount="indefinite"/>
                                            </stop>
                                        </linearGradient>
                                    </defs>

                                </defs>
                                <Bar
                                    dataKey="goal" fill="url(#barGradient)" opacity={0.9}
                                />
                            </BarChart>
                        </ResponsiveContainer>

                    </div>

                    <footer className='flex flex-col'>
                        <ToastNotification/>

                    </footer>

                </div>
            </div>
        </CardWrapper>

    )
}
