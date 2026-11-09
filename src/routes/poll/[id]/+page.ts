import type { PageLoad } from "./$types";
import { db } from "#lib/db.js";

export const load: PageLoad = async ({ params }) => {
    const result = await db.from("polls").select().eq("id", Number(params.id));

    return {
        poll: result.data && result.data[0],
        success: result.success,
        error: result.error,
    };
};
