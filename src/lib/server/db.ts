import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL } from "$app/env/public";
import { SUPABASE_SECRET_KEY } from "$app/env/private";

export const dbAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY);
