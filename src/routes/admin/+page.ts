import type { PageLoad } from "./$types";
import { db } from "#lib/db.js";

export const load: PageLoad = async ({ data }) => {
    const posts = await db.from("posts").select();
    const polls = await db.from("polls").select();
    return {
        posts: posts.data ?? [],
        polls: polls.data ?? [],
        isAdmin: data.isAdmin,
    };
};
