import type { Actions } from "./$types";
import { ADMIN_PW } from "$app/env/private";
import { fail, redirect } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const pw = formData.get("password") as string;

        if (pw !== ADMIN_PW) return fail(401, { message: "Falsches Passwort" });

        cookies.set("admin", "true", {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 60 * 60 * 24,
        });

        throw redirect(303, "/admin");
    },
};
