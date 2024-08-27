"use server";

import db from "@/db";
import { riddle, userRiddle, hint, RiddleDifficulty } from "@/db/schemas";

import { getUser } from "@/lib/auth";
import { and, eq, sql, gt, sum, count } from "drizzle-orm";

export const getMostRiddlesSolved = async () => {
    try {
        const result = await db.select;
    } catch (error) {}
};

// sort by userid

// most entries in userriddle with solved = true and answer_shown = false and userid is the same

// get

// user table

// username
// riddles solved
// hints used
// answers shown
//
//
//
