DO $$ BEGIN
 CREATE TYPE "public"."riddle_difficulty" AS ENUM('easy', 'medium', 'hard');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hint" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"riddle_id" uuid NOT NULL,
	"hint_text" text NOT NULL,
	"hint_number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "riddle" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"difficulty" "riddle_difficulty" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_riddle" (
	"user_id" uuid NOT NULL,
	"riddle_id" uuid NOT NULL,
	"user_answer" text DEFAULT '' NOT NULL,
	"solved" boolean DEFAULT false NOT NULL,
	"answer_shown" boolean,
	"hints_used" integer,
	"solved_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_riddle_user_id_riddle_id_pk" PRIMARY KEY("user_id","riddle_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hint" ADD CONSTRAINT "hint_riddle_id_riddle_id_fk" FOREIGN KEY ("riddle_id") REFERENCES "public"."riddle"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_riddle" ADD CONSTRAINT "user_riddle_riddle_id_riddle_id_fk" FOREIGN KEY ("riddle_id") REFERENCES "public"."riddle"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
