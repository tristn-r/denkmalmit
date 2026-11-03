import { command } from "$app/server";
import { db } from "#lib/db.ts";
import { z } from "zod";
import { dbAdmin } from "#lib/server/db.ts";

const likeSchema = z.object({
    id: z.number().positive("ID must be positive"),
    likeness: z.number().min(-1).max(1),
});

export const likePost = command(likeSchema, async ({ id, likeness }) => {
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

const deleteSchema = z.object({
    id: z.number().positive("ID must be positive"),
});

export const deletePost = command(deleteSchema, async ({ id }) => {
    const result = await dbAdmin.from("posts").delete().eq("id", id).limit(1);
    return {
        success: result.success,
        error: result.error,
    };
});
