import { NextRequest, NextResponse } from "next/server";

/**
 * TEMPORARY diagnostic endpoint — captures whatever Zalo Bot Platform posts
 * to this webhook so we can inspect the real payload shape (the public docs
 * pages don't render fully via fetch tools). Remove once the real
 * integration is built.
 *
 * In-memory only: resets whenever the server restarts. Not meant to be
 * durable — just enough to see one real payload.
 */

const DEBUG_SECRET = "lyle-zalo-debug-2026";
const captured: unknown[] = [];

export async function POST(req: NextRequest) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = await req.text().catch(() => null);
  }

  captured.push({
    receivedAt: new Date().toISOString(),
    headers: Object.fromEntries(req.headers.entries()),
    body,
  });
  if (captured.length > 20) captured.shift();

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== DEBUG_SECRET) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ count: captured.length, captured });
}
