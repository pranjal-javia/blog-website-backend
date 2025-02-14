CREATE TABLE "blog" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "comment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" uuid,
	"blogId" uuid,
	"comment_text" text NOT NULL,
	"is_deleted" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "reaction" (
	"Id" uuid PRIMARY KEY NOT NULL,
	"blog_id" uuid,
	"user_id" uuid,
	"liked" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" varchar(20) NOT NULL,
	"email" varchar(30) NOT NULL,
	"password" varchar NOT NULL,
	"first_name" varchar(30) NOT NULL,
	"last_name" varchar(30) NOT NULL,
	"middle_name" varchar(30),
	"address" varchar(30) NOT NULL,
	"city" varchar(20) NOT NULL,
	"state" varchar(20) NOT NULL,
	"country" varchar(20) NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"profile_url" text NOT NULL,
	"coverphoto_url" text,
	"jwt_token" varchar,
	"is_active" boolean DEFAULT true,
	"dob" date NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	"deleted_at" timestamp,
	CONSTRAINT "user_username_unique" UNIQUE("username"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "blog" ADD CONSTRAINT "blog_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comment" ADD CONSTRAINT "comment_blogId_blog_id_fk" FOREIGN KEY ("blogId") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reaction" ADD CONSTRAINT "reaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;