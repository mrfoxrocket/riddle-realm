"use server";

import { getMostRiddlesSolved } from "@/actions/leaderboard";
import LeaderboardCard from "@/components/LeaderboardCard";
import React from "react";

const Leaderboard = async () => {
    const totalSolved = await getMostRiddlesSolved();

    console.log(totalSolved);
    totalSolved?.forEach((user) => console.log(user));
    return (
        <div className="flex flex-col gap-6">
            {totalSolved?.map((user) => (
                <LeaderboardCard key={user.id} user={user} />
            ))}
        </div>
    );
};

export default Leaderboard;
