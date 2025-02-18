import {z} from "zod";

export const comment_zod_schema = z.object({
    comment_text: z.string().min(1, "Comment text is required")
});