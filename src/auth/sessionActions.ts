import db from "@/db";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { session as sessionTable, user as userTable } from "@/db/schemas";
import { sha256 } from "@oslojs/crypto/sha2";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { cache } from "react";

// Generate Session Token
export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

// Create Session
export const createSession = async (token: string, userId: string) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await db.insert(sessionTable).values(session);

  await setSessionTokenCookie(token, session.expiresAt);
};

//Validate Session
export const validateSessionToken = async (token: string) => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const res = await db
    .select({ user: userTable, session: sessionTable })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));

  if (res.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = res[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    await db
      .update(sessionTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionTable.id, session.id));
  }
  return { session, user };
};

// Invalidate Session
export const invalidateSession = async (sessionId: string) => {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
  deleteSessionTokenCookie();
};

// Get Current Session
export const getCurrentSession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  const result = await validateSessionToken(token);
  return result;
});

// COOKIES
export const setSessionTokenCookie = async (token: string, expiresAt: Date) => {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
};

export const deleteSessionTokenCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
};
