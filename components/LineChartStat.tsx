"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

import { useMemo, useEffect } from "react"
import { useUserStatsStore } from "@/app/store/user-stats"
import { useUserStore } from "@/app/store/user-store"

const chartConfig = {
    cards: {
        label: "Cards",
        color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export default function LineChartStat() {
    const { stats, initializeStats } = useUserStatsStore()
    const userId = useUserStore((state) => state.id)

    useEffect(() => {
        if (userId) {
            initializeStats(userId)
        }
    }, [userId, initializeStats])

    const chartData = useMemo(() => {
        return Object.entries(stats.dailyLearningCards)
            .map(([date, count]) => ({ date, cards: count }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-30) // Show only last 30 days
    }, [stats.dailyLearningCards])

    const trend = useMemo(() => {
        if (chartData.length < 2) return 0
        const firstValue = chartData[0].cards
        const lastValue = chartData[chartData.length - 1].cards
        return ((lastValue - firstValue) / firstValue) * 100
    }, [chartData])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Daily Learning Cards</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={chartData} margin={{ left: 12, right: 12 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => new Date(value).toLocaleDateString()}
                            />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                            <Line dataKey="cards" type="linear" stroke="var(--color-cards)" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {trend > 0 ? "Trending up" : "Trending down"} by {Math.abs(trend).toFixed(1)}% this month
                    <TrendingUp className={`h-4 w-4 ${trend >= 0 ? "text-green-500" : "text-red-500"}`} />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total learning cards per day for the last 30 days
                </div>
            </CardFooter>
        </Card>
    )
}

