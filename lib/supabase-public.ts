import { createClient } from "@supabase/supabase-js";

/**
 * Anon-key client — subject to Row Level Security (read-only access to
 * published rows, per the policies in supabase/schema.sql). Safe to use
 * from server components that render the public site.
 */
export function getSupabasePublic() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars");
  }

  return createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
