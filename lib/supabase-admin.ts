import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses Row Level Security entirely. Server-only:
 * import this ONLY from server code that must never ship to the browser
 * (the Zalo webhook route). Never import from a client component or
 * anything reachable from `lib/bag-product-service.ts`'s public reads.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
