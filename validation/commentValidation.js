import {z} from "zod";

export const comment_zod_schema = z.object({
    user_id: z.string().uuid(),
    blog_id: z.string().uuid(),
    comment_text: z.string().min(1, "Comment text is required")
});

export const update_comment_zod_schema = z.object({
    id: z.string().uuid(),
    user_id: z.string().uuid(),
    blog_id: z.string().uuid(),
    comment_text: z.string().min(1, "Comment text is required")
});