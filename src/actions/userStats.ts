"use server";

import db from "@/db";
import { riddle, userRiddle, hint, RiddleDifficulty } from "@/db/schemas";

import { getUser } from "@/lib/auth";
import { and, eq, sql, gt, sum, count } from "drizzle-orm";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const getTotalSolved = async () => {
    try {
        const result = await db.execute(
            sql`SELECT COUNT(*) FROM ${userRiddle} WHERE solved = true AND user_id = ${
                (
                    await getUser()
                ).id
            }`
        );
        return result[0];
    } catch (error) {
        console.error("Error fetching total solved riddles:", error);
        throw error;
    }
};

export const getTotalAnswersShown = async () => {
    try {
        const result = await db.execute(
            sql`SELECT COUNT(*) FROM ${userRiddle} WHERE answer_shown = true AND user_id = ${
                (
                    await getUser()
                ).id
            }`
        );
        return result[0];
    } catch (error) {
        console.error("Error fetching total shown answers:", error);
        throw error;
    }
};

export const getHintsUsed = async () => {
    try {
        const result = await db
            .select({ count: sum(userRiddle.hintsUsed) })
            .from(userRiddle)
            .where(eq(userRiddle.userId, (await getUser()).id));

        return result[0];
    } catch (error) {
        console.error("Error fetching hints used:", error);
        throw error;
    }
};

export const getDifficultyStats = async () => {
    try {
        const result = await db.execute(
            sql`
                SELECT riddle.difficulty, COUNT(*) AS count
                FROM ${userRiddle}
                INNER JOIN ${riddle} ON ${userRiddle}.riddle_id = ${riddle}.id
                WHERE ${userRiddle}.user_id = ${(await getUser()).id}
                GROUP BY riddle.difficulty
            `
        );

        // ensure that all difficulties are accounted for even if count is 0
        const difficulties = RiddleDifficulty.enumValues;
        const difficultyStats = difficulties.map((difficulty) => {
            const matchingResult = result.find(
                (riddle) => riddle.difficulty === difficulty
            );
            return {
                difficulty,
                count: matchingResult
                    ? Number.parseInt(matchingResult.count as string, 10)
                    : 0,
            };
        });

        console.log(difficultyStats);
        return difficultyStats;
    } catch (error) {
        console.error("Error fetching difficulty stats:", error);
        throw error;
    }
};

export const getMethodSolvedStats = async () => {
    const answerShown = await db
        .select({ count: count(userRiddle) })
        .from(userRiddle)
        .where(
            and(
                eq(userRiddle.userId, (await getUser()).id),
                eq(userRiddle.answerShown, true)
            )
        );

    const hintUsed = await db
        .select({ count: count(userRiddle) })
        .from(userRiddle)
        .where(
            and(
                eq(userRiddle.userId, (await getUser()).id),
                gt(userRiddle.hintsUsed, 0),
                eq(userRiddle.answerShown, false)
            )
        );

    const hintNotUsed = await db
        .select({ count: count(userRiddle) })
        .from(userRiddle)
        .where(
            and(
                eq(userRiddle.userId, (await getUser()).id),
                eq(userRiddle.hintsUsed, 0)
            )
        );

    return [
        {
            name: "answerShown",
            count: answerShown[0].count,
        },
        { name: "hintUsed", count: hintUsed[0].count },
        { name: "noHelp", count: hintNotUsed[0].count },
    ];
};

// userId, username, riddlesSolved (without answer),
