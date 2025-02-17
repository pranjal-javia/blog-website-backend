import { pgTable, varchar, uuid, date, boolean, timestamp, text } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
    id: uuid().primaryKey().notNull(),
    username: varchar({length: 50}).notNull().unique(),
    email: varchar().notNull().unique(),
    password: varchar().notNull(),
    first_name: varchar({length: 30}).notNull(),
    last_name: varchar({length: 30}).notNull(),
    middle_name: varchar({length: 30}),
    address: varchar({length: 30}).notNull(),
    city: varchar({length: 20}).notNull(),
    pincode: varchar({length: 10}).notNull(),
    state: varchar({length: 20}).notNull(),
    country: varchar({length: 20}).notNull(),
    phone_number: varchar({length: 20}).notNull(),  
    profile_url: text().notNull(),
    coverphoto_url: text(),
    jwt_token: text(),
    is_active: boolean().default(true),
    dob: date().notNull(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().default(null),
    deleted_at: timestamp().default(null),
});

export const blog = pgTable("blog", {
    id: uuid().primaryKey().notNull(),
    user_id: uuid().references(() => user.id, {onDelete: "cascade"}),
    title: text().notNull(),
    description: text().notNull(),
    is_deleted: boolean().default(false),
    created_at: timestamp().defaultNow(),
    deleted_at: timestamp(),
    updated_at: timestamp(),
});

export const comment = pgTable("comment", {
    id: uuid().primaryKey().notNull(),
    user_id: uuid().references(() => user.id, {onDelete: "cascade"}),
    blog_id: uuid().references(() => blog.id, {onDelete: "cascade"}),
    comment_text: text().notNull(),
    is_deleted: boolean().default(false),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp(),
    deleted_at: timestamp(),
});

export const reaction = pgTable("reaction", {
    id: uuid().primaryKey().notNull(),
    blog_id: uuid().references(() => blog.id, {onDelete: "cascade"}),
    user_id: uuid().references(() => user.id, {onDelete: "cascade"}),
    liked: boolean().notNull(),
});