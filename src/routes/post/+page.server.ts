import { db } from "#lib/db.ts";
import type { Actions } from "./$types";
import z from "zod";

export const actions = {
    create: async (e) => {
        const data = await e.request.formData();
        const author = data.get("author") as string;
        const text = data.get("text") as string;

        if (z.string(author) && z.string(text)) {
            const result = await db.from("posts").insert({ author, text });

            if (result.success) return { success: true };
            return { success: false, error: result.error };
        }
        return { success: false, error: "Not enough data" };
    },
} satisfies Actions;
