"use server";

import db from "@/db";
import { profile, userRiddle } from "@/db/schemas";
import { getSupabaseAuth, getUser } from "@/lib/auth";
import { checkRiddleAnswer } from "./riddles";

export const signUpAction = async (
    data: {
        username: string;
        password: string;
        confirmPassword: string;
    },
    riddleId: string,
    hintsUsed: number
): Promise<boolean | { errorMessage: string }> => {
    const { username, password } = data;
    const email = username + "@email.com";

    try {
        if (!riddleId) throw new Error("Please generate a riddle first");

        const answerCorrect = await checkRiddleAnswer(
            username,
            riddleId,
            hintsUsed,
            false,
            true
        );
        if (!answerCorrect) throw new Error("Username must include answer");

        const { error } = await getSupabaseAuth().signUp({
            email,
            password,
            options: {
                data: {
                    username,
                },
            },
        });
        if (error) throw error;

        const { data, error: loginError } =
            await getSupabaseAuth().signInWithPassword({
                email,
                password,
            });

        const user = await getUser();

        await db.insert(profile).values({
            id: user.id,
            username,
        });

        await db.insert(userRiddle).values({
            userId: user.id,
            riddleId,
            solved: true,
            answerShown: false,
            hintsUsed,
        });

        if (loginError) throw loginError;
        if (!data.session) throw new Error("No session found");

        return true;
    } catch (error) {
        console.error(error);
        return {
            errorMessage:
                error instanceof Error ? error.message : String(error),
        };
    }
};

export const signInAction = async (signInData: {
    username: string;
    password: string;
}): Promise<boolean | { errorMessage: string }> => {
    try {
        const { username, password } = signInData;
        const email = username + "@email.com";

        const { data, error: loginError } =
            await getSupabaseAuth().signInWithPassword({
                email,
                password,
            });

        if (loginError) throw loginError;
        if (!data.session) throw new Error("No session found");

        return true;
    } catch (error) {
        console.error(error);
        return {
            errorMessage:
                error instanceof Error ? error.message : String(error),
        };
    }
};

export const signOutAction = async () => {
    try {
        const { error } = await getSupabaseAuth().signOut();

        if (error) throw error;

        return { errorMessage: null };
    } catch (error) {
        console.error(error);
    }
};
