import {z} from "zod";

export const blog_zod_schema = z.object({
    user_id: z.string().uuid(),
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 charactors"),
    description: z.string().min(1, "Description is required"),
});

export const update_blog_zod_schema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    title: z.string().min(1, "Title is required").max(255, "Title must be less than 255 charactors"),
    description: z.string().min(1, "Description is required"),
});
