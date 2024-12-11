import {
  pgTable,
  text,
  uuid,
  pgEnum,
  integer,
  boolean,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const RiddleDifficulty = pgEnum("riddle_difficulty", [
  "easy",
  "medium",
  "hard",
]);

export const riddle = pgTable("riddles", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  difficulty: RiddleDifficulty("difficulty").notNull(),
});

export const hint = pgTable("hints", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  riddleId: uuid("riddle_id").notNull(),
  hintText: text("hint_text").notNull(),
  hintNumber: integer("hint_number").notNull(),
});

export const userRiddle = pgTable("user_riddles", {
  userId: uuid("user_id").notNull(),
  riddleId: uuid("riddle_id").notNull(),
  solved: boolean("solved").default(false).notNull(),
  answerShown: boolean("answer_shown"),
  hintsUsed: integer("hints_used"),
  solvedAt: timestamp("solved_at").defaultNow().notNull(),
});

export const user = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull(),
  password: varchar({ length: 255 }).notNull(),
});

export const session = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
