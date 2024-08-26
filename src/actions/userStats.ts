"use server";

import db from "@/db";
import { riddle, userRiddle, hint } from "@/db/schemas";

import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { and, eq, sql } from "drizzle-orm";
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
