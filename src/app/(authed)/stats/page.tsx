import {
    getTotalSolved,
    getTotalAnswersShown,
    getHintsUsed,
} from "@/actions/userStats";
import DifficultyChart from "@/components/charts/difficulty";
import MethodSolvedChart from "@/components/charts/methodSolved";

import { getUser } from "@/lib/auth";
import React from "react";

const Stats = async () => {
    const user = await getUser();

    const totalSolved = (await getTotalSolved()) as { count: number };

    const totalAnswersShown = (await getTotalAnswersShown()) as {
        count: number;
    };

    const hintsUsed = (await getHintsUsed()) as { count: string };

    return (
        <div className="flex w-full flex-col gap-4">
            <h1 className="text-4xl font-bold">Stats</h1>
            <ul className="flex gap-4 flex-col">
                <li>Name: {user?.email}</li>
                <li>Answers Shown: {totalAnswersShown.count} </li>
                <li>Riddles Solved: {totalSolved.count} </li>
                <li>Hints Used: {hintsUsed.count} </li>
                <div className="flex gap-4">
                    <DifficultyChart />
                    <MethodSolvedChart />
                </div>

                {/* pie chart showing - % of riddles solved without hints, with hints, and not solved (answer shown) */}
            </ul>
        </div>
    );
};

export default Stats;
