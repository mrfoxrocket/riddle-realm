import {
    pgTable,
    text,
    uuid,
    pgEnum,
    integer,
    boolean,
    foreignKey,
    primaryKey,
    timestamp,
} from "drizzle-orm/pg-core";

export const RiddleDifficulty = pgEnum("riddle_difficulty", [
    "easy",
    "medium",
    "hard",
]);

export const riddle = pgTable("riddle", {
    id: uuid("id").primaryKey().notNull().defaultRandom(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    difficulty: RiddleDifficulty("difficulty").notNull(),
});

export const hint = pgTable(
    "hint",
    {
        id: uuid("id").primaryKey().notNull().defaultRandom(),
        riddleId: uuid("riddle_id").notNull(),
        hintText: text("hint_text").notNull(),
        hintNumber: integer("hint_number").notNull(),
    },
    (table) => ({
        riddleForeignKey: foreignKey({
            columns: [table.riddleId],
            foreignColumns: [riddle.id],
        }).onDelete("cascade"),
    })
);

export const userRiddle = pgTable(
    "user_riddle",
    {
        userId: uuid("user_id").notNull(),
        riddleId: uuid("riddle_id").notNull(),
        solved: boolean("solved").default(false).notNull(),
        answerShown: boolean("answer_shown"),
        hintsUsed: integer("hints_used"),
        solvedAt: timestamp("solved_at").defaultNow().notNull(),
    },
    (table) => ({
        pk: primaryKey(table.userId, table.riddleId),

        riddleForeignKey: foreignKey({
            columns: [table.riddleId],
            foreignColumns: [riddle.id],
        }).onDelete("cascade"),
    })
);

export const profile = pgTable("profile", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: text("username").notNull(),
});
