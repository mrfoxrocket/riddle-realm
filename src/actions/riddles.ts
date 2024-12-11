"use server";

import db from "@/db";
import { riddle, userRiddle, hint } from "@/db/schemas";

import { getUser } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";
import { Riddle } from "@/lib/types";

export const getRandomRiddle = async (difficulty: string): Promise<Riddle> => {
  try {
    const whereClause =
      difficulty !== "all" ? sql`AND difficulty = ${difficulty}` : sql``;

    const result = await db.execute(sql`
            SELECT id, question, difficulty 
            FROM ${riddle} 
            LEFT JOIN ${userRiddle} ON ${riddle.id} = ${userRiddle.riddleId}
            WHERE ${userRiddle.riddleId} IS NULL
            ${whereClause}
            ORDER BY RANDOM()
            LIMIT 1
        `);

    const randomRiddle = result.rows[0] as Riddle;

    if (randomRiddle === undefined) {
      return {
        allSolved: true,
      };
    } else {
      return {
        id: randomRiddle.id,
        question: randomRiddle.question,
        difficulty: randomRiddle.difficulty,
      };
    }
  } catch (error) {
    console.error("Error fetching random riddle:", error);
    throw error;
  }
};

export const checkRiddleAnswer = async (
  inputValue: string,
  riddleId: string,
  hintsUsed: number,
  answerShown: boolean,
  signUp?: boolean,
) => {
  try {
    const data = await db.select().from(riddle).where(eq(riddle.id, riddleId));

    const result = inputValue
      .toLowerCase()
      .includes(data[0].answer.toLowerCase());

    if (result === true && !signUp) {
      const user = await getUser();

      if (!user) {
        throw new Error("User not found");
      }
      await db.insert(userRiddle).values({
        userId: user.id,
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

export const getHints = async (riddleId: string) => {
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

export const getAnswer = async (riddleId: string) => {
  try {
    const data = await db.select().from(riddle).where(eq(riddle.id, riddleId));

    const user = await getUser();

    if (!user) {
      throw new Error("User not found");
    }

    await db.insert(userRiddle).values({
      userId: user.id,
      riddleId,
      solved: true,
      answerShown: true,
      hintsUsed: 3,
    });

    return data[0].answer;
  } catch (error) {
    console.error("Error checking riddle answer:", error);
    throw error;
  }
};

export const getSignUpRiddle = async (): Promise<Riddle> => {
  try {
    const result = await db.execute(sql`
            SELECT id, question, difficulty 
            FROM ${riddle} 
            ORDER BY RANDOM()
            LIMIT 1
        `);

    const randomRiddle = result.rows[0] as Riddle;

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
