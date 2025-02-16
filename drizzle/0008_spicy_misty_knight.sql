ALTER TABLE "blog" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "blog" DROP CONSTRAINT "blog_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "blog" ADD CONSTRAINT "blog_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;