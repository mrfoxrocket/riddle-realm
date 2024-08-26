import { getTotalSolved, getTotalAnswersShown } from "@/actions/userStats";
import { getUser } from "@/lib/auth";
import React from "react";

const Stats = async () => {
    const user = await getUser();
    const totalSolved = (await getTotalSolved()) as { count: number };
    const totalAnswersShown = (await getTotalAnswersShown()) as {
        count: number;
    };

    return (
        <div className="flex w-full flex-col gap-4">
            <h1 className="text-4xl font-bold">Stats</h1>
            <ul className="flex gap-4 flex-col">
                <li>Name: {user?.email}</li>
                <li>Answers Shown: {totalAnswersShown.count} </li>
                <li>Riddles Solved: {totalSolved.count} </li>
                <li>Hints Used: </li>
                {/* pie chart showing - % of riddlers solved without hints, with hints, and not solved (answer shown) */}
                {/* pie chart showing - % of easy/medium/hard riddles solved */}
            </ul>
        </div>
    );
};

export default Stats;
