import type { PageLoad } from "./$types";
import { db } from "#lib/db.js";

export const load: PageLoad = async ({ data }) => {
    const result = await db.from("posts").select();
    return {
        posts: result.data ?? [],
        isAdmin: data.isAdmin,
    };
};
