import { NextRequest, NextResponse } from "next/server";
import { encryptSecret } from "@/server/crypto";

/**
 * Stub: encrypts the submitted App Store Connect credential and would
 * persist it via Prisma (AppleAdsAccount-style table) once a database
 * is connected. Wire up `prisma.appStoreConnectCredential.upsert` here.
 */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.issuerId || !body?.keyId || !body?.privateKey) {
    return NextResponse.json({ error: "issuerId, keyId and privateKey are required." }, { status: 400 });
  }

  const encrypted = encryptSecret(JSON.stringify(body));
  void encrypted; // TODO: persist via Prisma once DATABASE_URL is configured

  return NextResponse.json({ ok: true });
}
