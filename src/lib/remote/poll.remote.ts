import { command } from "$app/server";
import { db } from "#lib/db.ts";
import { z } from "zod";

const endPollSchema = z.object({
    id: z.number().positive("ID must be positive"),
});

export const endPoll = command(endPollSchema, async ({ id }) => {
    const result = await db.from("polls").update({ active: false }).eq("id", id);
    if (result.success) {
        return {
            success: true,
        };
    }
    return {
        success: false,
        message: `Unable to get poll with ID: ${id}`,
    };
});

const submitPollSchema = z.object({
    id: z.number().positive("ID must be positive"),
    response: z.boolean(),
});

export const submitPoll = command(submitPollSchema, async ({ id, response }) => {
    const col = response ? "ja" : "nein";
    let result;
    if (col === "ja") {
        const current = await db.from("polls").select(col).eq("id", id);
        if (!current.data) return { success: false, error: current.error };
        result = await db
            .from("polls")
            .update({ [col]: current.data[0].ja + 1 })
            .eq("id", id);
    } else {
        const current = await db.from("polls").select(col).eq("id", id);
        if (!current.data) return { success: false, error: current.error };
        result = await db
            .from("polls")
            .update({ [col]: current.data[0].nein + 1 })
            .eq("id", id);
    }
    return {
        success: result.success,
        erorr: result.error,
    };
});
