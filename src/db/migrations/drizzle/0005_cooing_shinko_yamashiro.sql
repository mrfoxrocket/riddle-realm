ALTER TABLE "hint" DROP CONSTRAINT "hint_riddle_id_riddle_id_fk";
--> statement-breakpoint
ALTER TABLE "user_riddle" DROP CONSTRAINT "user_riddle_riddle_id_riddle_id_fk";
--> statement-breakpoint
ALTER TABLE "user_riddle" DROP CONSTRAINT "user_riddle_user_id_riddle_id_pk";