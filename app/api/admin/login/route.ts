import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  clientIp,
  createSessionToken,
  isLoginRateLimited,
  isPasswordCorrect,
  recordFailedLogin,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  if (isLoginRateLimited(ip)) {
    return NextResponse.json({ error: "Quá nhiều lần thử, vui lòng đợi 15 phút rồi thử lại." }, { status: 429 });
  }

  let password: string;
  try {
    const body = await req.json();
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  }

  if (!isPasswordCorrect(password)) {
    recordFailedLogin(ip);
    return NextResponse.json({ error: "Sai mật khẩu." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return response;
}
