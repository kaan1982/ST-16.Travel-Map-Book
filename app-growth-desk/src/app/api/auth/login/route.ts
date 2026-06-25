import { NextRequest, NextResponse } from "next/server";
import { checkCredentials, signSession, SESSION_COOKIE } from "@/server/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json().catch(() => ({ email: "", password: "" }));

  if (!checkCredentials(email, password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = signSession({ email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
