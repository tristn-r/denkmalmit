import type { PageLoad } from "./$types";
import { db } from "$lib/db";

export const load: PageLoad = async () => {
    const { data } = await db.from("posts").select();
    return {
        posts: data ?? [],
    };
};
