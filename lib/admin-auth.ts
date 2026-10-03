import { createHash, createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET env var");
  return secret;
}

function sign(expiresAt: number): string {
  return createHmac("sha256", getSessionSecret()).update(String(expiresAt)).digest("hex");
}

/** Stateless signed cookie value: `<expiresAtMs>.<hmac>` — no server-side session store. */
export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function isSessionTokenValid(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiresAtRaw, signature] = token.split(".");
  const expiresAt = Number(expiresAtRaw);
  if (!expiresAtRaw || !signature || !Number.isFinite(expiresAt)) return false;
  if (Date.now() > expiresAt) return false;

  const expected = Buffer.from(sign(expiresAt), "hex");
  const actual = Buffer.from(signature, "hex");
  // HMAC-SHA256 hex digest is always 64 bytes, so this is always a fixed-length
  // comparison — safe to feed straight into timingSafeEqual.
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

/**
 * Hash both sides to a fixed 32-byte digest before `timingSafeEqual` —
 * comparing the raw password strings directly would throw whenever the
 * attempted password has a different length than the real one (treat that
 * as a security-relevant crash waiting to happen, not just an edge case).
 */
export function isPasswordCorrect(attempt: string): boolean {
  const realPassword = process.env.ADMIN_PASSWORD;
  if (!realPassword) throw new Error("Missing ADMIN_PASSWORD env var");
  const expected = createHash("sha256").update(realPassword).digest();
  const actual = createHash("sha256").update(attempt).digest();
  return timingSafeEqual(expected, actual);
}

const loginAttempts = new Map<string, { count: number; windowStart: number }>();

/**
 * In-memory limiter — correct ONLY because Render's free plan runs this
 * service as a single instance. Would silently stop working (each instance
 * has its own empty Map) if this ever moved to a multi-instance plan.
 */
export function isLoginRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.windowStart > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 0, windowStart: now });
    return false;
  }
  return entry.count >= MAX_LOGIN_ATTEMPTS;
}

export function recordFailedLogin(ip: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.windowStart > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, windowStart: now });
    return;
  }
  entry.count += 1;
}

export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export { COOKIE_NAME as ADMIN_SESSION_COOKIE_NAME };
