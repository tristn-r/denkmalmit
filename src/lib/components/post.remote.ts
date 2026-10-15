import { command } from "$app/server";
import { db } from "$lib/db";
import { z } from "zod";

const schema = z.object({
    id: z.number().positive("ID must be positive"),
    likeness: z.number().min(-1).max(1),
});

export const likePost = command(schema, async ({ id, likeness }) => {
    const post = await db.from("posts").select("relevance").eq("id", id).limit(1);
    if (post.success) {
        const result = await db
            .from("posts")
            .update({ relevance: post.data[0].relevance + likeness })
            .eq("id", id)
            .select();

        if (result.success)
            return {
                success: true,
            };

        return {
            success: false,
            message: `Unable to update post ${id}`,
        };
    }
    return {
        success: false,
        message: `Unable to get post ${id}`,
    };
});
