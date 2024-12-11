"use server";

import db from "@/db";
import { user, userRiddle } from "@/db/schemas";
import bcrypt from "bcrypt";
import { checkRiddleAnswer } from "./riddles";
import {
  createSession,
  generateSessionToken,
  getCurrentSession,
  invalidateSession,
} from "@/auth/sessionActions";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { schema } from "@/auth/formSchema";

export const signUpAction = async (
  data: {
    username: string;
    password: string;
    confirmPassword: string;
  },
  riddleId: string,
  hintsUsed: number,
) => {
  const { username, password } = data;

  if (!riddleId)
    return {
      errorMessage: "Please generate a riddle first",
    };

  const result = await schema.safeParseAsync(data);

  if (result.success) {
    const answerCorrect = await checkRiddleAnswer(
      username,
      riddleId,
      hintsUsed,
      false,
      true,
    );

    if (!answerCorrect)
      return {
        errorMessage: "Username must include answer",
      };

    const hashedPass = bcrypt.hashSync(password, 10);

    await db.insert(user).values({
      username,
      password: hashedPass,
    });

    const users = await db
      .select()
      .from(user)
      .where(eq(user.username, username))
      .limit(1);

    await db.insert(userRiddle).values({
      userId: users[0].id,
      riddleId,
      solved: true,
      answerShown: false,
      hintsUsed,
    });

    const token = await generateSessionToken();
    await createSession(token, users[0].id);

    return true;
  }
};

export const signInAction = async (signInData: {
  username: string;
  password: string;
}) => {
  const { username, password } = signInData;
  const result = await schema.safeParseAsync(signInData);

  if (result.success) {
    const data = await db
      .select()
      .from(user)
      .where(eq(user.username, username))
      .limit(1);

    try {
      if (data.length === 0) {
        throw new Error();
      }
      const encrypted = data[0].password;
      const checkPass = bcrypt.compareSync(password, encrypted);

      if (!checkPass) {
        throw new Error();
      }
    } catch {
      return {
        errorMessage: "Email or password are incorrect",
      };
    }

    const token = await generateSessionToken();
    await createSession(token, data[0].id);

    return true;
  }
};

export const signOutAction = async () => {
  const { session } = await getCurrentSession();
  if (session) {
    await invalidateSession(session?.id);
  }
};
