import { db } from "#lib/db.ts";
import type { Actions } from "./$types";
import z from "zod";

export const actions = {
    create: async (e) => {
        const data = await e.request.formData();
        const text = data.get("text") as string;

        if (z.string(text)) {
            const result = await db.from("polls").insert({ text }).select();
            if (result.data && result.data.length)
                db.channel("poll").send({
                    type: "broadcast",
                    event: "new_poll",
                    payload: { poll_id: result.data[0].id },
                });

            return { success: result.success, error: result.error };
        }
        return { success: false, error: "Not enough data" };
    },
} satisfies Actions;
