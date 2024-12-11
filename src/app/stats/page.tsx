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
import LeaderboardTable from "@/components/LeaderboardTable";

const Stats = async () => {
    const user = await getUser();

    const totalSolved = await getTotalSolved();
    const totalAnswersShown = await getTotalAnswersShown();

    const hintsUsed = (await getHintsUsed()) as { count: string };

    return (
        <div className="flex w-full flex-col gap-4">
            <h2 className="text-4xl font-bold">Stats</h2>
            <h3 className="text-3xl font-semibold">Hello, {user?.username}</h3>
            <div className="flex flex-col md:flex-row gap-4 ">
                <StatsCard
                    stat={totalSolved}
                    title="Riddles Solved"
                    containerClassName="bg-primary"
                />
                <StatsCard
                    stat={totalAnswersShown}
                    title="Answers Shown"
                    containerClassName="bg-green2"
                />
                <StatsCard
                    stat={hintsUsed.count || 0}
                    title="Hints Used"
                    containerClassName="bg-green3"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4 ">
                <DifficultyChart />
                <MethodSolvedChart />
            </div>
            <LeaderboardTable />
        </div>
    );
};

export default Stats;
