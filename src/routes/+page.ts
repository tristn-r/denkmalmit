import type { PageLoad } from "./$types";
import { db } from "#lib/db.js";

export const load: PageLoad = async () => {
    const { data } = await db.from("posts").select();
    const poll = await db.from("polls").select().eq("active", true).limit(1);
    return {
        posts: data ?? [],
        poll: (poll.data && poll.data[0]) ?? null,
    };
};
