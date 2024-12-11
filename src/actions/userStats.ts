"use server";

import db from "@/db";
import { riddle, userRiddle, RiddleDifficulty } from "@/db/schemas";

import { getUser } from "@/lib/auth";
import { Riddle } from "@/lib/types";
import { and, eq, sql, gt, sum, count } from "drizzle-orm";

export const getTotalSolved = async () => {
    try {
        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }
        const result = await db.execute(
            sql`SELECT COUNT(*) FROM ${userRiddle} WHERE solved = true AND user_id = ${user.id
                }`,
        );
        return result.rows[0].count;
    } catch (error) {
        console.error("Error fetching total solved riddles:", error);
        throw error;
    }
};

export const getTotalAnswersShown = async () => {
    try {
        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }
        const result = await db.execute(
            sql`SELECT COUNT(*) FROM ${userRiddle} WHERE answer_shown = true AND user_id = ${user.id
                }`,
        );
        return result.rows[0].count;
    } catch (error) {
        console.error("Error fetching total shown answers:", error);
        throw error;
    }
};

export const getHintsUsed = async () => {
    try {
        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const result = await db
            .select({ count: sum(userRiddle.hintsUsed) })
            .from(userRiddle)
            .where(eq(userRiddle.userId, user.id));

        console.log(result);
        return result[0];
    } catch (error) {
        console.error("Error fetching hints used:", error);
        throw error;
    }
};

export const getDifficultyStats = async () => {
    try {
        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }
        const result = await db.execute(
            sql`
                SELECT ${riddle.difficulty}, COUNT(*) AS count
                FROM ${userRiddle}
                INNER JOIN ${riddle} ON ${userRiddle.riddleId} = ${riddle.id}
                WHERE ${userRiddle.userId} = ${user.id}
                GROUP BY ${riddle.difficulty}
            `,
        );

        const difficulties = RiddleDifficulty.enumValues;
        const difficultyStats = difficulties.map((difficulty) => {
            const matchingResult = result.rows.find(
                (riddle: Riddle) => riddle.difficulty === difficulty,
            );
            return {
                difficulty,
                count: matchingResult
                    ? Number.parseInt(matchingResult.count as string, 10)
                    : 0,
            };
        });

        return difficultyStats;
    } catch (error) {
        console.error("Error fetching difficulty stats:", error);
        throw error;
    }
};

export const getMethodSolvedStats = async () => {
    try {
        const user = await getUser();

        if (!user) {
            throw new Error("User not found");
        }

        const answerShown = await db
            .select({ count: count(userRiddle) })
            .from(userRiddle)
            .where(
                and(eq(userRiddle.userId, user.id), eq(userRiddle.answerShown, true)),
            );

        const hintUsed = await db
            .select({ count: count(userRiddle) })
            .from(userRiddle)
            .where(
                and(
                    eq(userRiddle.userId, user.id),
                    gt(userRiddle.hintsUsed, 0),
                    eq(userRiddle.answerShown, false),
                ),
            );

        const hintNotUsed = await db
            .select({ count: count(userRiddle) })
            .from(userRiddle)
            .where(and(eq(userRiddle.userId, user.id), eq(userRiddle.hintsUsed, 0)));

        return [
            {
                name: "answerShown",
                count: answerShown[0].count,
            },
            { name: "hintUsed", count: hintUsed[0].count },
            { name: "noHelp", count: hintNotUsed[0].count },
        ];
    } catch (error) {
        console.error("Error fetching method solved stats:", error);
        throw error;
    }
};
