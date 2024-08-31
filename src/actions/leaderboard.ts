"use server";

import db from "@/db";
import { sql } from "drizzle-orm";

export const getMostRiddlesSolved = async () => {
    try {
        const result = await db.execute(sql`
            SELECT profile.id, profile.username, COUNT(user_riddle.user_id) AS count
            FROM user_riddle
            JOIN profile ON user_riddle.user_id = profile.id
            WHERE user_riddle.solved = true 
            AND user_riddle.answer_shown = false
            GROUP BY profile.username, profile.id
            ORDER BY count DESC
            LIMIT 50
            `);
        return result;
    } catch (error) {}
};
