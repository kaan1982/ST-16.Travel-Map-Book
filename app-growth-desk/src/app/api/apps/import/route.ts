import { NextRequest, NextResponse } from "next/server";
import { extractAppStoreId, lookupAppleApp } from "@/server/apple/lookup";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const input = body?.url ?? body?.appStoreId;

  if (!input || typeof input !== "string") {
    return NextResponse.json({ error: "Provide an App Store URL or app ID." }, { status: 400 });
  }

  const appStoreId = extractAppStoreId(input);
  if (!appStoreId) {
    return NextResponse.json(
      { error: "Could not extract an App Store ID from the input." },
      { status: 400 }
    );
  }

  try {
    const app = await lookupAppleApp(appStoreId, body?.country ?? "us");
    return NextResponse.json({ app });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Lookup failed." },
      { status: 502 }
    );
  }
}
