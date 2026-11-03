import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const isAdmin = cookies.get("admin");

    if (!(isAdmin === "true")) throw redirect(303, "/admin/login");
    return { isAdmin: true };
};
