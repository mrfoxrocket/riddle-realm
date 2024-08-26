"use server";

import db from "@/db";
import { riddles } from "@/db/schemas/riddles";
import { getUser } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const newRiddleAction = async (formData: FormData) => {
    try {
        const user = await getUser();

        const text = formData.get("text") as string;

        await db.insert(riddles).values({ text, userId: user.id });

        revalidatePath("/");

        return {
            errorMessage: null,
        };
    } catch (error) {
        return {
            errorMessage: getErrorMessage(error),
        };
    }
};

export const deleteRiddleAction = async (riddleId: number) => {
    try {
        const user = await getUser();

        await db
            .delete(riddles)
            .where(and(eq(riddles.id, riddleId), eq(riddles.userId, user.id)));

        revalidatePath("/");

        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: getErrorMessage(error) };
    }
};

export const editRiddleAction = async (formData: FormData) => {
    try {
        const user = await getUser();

        const text = formData.get("text") as string;
        const riddleId = formData.get("riddleId") as string;

        await db
            .update(riddles)
            .set({ text, updatedAt: new Date() })
            .where(
                and(
                    eq(riddles.id, Number(riddleId)),
                    eq(riddles.userId, user.id)
                )
            );

        revalidatePath("/");

        return { errorMessage: null };
    } catch (error) {
        return { errorMessage: getErrorMessage(error) };
    }
};
