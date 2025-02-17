ALTER TABLE "comment" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "comment" RENAME COLUMN "blogId" TO "blog_id";--> statement-breakpoint
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" DROP CONSTRAINT "comment_blogId_blog_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;