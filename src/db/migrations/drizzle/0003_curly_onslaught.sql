CREATE TABLE IF NOT EXISTS "profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_riddle" DROP COLUMN IF EXISTS "username";