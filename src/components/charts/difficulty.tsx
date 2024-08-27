"use client";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { getDifficultyStats } from "@/actions/userStats";

const chartConfig = {
    count: {
        label: "count",
    },
    easy: {
        label: "Easy",
        color: "hsl(var(--chart-5))",
    },
    medium: {
        label: "Medium",
        color: "hsl(var(--chart-2))",
    },
    hard: {
        label: "Hard",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

type ChartData = {
    difficulty: string;
    count: number;
};
export default function DifficultyChart() {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const data = await getDifficultyStats();

                const dataFill = data.map((item) => ({
                    ...item,
                    fill: `var(--color-${item.difficulty})`,
                }));

                setChartData(dataFill);
            } catch (error) {
                console.error("Error fetching riddle:", error);
            }
        };

        fetchChartData();
    }, []);

    return (
        <Card className="flex flex-col w-full p-4">
            <CardHeader className="items-center pb-0">
                <CardTitle>Riddles Solved By Difficulty</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="count"
                            nameKey="difficulty"
                            innerRadius={60}
                        />
                        <ChartLegend
                            content={
                                <ChartLegendContent nameKey="difficulty" />
                            }
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
