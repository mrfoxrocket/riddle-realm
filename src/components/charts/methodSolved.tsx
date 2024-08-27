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
import { getMethodSolvedStats } from "@/actions/userStats";

const chartConfig = {
    count: {
        label: "count",
    },
    answerShown: {
        label: "Answer Shown",
        color: "hsl(var(--chart-5))",
    },
    hintUsed: {
        label: "Hint Used",
        color: "hsl(var(--chart-2))",
    },
    noHelp: {
        label: "No Help",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig;

type ChartData = {
    name: string;
    count: number;
};
export default function MethodSolvedChart() {
    const [chartData, setChartData] = useState<ChartData[]>([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const data = await getMethodSolvedStats();

                const dataFill = data.map((item) => ({
                    ...item,
                    fill: `var(--color-${item.name})`,
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
                <CardTitle>Method Solved</CardTitle>
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
                            nameKey="name"
                            innerRadius={60}
                        />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
