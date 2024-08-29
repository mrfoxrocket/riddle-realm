"use server";

import {
    getTotalSolved,
    getTotalAnswersShown,
    getHintsUsed,
} from "@/actions/userStats";
import DifficultyChart from "@/components/charts/difficulty";
import MethodSolvedChart from "@/components/charts/methodSolved";
import StatsCard from "@/components/StatsCard";

import { getUser } from "@/lib/auth";

const Stats = async () => {
    const user = await getUser();

    const totalSolved = (await getTotalSolved()) as { count: number };

    const totalAnswersShown = (await getTotalAnswersShown()) as {
        count: number;
    };

    let hintsUsed = (await getHintsUsed()) as { count: string };
    console.log(hintsUsed);

    return (
        <div className="flex w-full flex-col gap-4">
            <h1 className="text-4xl font-bold">Stats</h1>
            <h2 className="text-3xl font-semibold">Hello, {user?.email}</h2>
            <div className="flex flex-col md:flex-row gap-4 ">
                <StatsCard stat={totalSolved.count} title="Riddles Solved" />
                <StatsCard
                    stat={totalAnswersShown.count}
                    title="Answers Shown"
                />
                <StatsCard stat={hintsUsed.count} title="Hints Used" />
            </div>

            <div className="flex flex-col md:flex-row gap-4 ">
                <DifficultyChart />
                <MethodSolvedChart />
            </div>
        </div>
    );
};

export default Stats;
