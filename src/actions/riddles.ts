"use server";

import db from "@/db";
import { riddle, userRiddle, hint } from "@/db/schemas";

import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type Riddle = {
    id: string;
    question: string;
    difficulty: string;
};

export const getRandomRiddle = async (difficulty: string): Promise<Riddle> => {
    try {
        const whereClause =
            difficulty !== "all"
                ? sql`WHERE difficulty = ${difficulty}`
                : sql``;

        const result = await db.execute(sql`
            SELECT id, question, difficulty 
            FROM ${riddle} 
            ${whereClause}
            ORDER BY RANDOM()
            LIMIT 1
        `);

        console.log(difficulty);

        const randomRiddle = result[0] as Riddle;
        return {
            id: randomRiddle.id,
            question: randomRiddle.question,
            difficulty: randomRiddle.difficulty,
        };
    } catch (error) {
        console.error("Error fetching random riddle:", error);
        throw error;
    }
};

export const checkRiddleAnswer = async (
    inputValue: string,
    riddleId: string,
    hintsUsed: number,
    answerShown: boolean
) => {
    try {
        const data = await db
            .select()
            .from(riddle)
            .where(eq(riddle.id, riddleId));

        const result =
            inputValue.toLowerCase() === data[0].answer.toLowerCase();

        if (result === true) {
            await db.insert(userRiddle).values({
                userId: (await getUser()).id,
                riddleId,
                solved: true,
                answerShown,
                hintsUsed,
            });
        }

        return result;
    } catch (error) {
        console.error("Error checking riddle answer:", error);
        throw error;
    }
};

export const getHints = async (riddleId) => {
    try {
        const data = await db
            .select()
            .from(hint)
            .where(eq(hint.riddleId, riddleId));

        return data;
    } catch (error) {
        console.error("Error checking riddle answer:", error);
        throw error;
    }
};

export const getAnswer = async (riddleId) => {
    try {
        const data = await db
            .select()
            .from(riddle)
            .where(eq(riddle.id, riddleId));

        return data[0].answer;
    } catch (error) {
        console.error("Error checking riddle answer:", error);
        throw error;
    }
};

// userId: uuid("user_id").notNull(),
// riddleId: uuid("riddle_id").notNull(),
// solved: boolean("solved").default(false).notNull(),
// answerShown: boolean("answer_shown"),
// hintsUsed: integer("hints_used"),

// export const newRiddleAction = async (formData: FormData) => {
//     try {
//         const user = await getUser();

//         const text = formData.get("text") as string;

//         await db.insert(riddle).values({ text, userId: user.id });

//         revalidatePath("/");

//         return {
//             errorMessage: null,
//         };
//     } catch (error) {
//         return {
//             errorMessage: getErrorMessage(error),
//         };
//     }
// };

// export const deleteRiddleAction = async (riddleId: number) => {
//     try {
//         const user = await getUser();

//         await db
//             .delete(riddle)
//             .where(and(eq(riddle.id, riddleId), eq(riddle.userId, user.id)));

//         revalidatePath("/");

//         return { errorMessage: null };
//     } catch (error) {
//         return { errorMessage: getErrorMessage(error) };
//     }
// };

// export const editRiddleAction = async (formData: FormData) => {
//     try {
//         const user = await getUser();

//         const text = formData.get("text") as string;
//         const riddleId = formData.get("riddleId") as string;

//         await db
//             .update(riddle)
//             .set({ text, updatedAt: new Date() })
//             .where(
//                 and(eq(riddle.id, Number(riddleId)), eq(riddle.userId, user.id))
//             );

//         revalidatePath("/");

//         return { errorMessage: null };
//     } catch (error) {
//         return { errorMessage: getErrorMessage(error) };
//     }
// };
