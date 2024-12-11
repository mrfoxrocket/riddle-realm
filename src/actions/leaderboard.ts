"use server";

import db from "@/db";
import { sql } from "drizzle-orm";

export const getMostRiddlesSolved = async () => {
    try {
        const result = await db.execute(sql`
            SELECT 
                users.id, 
                users.username, 
                COUNT(user_riddles.user_id) AS count
            FROM user_riddles
            JOIN users ON user_riddles.user_id = users.id
            WHERE user_riddles.solved = true 
            AND user_riddles.answer_shown = false
            GROUP BY users.id, users.username
            ORDER BY count DESC
            LIMIT 50;
            `);
        return result.rows;
    } catch (error) {
        console.error(error);
    }
};
