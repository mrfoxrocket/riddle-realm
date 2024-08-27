ALTER TABLE "user_riddle" ALTER COLUMN "answer_shown" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user_riddle" ALTER COLUMN "answer_shown" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_riddle" ALTER COLUMN "hints_used" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "user_riddle" ALTER COLUMN "hints_used" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_riddle" ADD CONSTRAINT "user_riddle_user_id_riddle_id_pk" PRIMARY KEY("user_id","riddle_id");