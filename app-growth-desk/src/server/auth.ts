import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SESSION_COOKIE = "agd_session";
const SECRET = process.env.AUTH_SECRET ?? "dev-secret-change-me";

export interface SessionPayload {
  email: string;
}

export function signSession(payload: SessionPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifySession(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, SECRET) as SessionPayload;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE };

/**
 * Single private account, credentials sourced from env. This is an
 * internal tool for one developer — no signup, no multi-tenant accounts.
 */
export function checkCredentials(email: string, password: string): boolean {
  const expectedEmail = process.env.OWNER_EMAIL;
  const expectedPasswordHash = process.env.OWNER_PASSWORD_HASH;
  if (!expectedEmail || !expectedPasswordHash) return false;
  if (email !== expectedEmail) return false;
  return bcrypt.compareSync(password, expectedPasswordHash);
}
