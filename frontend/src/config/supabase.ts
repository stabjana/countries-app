// this is going to run our connection to our supabase instance

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
// Remove this console.log after verification!

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
